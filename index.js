const connection = require("./database");
const bodyParser = require("body-parser");

const express = require("express");
// dépendance qui permet de récupérer facilement les cookies dans les requêtes

// on initialise l'application
const app = express();

const routes = require("./routes");

const http = require("http");
const server = http.createServer(app);

const cors = require("cors");
const { error, log } = require("console");
const port = 8000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const cookie = require("cookie-parser");

// middleware qui permet d'extraire les cookies
app.use(cookie());

// cela permet d'extraire le body qui est stringify au format object JS
app.use(bodyParser.json());

app.use(routes);

// si la route n'a pas été trouvé cela renvoie un status 404
app.use("*", (req, res) => {
  res.status(404).end();
});

// on écoute sur le port 8000
app.listen(8000);

connection.connect((err) => {
  if (err) throw err;
  console.log("Connecté à la base de données MySQL, écoutant le port " + port);
});
