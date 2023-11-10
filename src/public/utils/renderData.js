const renderData = (to_id) => {
    socket = io().connect();
        socket.emit('render_data', {to_id: to_id});
        socket.on('message_content_loaded', (messageData) => {
            let chatContainer = document.querySelector("#chat-container");
            if(messageData.content){
                //Renderiza tela de conversa
                $("#chat-container").empty();
                $.ajax({
                    url: `/v1/messages/${userId}/${to_id}`,
                    type: 'GET',
                    success: (messages) => {
                        $.ajax({
                            url: "/v1/chat/render",
                            type: 'GET',
                            success: (template) => {
                                $("#chat-container").html(template);
                                /* Renderização da parte superior do chat,
                                com o nome do contato */

                                let contactsDiv = document.createElement('div');
                                contactsDiv.classList.add('contacts');
                                
                                let contactsGroupDiv = document.createElement('div');
                                contactsGroupDiv.classList.add('contacts-group-title');
                                
                                let pContactTitle = document.createElement('p');
                                pContactTitle.textContent = messages.data[0].to_message_username;
                                pContactTitle.classList.add('ctt-title');

                                contactsGroupDiv.appendChild(pContactTitle);
                                contactsDiv.appendChild(contactsGroupDiv);
                                chatContainer.appendChild(contactsDiv);
                                
                                /* Renderização das mensagens */
                                let userContainerDiv = document.createElement('div');
                                userContainerDiv.classList.add('users-container');
                                
                                let messageContainerDiv  = document.createElement('div');
                                messageContainerDiv.classList.add('message-container');
                                

                                /* Associação de div's pai e filho */
                                userContainerDiv.appendChild(messageContainerDiv);
                                chatContainer.appendChild(userContainerDiv);
                                contactsDiv.appendChild(userContainerDiv);

                                for(msg of messages.data){
                                    let receivedContent = document.createElement('p');

                                    let sentMessage = document.createElement('div');
                                    sentMessage.classList.add('sent-message');

                                    let receivedMessage = document.createElement('div');
                                    receivedMessage.classList.add('received-message');
                                    if(msg.from_message_id == userId){
                                        receivedContent.classList.add('sent-content');
                                    }
                                    else{
                                        receivedContent.classList.add('received-content');
                                    }
                                    //Associa o conteúdo da mensagem a tag p criada
                                    receivedContent.textContent = msg.message;

                                    if(msg.from_message_id == userId){
                                        sentMessage.appendChild(receivedContent);
                                        messageContainerDiv.appendChild(sentMessage);
                                    }
                                    else{
                                        receivedMessage.appendChild(receivedContent);
                                        messageContainerDiv.appendChild(receivedMessage);
                                    }
                                }
                            }
                        })
                    }
                })
            }
        })
}