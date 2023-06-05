const router = require("express").Router();
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const connection = require("../../database");
const { key, keyPub } = require("../../keys");

router.post("/createUser", async (req, res) => {
  console.log("on est là");
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  const hashPassword = await bcrypt.hash(password, 8);

  try {
    const sql = `SELECT email_user FROM users WHERE email_user = "${email}"`;
    connection.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length < 1) {
        const sql = `INSERT INTO users(name_user, email_user, password_user) VALUES(?, ?, ?)`;
        const values = [name, email, hashPassword];

        connection.query(sql, values, (err, result) => {
          if (err) throw err;
          console.log("Utilisateur ajouté en BD");
          return res.json(true);
        });
        console.log("utilisateur pas existant");
      } else {
        console.log("Utilisateur déjà existant");
        return res.json(false);
      }
    });
  } catch (error) {
    console.error(error);
    res.send(JSON.stringify("Erreur"));
  }
});

router.post("/login", async (req, res) => {
  console.log("on est ici");
  const { email, password } = req.body;
  try {
    const sql = `SELECT * FROM users WHERE email_user = "${email}"`;
    connection.query(sql, (err, result) => {
      if (result.length > 0) {
        const user = result[0];
        if (bcrypt.compareSync(password, user.password_user)) {
          console.log(user.id_user);
          const userID = user.id_user;
          console.log(userID);
          const token = jsonwebtoken.sign({}, key, {
            subject: userID.toString(),
            expiresIn: 3600 * 24 * 30 * 6,
            algorithm: "RS256",
          });
          res.cookie("token", token);
          res.json(user);
        } else {
          console.log("dans le 1e else");
          res.status(400).json("Email et/ou mot de passe incorrect(s)");
        }
      } else {
        console.log("dans le else");
        res.status(400).json("Email et/ou mot de passe incorrect(s)");
      }
    });
  } catch (error) {
    res.status(400).json("Email et/ou mot de passe incorrect(s)");
  }
});

router.get("/current", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    try {
      const decodedToken = jsonwebtoken.verify(token, key);
      const sql = `SELECT * FROM users WHERE id_user = "${decodedToken.sub}"`;
      connection.query(sql, (err, result) => {
        if (err) throw err;
        const currentUser = result[0];
        console.log(currentUser);
        if (currentUser) {
          res.send(currentUser);
        } else {
          res.send(JSON.stringify(null));
        }
      });
    } catch (error) {
      res.send(JSON.stringify(null));
    }
  } else {
    res.send(JSON.stringify(null));
  }
});

router.delete("/logout", (req, res) => {
  res.clearCookie("token");
  res.end();
});

module.exports = router;
