
require('dotenv').config();
const express = require('express');
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
    fs.renameSync(oldPath, newPath);
    createDocSeed(Doc, defaultDoc, newPath, null);
  })
};




app.get("/docs", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
}); 

app.post("/docs", (req, res) => {
  // Validate request
  if (!req.body.name 
    && !req.body.content 
    && !req.body.extension 
    && !(['pdf']).includes(req.body.extension)
  ) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  
  if(req.body.extension === 'pdf') {
    createDocSeed(Doc, defaultDoc, newPath, req.body.content);
  }

  res.status(200).send({
    message: `Votre fichier ${req.body.name} vient d'être enregistré.`
  })
}); 

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});