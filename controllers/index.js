const router = require("express").Router();
const chatRoutes = require("./chat");
const homeRoutes = require("./home-routes.js");

router.use("/", homeRoutes);

router.use("/chat", chatRoutes);

// router.use((req, res) => {
//   res.send("<h1>Wrong Route!</h1>");
// });

module.exports = router;
