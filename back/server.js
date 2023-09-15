require('dotenv').config();
const express = require("express");
const cors = require("cors"); // Import du middleware CORS
const fs = require('fs');
const createDocSeed = require('./services/createDocSeed');
const connectDB  = require('./db/db');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;
const folderFiles = process.env.FOLDER_FILES;
const pathDefaultPDF = './db/defaultDoc/PDF';

connectDB();
const Doc = require('./db/schema/doc');

if (!fs.existsSync(folderFiles)) fs.mkdirSync(folderFiles, { recursive: true });

if (fs.existsSync(pathDefaultPDF)) {
  const defaultDocs = fs.readdirSync(pathDefaultPDF);
  defaultDocs.map(async (defaultDoc) => {
    const oldPath = `${pathDefaultPDF}/${defaultDoc}`;
    const newPath = `${folderFiles}/${defaultDoc}`;
    fs.copyFileSync(oldPath, newPath);
    createDocSeed(Doc, defaultDoc, newPath, null);
  })
};

// Configuration CORS pour permettre l'accès depuis http://localhost:8080
app.use(cors({ origin: "http://localhost:8080" }));

app.get("/docs", async (req, res) => {
  if (!req.query.search) {
    res.status(400).send({
      message: "Content can not be empty !"
    });
    return;
  }

  const docs = await Doc.find(
    { 
      $text: { 
        $search: req.query.search
      }
    },
    {
      _id: 0,
      name: 1,
      url: 1
    }
  ).sort({ score: { $meta: "textScore" }, name: 1 });
    
  if (!docs) {
    res.status(404).send({
      message: "Not found exception !"
    });
  }
  res.json({ documents: docs });
}); 

app.post("/docs", (req, res) => {
  // Validate request
  if (!req.body.name 
    && !req.body.content 
    && req.body?.extension !== 'pdf' 
  ) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  
  createDocSeed(Doc, defaultDoc, newPath, req.body.content);

  res.status(200).send({
    message: `Votre fichier ${req.body.name} vient d'être enregistré.`
  })
}); 

app.listen(port, () => {
<<<<<<< HEAD
  console.log(`Server is running on port ${port}..`);
});
=======
  console.log(`Server is running on port ${port}.`);
});
>>>>>>> axios
