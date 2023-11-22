const renderClientMessage = (payload, container) => {
    let receivedContent = document.createElement('p');
    receivedContent.classList.add('sent-content');
    receivedContent.textContent = payload.message;

    let sentMessage = document.createElement('div');
    sentMessage.classList.add('sent-message');
    sentMessage.appendChild(receivedContent);

    let receivedMessage = document.createElement('div');
    receivedMessage.classList.add('received-message');

    container.appendChild(sentMessage);
}