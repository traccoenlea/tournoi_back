const router = require("express").Router();
const apiAuth = require("./auth");
const apiUsers = require("./users");
const apiTour = require("./tournament");
const apiPart = require("./participant");
const apiPoule = require("./poule");

router.use("/auth", apiAuth);
router.use("/users", apiUsers);
router.use("/tournament", apiTour);
router.use("/participant", apiPart);
router.use("/poule", apiPoule);

module.exports = router;
