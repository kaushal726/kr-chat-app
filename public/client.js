const socket = io()

let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
do {
    name = prompt('Enter your name ')
} while (!name)


textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
        textarea.value = '';
    }
})

let sendMessage = (message) => {
    let msg = {
        user: name,
        message: message.trim()
    }
    appendMessage(msg, 'outgoing')
    scrollToBottom();
    //Send to server

    socket.emit('message', msg)
}


let appendMessage = (msg, type) => {
    let mainDiv = document.createElement('div');
    mainDiv.classList.add(type, 'message');
    let markup = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv);
}

//Recieve msg

socket.on('message', (msg) => {
    console.log(msg);
    appendMessage(msg, 'incoming');
    scrollToBottom();

})

let scrollToBottom = () => {
    messageArea.scrollTop = messageArea.scrollHeight;
}