// Node.js Declarations
const express = require('express');
const app = express();

const routes = require("./controllers");
const sequelize = require("./config/connection");

// These are for logins/logouts.
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Port declaration for Heroku or 3001
const PORT = process.env.PORT || 3001;

// This is part of socket.io. Socket.io must use the http server.
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Store users in an object
let onlineUsers = {};

// Save the channels in an object
let channels = {"General" : []};

// Each time a new user connects to the server, you should expect this message to log to the console. 
io.on("connection", (socket) => {
  console.log("🔌 New user connected! 🔌")
  // This file will be read on new socket connections
  require('./public/js/chat.js')(io, socket, onlineUsers, channels);
})

// Handlebars declarations
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Where is hbs being used?
const hbs = exphbs.create({});
const path = require("path");

// Express View Engine for Handlebars
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

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
  });
});
