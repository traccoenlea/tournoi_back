const router = require("express").Router();
const connection = require("../../database");

router.post("/addElim", async (req, res) => {
  console.log("on est dans add Elim");
  const id_tour = req.body[0].id_tour;
  const number = req.body[0].number;
  console.log(number);
  const sql = `SELECT * FROM tour_part JOIN participants ON participants.id_part = tour_part.id_part WHERE tour_part.id_tour = ${id_tour} ORDER BY RAND()`;
  console.log(sql);
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    for (let i = 0; i < number; i++) {
      console.log(result[i].name_part);
      const insertElim = `INSERT INTO eliminations(id_tour, place, id_part) VALUES(${id_tour}, ${
        i + 1
      },  ${result[i].id_part})`;
      connection.query(insertElim, (err, result) => {
        if (err) throw err;
      });
    }
    res.send(JSON.stringify(true));
  });
});

router.get("/getElimination", async (req, res) => {
  console.log("on est dans get Elim");
  const id_tour = req.query.id;
  console.log(id_tour);
  const sql = `SELECT * FROM eliminations JOIN participants ON participants.id_part = eliminations.id_part WHERE eliminations.id_tour = ${id_tour}`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});

module.exports = router;
