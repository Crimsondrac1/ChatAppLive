const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Logs, Users } = require("../../models");

router.get("/", (req, res) => {
  Users.findAll({
    attributes: ["id", "username", "email"],
  })
    .then((Data) => res.json(Data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
