const router = require("express").Router();
const { Logs, Users } = require("../../models");

router.get("/", (req, res) => {
  Logs.findAll({
    attributes: ["id", "dialog", "sequence", "chat_id", "user_id"],
    include: [
      {
        model: Users,
        attributes: ["id", "username"],
      },
    ],
  })
    .then((Data) => res.json(Data))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
