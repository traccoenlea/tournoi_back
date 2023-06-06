const router = require("express").Router();
const connection = require("../../database");

router.post("/addParticipant", async (req, res) => {
  const values = req.body;
  const participants = values[0].participants;
  const id_tour = values[0].id_tour;
  console.log(participants);
  console.log(id_tour);
  // for (let i = 0; i < participants.length; i++) {
  //   const name = participants[i].name;
  //   const sql = `INSERT INTO participants(name_part) VALUES('${name}')`;
  //   connection.query(sql, (err, result) => {
  //     if (err) throw err;
  //     const insertedId = result.insertId;
  //     const linksql = `INSERT INTO tour_part(id_part, id_tour) VALUES(${insertedId}, ${id_tour})`;
  //     connection.query(linksql, (err, result) => {
  //       if (err) throw err;
  //     });
  //     console.log(insertedId);
  //   });
  // }
  res.send(JSON.stringify(true));
});

module.exports = router;
