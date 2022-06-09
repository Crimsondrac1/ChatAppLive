const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const PORT = process.env.PORT || 3001;
const app = express();
// This is part of socket.io
const http = require("http").Server(app);
const io = require("socket.io")(http);
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

// Store users in an object
let onlineUsers = {};
const users = {};
// Save the channels in an object
let channels = { General: [] };

// io.on("connection", (socket) => {
//   console.log("🔌 New user connected! 🔌");

//   socket.on("new-user", (username) => {
//     
//     onlineUsers[username] = socket.id;
//     
//     socket["username"] = username;
//     console.log(`✋ ${username} has joined the chat! ✋`);
//     io.emit("new-user", username);
//   });

io.on('connection' , socket => {
  socket.on('new-user', name => {
      users[socket.id] = name
      socket.broadcast.emit('user-connected', name)
  })

  socket.on("send-chat-message", (message) => {
    // console.log(message)
    socket.broadcast.emit("chat-message", {
      message: message,
      name: users[socket.id],
    });
  });
  socket.on("disconnect", () => {
    socket.broadcast.emit("user-connected", users[socket.id]);
    delete users[socket.id];
  });
  // // Listen for new messages
  // socket.on("new message", (data) => {
  //   // Save the new message to the channel.
  //   channels[data.channel].push({ sender: data.sender, message: data.message });
  //   // Emit only to sockets that are in that channel room.
  //   io.to(data.channel).emit("new message", data);
  // });

  // socket.on("get online users", () => {
  //   // Send over the onlineUsers
  //   socket.emit("get online users", onlineUsers);
  // });

  // This fires when a user closes out of the application
  // socket.on("disconnect") is a special listener that fires when a user exits out of the application.
  // socket.on("disconnect", () => {
  //   // This deletes the user by using the username we saved to the socket
  //   delete onlineUsers[socket.username];
  //   io.emit("user has left", onlineUsers);
  // });

  // socket.on("new channel", (newChannel) => {
  //   // Save the new channel to our channels object. The array will hold the messages.
  //   channels[newChannel] = [];
  //   // Have the socket join the new channel room.
  //   socket.join(newChannel);
  //   // Inform all clients of the new channel.
  //   io.emit("new channel", newChannel);
  //   // Emit to the client that made the new channel, to change their channel to the one they made.
  //   socket.emit("user changed channel", {
  //     channel: newChannel,
  //     messages: channels[newChannel],
  //   });
  // });

  // Have the socket join the room of the channel
//   socket.on("user changed channel", (newChannel) => {
//     socket.join(newChannel);
//     socket.emit("user changed channel", {
//       channel: newChannel,
//       messages: channels[newChannel],
//     });
//   });
});

// const moment = require('moment');

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);



// Old New User prompt
// io.on('connection' , socket => {
//     socket.on('new-user', name => {
//         users[socket.id] = name
//         socket.broadcast.emit('user-connected', name)
//     })
// console.log('new user')
// socket.emit('chat-message', 'Hello World')
//     socket.on('send-chat-message', message => {
//         // console.log(message)
//         socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
//     })
//     socket.on('disconnect', () => {
//         socket.broadcast.emit('user-connected', users[socket.id])
//         delete users[socket.id]
//     })
// })

sequelize.sync({ force: false }).then(() => {
  http.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
  });
});
