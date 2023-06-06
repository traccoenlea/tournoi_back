const router = require("express").Router();
const connection = require("../../database");

router.post("/addPoule", async (req, res) => {
  console.log("on est dans add Poule");
  const id_tour = req.body[0].id_tour;
  const number = req.body[0].number;

  const nbPoules = number / 4;
  console.log(nbPoules);

  const sql = `SELECT * FROM tour_part JOIN participants ON participants.id_part = tour_part.id_part WHERE tour_part.id_tour = ${id_tour} ORDER BY RAND()`;
  connection.query(sql, (err, result) => {
    if (err) throw err;

    for (let i = 1; i <= number; i++) {
      //   console.log("i : " + i);
      const poules = result.slice(i, i + 4);
      //   console.log(poules);
      console.log(i);
      for (let y = 0; y < 4; y++) {
        // console.log(y);
        console.log(poules[y].name_part);
      }
      i = i + 3;
    }
  });

  res.send(JSON.stringify(true));
});

module.exports = router;
