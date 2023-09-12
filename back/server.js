
require('dotenv').config();
const express = require('express');
const fs = require('fs');
const connectDB  = require('./db/db');
const app = express();

const port = process.env.PORT;
const pathDefaultPDF = './db/defaultDoc/PDF'

connectDB();
const Doc = require('./db/schema/doc');

if (fs.existsSync(pathDefaultPDF)) {
  const defaultDocs = fs.readdirSync(pathDefaultPDF);
  defaultDocs.map(async (defaultDoc) => {
    const doc = {
      name: defaultDoc,
      extension: 'doctype/pdf',
      content: 'test',
      key: ['test'],
    }
    await Doc.create(doc);
  })
};

app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});