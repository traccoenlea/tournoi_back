const fs = require("fs");

// pour lire et exporter les clés

module.exports = {
  key: fs.readFileSync(`${__dirname}/tournamentsRS256.key`, "utf8"),
  keyPub: fs.readFileSync(`${__dirname}/tournamentsRS256.key.pub`, "utf8"),
};
