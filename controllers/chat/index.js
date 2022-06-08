const router = require("express").Router();
const logs = require("./logs.js");
const users = require("./users.js");
const homeRoutes = require("./home-routes.js");

//Setup endpoints
router.use("/logs", logs);
router.use("/users", users);
router.use("/", homeRoutes);

module.exports = router;
