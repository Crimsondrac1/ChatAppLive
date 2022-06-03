const router = require("express").Router();
const logs = require("./logs");
const users = require("./users");

//Setup endpoints
router.use("/logs", logs);
router.use("/users", users);

module.exports = router;
