
require('dotenv').config();
const express = require('express');
const app = express();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});