var ready = (callback) => {
  if (document.readyState != "loading") callback();
  else document.addEventListener("DOMContentLoaded", callback);
}

ready(()=>{
  console.log ('socket not connected YET')
  const socket = io.connect();
  console.log ('socket connected')

  //Keep track of the current user
  let currentUser;

  // Get the online users from the server
  socket.emit('get online users');

  // Users can change the channel by clicking on its name.
  $(document).on('click', '.channel', (event)=>{
    let newChannel = event.target.textContent;
    socket.emit('user changed channel', newChannel);
  });

  $('#create-user-btn').click((event)=>{
    event.preventDefault();
    if($('#username-input').val().length > 0){
      socket.emit('new-user', $('#username-input').val());
      // Save the current user when created
      currentUser = $('#username-input').val();
      $('.username-form').remove();
    }
  });

  $('#send-chat-btn').click((e) => {
    e.preventDefault();
    // Get the message text value
    let message = $('#chat-input').val();
    // Make sure it's not empty
    if(message.length > 0){
      // Emit the message with the current user to the server
      socket.emit('new message', {
        sender : currentUser,
        message : message,
      });
      $('#chat-input').val("");
    }
  });

  // socket listeners
  // socket.on('new-user', (username) => {
  //   console.log(`${username} has joined the chat`);
  //   $('.users-online').append(`<p class="user-online column m-2">${username}</p>`);
  // })
  // Doug TEST
  socket.on('new-user', (name) => {
    console.log(`${name} has joined the chat`);
    $('.users-online').append(`<p class="user-online column m-2">${username}</p>`);
  })
  // Listen for new messages
  socket.on('new message', (data) => {
    // Send that data back to ALL clients
    console.log(`🎤 ${data.sender}: ${data.message} 🎤`)
    io.emit('new message', data);
  })
  // Output the new message
  socket.on('new message', (data) => {
    $('#message-container').append(`
      <div class="message">
        <p class="message-user">${data.sender}: </p>
        <p class="message-text">${data.message}</p>
      </div>
    `);
  })

  socket.on('get online users', (onlineUsers) => {
    // You may have not have seen this for loop before. It's syntax is for(key in obj)
    // Our usernames are keys in the object of onlineUsers.
    for(username in onlineUsers){
      $('.users-online').append(`<p class="user-online column m-2">${username}</p>`);
    }
  })

  // Refresh the online user list
  socket.on('user has left', (onlineUsers) => {
    $('.users-online').empty();
    for(username in onlineUsers){
      $('.users-online').append(`<p>${username}</p>`);
    }
  });
})
  // $('#new-channel-btn').click( () => {
  //   let newChannel = $('#new-channel-input').val();
  
  //   if(newChannel.length > 0){
  //     // Emit the new channel to the server
  //     socket.emit('new channel', newChannel);
  //     $('#new-channel-input').val("");
  //   }
  // });

  // Add the new channel to the channels list (Fires for all clients)
  // socket.on('new channel', (newChannel) => {
  //   $('.channels').append(`<div class="channel">${newChannel}</div>`);
  // });

  // Make the channel joined the current channel. Then load the messages.
  // This only fires for the client who made the channel.

  // socket.on('user changed channel', (data) => {
  //   $('.channel-current').addClass('channel');
  //   $('.channel-current').removeClass('channel-current');
  //   $(`.channel:contains('${data.channel}')`).addClass('channel-current');
  //   $('.channel-current').removeClass('channel');
  //   $('.message').remove();
  //   data.messages.forEach((message) => {
  //     $('.message-container').append(`
  //     <ul class="message "mt-4", "mb-4", "column", "is-three-fifths", "is-half-mobile">
  //       <li class="message-user">${message.sender}: </li>
  //       <li class="message-text">${message.message}</li>
  //     </ul>
  //     `);
  //   });
  // });

