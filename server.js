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
const users = {}
const server = http.createServer(app);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

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



server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

sequelize.sync({ force: false }).then(() => {
  http.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
  });
});