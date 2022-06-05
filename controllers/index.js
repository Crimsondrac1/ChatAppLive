const router = require("express").Router();
const apiRoutes = require("./api");
const ejs = require("ejs");

router.get("/", (req, res) => {
  res.render("index.ejs");
});

router.use("/api", apiRoutes);

router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>");
});

module.exports = router;
