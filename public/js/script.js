const socket = io('https://livechat-app-1.herokuapp.com')
// const socket = io('http://localhost:3001')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('what is your name?')
appendMessage(`${name} joined`)
socket.emit('new-user', name)
$('.users-online').append(`<p class="user-online column m-2">${name}</p>`);

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`)
})

socket.on('user-connected', name => {
    appendMessage(`${name} connected`)
})

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`)
})

messageForm.addEventListener('submit', e=> {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`${name}: ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessage(message){
    const messageElement = document.createElement('li')
    messageElement.innerText = message
    messageElement.classList.add("mt-4", "mb-4", "column", "is-three-fifths", "is-half-mobile")
    messageContainer.append(messageElement)
}