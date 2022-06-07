const router = require("express").Router();
const sequelize = require("../config/connection");
const { Logs, User } = require("../models");

// router.get("/", (req, res) => {
//   Logs.findAll({
//     attributes: ["id", "dialog", "sequence", "cat_id", "user_id"],
//     include: [
//       {
//         model: User,
//         attributes: ["username"],
//       },
//     ],
//   })
//     .then((dbPostData) => {
//       const logs = dbPostData.map((log) => log.get({ plain: true }));

//       res.render("homepage", {
//         logs,
//         loggedIn: req.session.loggedIn,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

router.get("/post/:id", (req, res) => {
  Logs.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "description", "url", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }

      const post = dbPostData.get({ plain: true });

      res.render("single-post", {
        post,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/").json({ message: "Logged in" });
    return;
  }

  res.render("login");
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  } else {
    res.render("signup");
  }
});

module.exports = router;
