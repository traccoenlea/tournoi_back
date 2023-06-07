const router = require("express").Router();
const connection = require("../../database");

router.post("/addPoule", async (req, res) => {
  console.log("on est dans add Poule");
  const id_tour = req.body[0].id_tour;
  const number = req.body[0].number;

  const nbPoules = number / 4;

  const sql = `SELECT * FROM tour_part JOIN participants ON participants.id_part = tour_part.id_part WHERE tour_part.id_tour = ${id_tour} ORDER BY RAND()`;
  connection.query(sql, (err, result) => {
    if (err) throw err;

    if (nbPoules === 1) {
      for (let i = 0; i < number; i++) {
        console.log(result[i].id_part);
        const insertPoule = `INSERT INTO poules(id_tour, place, id_part) VALUES(${id_tour}, ${
          i + 1
        }, ${result[i].id_part})`;
        connection.query(insertPoule, (err, result) => {
          if (err) throw err;
        });
      }
    } else {
      for (let i = 0; i < number; i++) {
        console.log("i : " + i);

        const poules = result.slice(i, i + 4);
        for (let y = 0; y < 4; y++) {
          const insertPoule = `INSERT INTO poules(id_tour, place, id_part) VALUES(${id_tour}, ${
            y + 1
          }, ${result[y].id_part})`;
          connection.query(insertPoule, (err, result) => {
            if (err) throw err;
          });
        }
        i = i + 3;
      }
    }
  });

  res.send(JSON.stringify(true));
});

module.exports = router;
