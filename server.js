const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const app = express();
const PORT = process.env.PORT || 3001;
const moment = require('moment');
// This is part of socket.io
const http = require("http").Server(app);
const io = require("socket.io")(http);

// These are for logins/logouts.
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Handlebars declarations
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});
const path = require("path");

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

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
app.use(routes);

// 

// io.sockets.on("connection", function (socket) {
//   socket.on("username", function (username) {
//     socket.username = username;
//     io.emit("is_online", "🔵 <i>" + socket.username + " joined the chat..</i>");
//   });

//   socket.on("disconnect", function (username) {
//     io.emit("is_online", "🔴 <i>" + socket.username + " left the chat..</i>");
//   });

//   socket.on("chat_message", function (message) {
//     io.emit(
//       "chat_message",
//       "<strong>" + socket.username + "</strong>: " + message
//     );
//   });
// });
sequelize.sync({ force: false }).then(() => {
  http.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
  });
});
