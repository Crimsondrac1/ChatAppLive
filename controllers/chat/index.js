const router = require("express").Router();
const logs = require("./logs");
const users = require("./users");
const homeRoutes = require("./home-routes.js");

//Setup endpoints
router.use("/logs", logs);
router.use("/users", users);
router.use("/", homeRoutes);

module.exports = router;
