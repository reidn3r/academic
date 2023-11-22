const renderComingMessage = (payload, container) => {
    let receivedContent = document.createElement('p');
    receivedContent.classList.add('received-content');
    receivedContent.textContent = payload.message;

    let sentMessage = document.createElement('div');
    sentMessage.classList.add('sent-message');

    let receivedMessage = document.createElement('div');
    receivedMessage.classList.add('received-message');

    receivedMessage.appendChild(receivedContent);
    container.appendChild(receivedMessage);
}