const router = require("express").Router();
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mysql = require("mysql");

// const { key, keyPub } = require("../../keys");

router.post("/", async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  try {
    const sql = `SELECT email_user FROM users WHERE email_user = "${email}"`;
    console.log(sql);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
