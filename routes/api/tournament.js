const router = require("express").Router();
const { response } = require("express");
const connection = require("../../database");
const jsonwebtoken = require("jsonwebtoken");
const { key, keyPub } = require("../../keys");

//function to add a tournament to the DB
router.post("/addTournament", async (req, res) => {
  const type = req.body.type;
  const name = req.body.name;
  // getting data from the cookies to get the user id to insert into the tournaments table
  const { token } = req.cookies;
  const idUserFromCookie = jsonwebtoken.verify(token, key);

  const sql =
    "INSERT INTO tournaments(name_tour, id_user, id_type ) VALUES(?,?,?)";
  const values = [name, idUserFromCookie.sub, type];
  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});

router.get("/getUserTournaments", async (req, res) => {
  const id_user = req.query.id;
  const sql = `SELECT * FROM tournaments JOIN types ON types.id_type = tournaments.id_type WHERE tournaments.id_user =  ${id_user} ORDER BY tournaments.id_tour ASC`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});

router.get("/getAllTournaments", async (req, res) => {
  const sql =
    "SELECT * FROM tournaments JOIN types ON types.id_type= tournaments.id_type";
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});

router.get("/getATournament", async (req, res) => {
  const id_tour = req.query.id;
  const sql = `SELECT * FROM tournaments WHERE id_tour = ${id_tour}`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});
module.exports = router;
