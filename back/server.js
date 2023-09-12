
require('dotenv').config();
const express = require('express');
const connectDB = require('./mongodb/db');
const app = express();

const port = process.env.PORT;

connectDB();

app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});