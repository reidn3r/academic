const renderData = (event, to_id) => {
    // socket = io().connect();
        socket.emit('render_data', {to_id: to_id});
        socket.on('message_content_loaded', (messageData) => {
            let chatContainer = document.querySelector("#chat-container");
            if(messageData.content){
                //Renderiza tela de conversa
                $("#chat-container").empty();
                //Busca as mensagens
                $.ajax({
                    url: `/v1/messages/${userId}/${to_id}`,
                    type: 'GET',
                    success: (messages) => {
                        /* Busca o template do chat de um usuário */
                        $.ajax({
                            url: "/v1/chat/render",
                            type: 'GET',
                            success: (template) => {
                                $("#chat-container").html(template);
                                /* Renderização da parte superior do chat,
                                com o nome do contato */
                                let to_username = messages.data.length > 0 ? messages.data[0].to_message_username : event.srcElement.parentNode.innerText;
                                
                                const contactsDiv = document.createElement('div');
                                contactsDiv.classList.add('contacts');
                                
                                const contactsGroupDiv = document.createElement('div');
                                contactsGroupDiv.classList.add('contacts-group-title');
                                
                                const pContactTitle = document.createElement('p');
                                pContactTitle.textContent = to_username;
                                pContactTitle.classList.add('ctt-title');

                                contactsGroupDiv.appendChild(pContactTitle);
                                contactsDiv.appendChild(contactsGroupDiv);
                                chatContainer.appendChild(contactsDiv);
                                
                                /* 1. Renderização das mensagens:
                                    - São criadas as div's, p's e associado o conteúdo de
                                    cada mensagem para cada p criado.
                                */
                                const userContainerDiv = document.createElement('div');
                                userContainerDiv.classList.add('users-container');
                                
                                const messageContainerDiv  = document.createElement('div');
                                messageContainerDiv.classList.add('message-container');
                                
                                const txtBox = document.createElement('div');
                                txtBox.classList.add('textbox-container');
                                
                                const textInput = document.createElement('input');
                                textInput.setAttribute("type", "text");
                                textInput.classList.add("user-textarea");

                                const sendBtn = document.createElement('div');
                                sendBtn.classList.add('send-message-btn');
                                sendBtn.innerText = "Enviar";
                                
                                /* Associação de div's pai e filho */
                                userContainerDiv.appendChild(messageContainerDiv);
                                chatContainer.appendChild(userContainerDiv);
                                contactsDiv.appendChild(userContainerDiv);

                                txtBox.appendChild(textInput);
                                userContainerDiv.appendChild(txtBox);
                                txtBox.appendChild(sendBtn);

                                /*  Renderiza novas mensagens em tela 
                                    e salva no banco de dados
                                */
                                sendBtn.addEventListener('click', e => {
                                    if(textInput.value.length > 0){
                                        receivedContent = document.createElement('p');
                                        receivedContent.classList.add('sent-content');
                                        
                                        sentMessage = document.createElement('div');
                                        sentMessage.classList.add('sent-message');
                                        
                                        socket.emit('save_message', {
                                            from:userId,
                                            to:to_id,
                                            to_message_username: messages.data[0].to_message_username || event.srcElement.parentNode.innerText,
                                            message:textInput.value,
                                        });
                                        sentMessage.appendChild(receivedContent);
                                        messageContainerDiv.appendChild(sentMessage);
                                        
                                        receivedContent.innerText = textInput.value;
                                        textInput.value="";
                                    }
                                })
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

                                    //Associa o conteúdo da mensagem a tag <p> criada
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