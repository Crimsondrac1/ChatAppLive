const router = require("express").Router();
const chatRoutes = require("./chat");
const homeRoutes = require("./home-routes.js");

router.use("/", homeRoutes);

router.use("/chat", chatRoutes);

module.exports = router;
