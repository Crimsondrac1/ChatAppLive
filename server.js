const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const PORT = process.env.PORT || 3001;
const moment = require('moment');
const app = express();
const http = require("http").Server(app);
// const io = require("socket.io"); //(http);
// const server = http.createServer(app);
// const io = socketio(server);
// This is part of socket.io

const io = require("socket.io")(http);

// START DOUG
const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');


const botName = 'ChatCord Bot';
// END DOUG

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

const users = {}

io.on('connection' , socket => {
    socket.on('new-user', name => {
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    })
    // console.log('new user')
    // socket.emit('chat-message', 'Hello World')
    socket.on('send-chat-message', message => {
        // console.log(message)
        socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
    })
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-connected', users[socket.id])
        delete users[socket.id]
    })
})

sequelize.sync({ force: false }).then(() => {
  http.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
  });
});
