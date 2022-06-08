const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const PORT = process.env.PORT || 3001;
const moment = require('moment');
const app = express();
const http = require("http").Server(app);
<<<<<<< Updated upstream
// const io = require("socket.io")(http);
=======
const server = http.createServer(app);
const io = socketio(server);
// This is part of socket.io

const socketio = require("socket.io") //(http);

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
>>>>>>> Stashed changes

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

// DOUG START SOCKET.IO
io.on('connection', socket => {
	socket.on('joinRoom', ({ username, room }) => {
	  const user = userJoin(socket.id, username, room);
  
	  socket.join(user.room);
  
	  // Welcome current user
	  socket.emit('message', formatMessage(botName, 'Welcome to ChatAppLive!'));
  
	  // Broadcast when a user connects
	  socket.broadcast
		.to(user.room)
		.emit(
		  'message',
		  formatMessage(botName, `${user.username} has joined the chat`)
		);
  
	  // Send users and room info
	  io.to(user.room).emit('roomUsers', {
		room: user.room,
		users: getRoomUsers(user.room)
	  });
	});
  
	// Listen for chatMessage
	socket.on('chatMessage', msg => {
	  const user = getCurrentUser(socket.id);
  
	  io.to(user.room).emit('message', formatMessage(user.username, msg));
	});
  
	// Runs when client disconnects
	socket.on('disconnect', () => {
	  const user = userLeave(socket.id);
  
	  if (user) {
		io.to(user.room).emit(
		  'message',
		  formatMessage(botName, `${user.username} has left the chat`)
		);
  
		// Send users and room info
		io.to(user.room).emit('roomUsers', {
		  room: user.room,
		  users: getRoomUsers(user.room)
		});
	  }
	});
  });
  // DOUG END SOCKET.IO

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
