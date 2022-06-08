const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const app = express();
const PORT = process.env.PORT || 3001;
const moment = require('moment');
// This is part of socket.io
const http = require("http").Server(app);
const io = require("socket.io")(http);

// Store users in an object
let onlineUsers = {};

// Save the channels in an object
let channels = {"General" : []};

io.on("connection", (socket) => {
  console.log("🔌 New user connected! 🔌")
  // This file will be read on new socket connections
  require('./public/js/chat')(io, socket, onlineUsers, channels);
})

// These are for logins/logouts.
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Handlebars declarations
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});
const path = require("path");

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);
// 

sequelize.sync({ force: false }).then(() => {
  http.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
  });
});
