var ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
};

ready(() => {
  console.log("socket not connected YET");
  const socket = io.connect();
  console.log("socket connected");

  //Keep track of the current user
  let currentUser;

  // Get the online users from the server
  socket.emit("get online users");

  // Users can change the channel by clicking on its name.
  $(document).on("click", ".channel", (event) => {
    let newChannel = event.target.textContent;
    socket.emit("user changed channel", newChannel);
  });

  $("#create-user-btn").click((event) => {
    event.preventDefault();
    if ($("#username-input").val().length > 0) {
      socket.emit("new-user", $("#username-input").val());
      // Save the current user when created
      currentUser = $("#username-input").val();
      $(".username-form").remove();
    }
  });

  $("#send-chat-btn").click((e) => {
    e.preventDefault();
    // Get the message text value
    let message = $("#chat-input").val();
    // Make sure it's not empty
    if (message.length > 0) {
      // Emit the message with the current user to the server
      socket.emit("new message", {
        sender: currentUser,
        message: message,
      });
      $("#chat-input").val("");
    }
  });

  // socket listeners
  socket.on("new-user", (username) => {
    console.log(`${username} has joined the chat`);
    $(".users-online").append(
      `<p class="user-online column m-2">${username}</p>`
    );
  });

  // Listen for new messages
  socket.on("new message", (data) => {
    // Send that data back to ALL clients
    console.log(`🎤 ${data.sender}: ${data.message} 🎤`);
    io.emit("new message", data);
  });
  // Output the new message
  socket.on("new message", (data) => {
    $("#message-container").append(`
      <div class="message">
        <p class="message-user">${data.sender}: </p>
        <p class="message-text">${data.message}</p>
      </div>
    `);
  });

  socket.on("get online users", (onlineUsers) => {
    for (username in onlineUsers) {
      $(".users-online").append(
        `<p class="user-online column m-2">${username}</p>`
      );
    }
  });

  // Refresh the online user list
  socket.on("user has left", (onlineUsers) => {
    $(".users-online").empty();
    for (username in onlineUsers) {
      $(".users-online").append(`<p>${username}</p>`);
    }
  });
});
