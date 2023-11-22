
const saveNewMessage = (payload, socket, container, text) => {
    const receivedContent = document.createElement('p');
    receivedContent.classList.add('sent-content');
    
    const sentMessage = document.createElement('div');
    sentMessage.classList.add('sent-message');

    socket.emit('save_message', payload);
    sentMessage.appendChild(receivedContent);
    
    container.appendChild(sentMessage);
    receivedContent.innerText = text.value;
    text.value="";
}