const router = require("express").Router();
const chatRoutes = require("./chat");
const homeRoutes = require("./home-routes.js");

router.use("/", homeRoutes);

router.get("/", (req, res) => {
  res.render("homepage");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.use("/chat", chatRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>");
});

module.exports = router;
