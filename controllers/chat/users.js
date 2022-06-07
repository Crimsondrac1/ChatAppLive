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

router.post("/login", (req, res) => {
  Users.findOne({
    where: {
      username: req.body.username,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: "Unknown username." });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password." });
      return;
    }

    req.session.save(() => {
      req.session.id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: "You are now logged in!" });
    });
  });
});

router.post("/signup", async (req, res) => {
  var newUser = new Users({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  await User.findOne({
    where: {
      username: req.body.username,
      email: req.body.email,
    },
  })
    .then(async (profile) => {
      if (!profile) {
        await newUser
          .save()
          .then(() => {
            res.status(200).send(newUser);
          })
          .catch((err) => {
            console.log("Error is ", err.message);
          });
      } else {
        res.send("User already exists...");
      }
    })
    .catch((err) => {
      console.log("Error is", err.message);
    });
});



router.put("/:id", (req, res) => {
  Users.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "Invalid user ID." });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Users.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        res.status(404).json({ message: "Invalid user ID." });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
