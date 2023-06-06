const router = require("express").Router();
const connection = require("../../database");

router.post("/addParticipant", async (req, res) => {
  const participants = req.body;
  for (let i = 0; i < participants.length; i++) {
    console.log(i);
    const name = participants[i].name;
    console.log(name);
    const sql = `INSERT INTO participants(name_part) VALUES('${name}')`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      const insertedId = result.insertId;
      console.log(insertedId);
    });
  }
});

module.exports = router;
