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

//function to get all the tournaments with all the data (participants and type)
// router.get("/getAllTournaments", async (req, res) => {
//   const sql =
//     // "SELECT * FROM tournaments JOIN types ON tournaments.id_type = types.id_type JOIN part_tour ON tournaments.id_tour = part_tour.id_tour JOIN participants ON part_tour.id_part = participants.id_part";
//     `SELECT * FROM tournaments`;

//   connection.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(JSON.stringify(result));
//   });
// });

// router.get("/getTournament", async (req, res) => {
//   console.log("on est dans le back");
//   const id = req.query.id;
//   console.log(id);

//   // const sql = `SELECT * FROM participants JOIN part_tour ON part_tour.id_part = participants.id_part JOIN tournaments ON part_tour.id_tour = tournaments.id_tour JOIN types ON types.id_type = tournaments.id_type WHERE part_tour.id_tour= ${id} ORDER BY RAND()`;
//   const sql = `SELECT * FROM tournaments JOIN types ON types.id_type = tournaments.id_type WHERE tournaments.id_tour= ${id}`;
//   console.log(sql);
//   connection.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(JSON.stringify(result));
//   });
// });

module.exports = router;
