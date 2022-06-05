const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const ejs = require("ejs");
const app = express();
const PORT = process.env.PORT || 3001;
const http = require("http").Server(app);
const io = require("socket.io")(http);
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
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

app.get("/", function (req, res) {
  res.render("index.ejs");
});

io.sockets.on("connection", function (socket) {
  socket.on("username", function (username) {
    socket.username = username;
    io.emit("is_online", "🔵 <i>" + socket.username + " joined the chat..</i>");
  });

  socket.on("disconnect", function (username) {
    io.emit("is_online", "🔴 <i>" + socket.username + " left the chat..</i>");
  });

  socket.on("chat_message", function (message) {
    io.emit(
      "chat_message",
      "<strong>" + socket.username + "</strong>: " + message
    );
  });
});

// const server = http.listen(3001, function () {
//   console.log("listening on *:3001");
// });
sequelize.sync({ force: false }).then(() => {
  http.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
  });
});
