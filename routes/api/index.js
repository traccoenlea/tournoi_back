const router = require("express").Router();
const apiAuth = require("./auth");
const apiUsers = require("./users");
const apiTour = require("./tournament");

router.use("/auth", apiAuth);
router.use("/users", apiUsers);
router.use("/tournament", apiTour);

module.exports = router;
