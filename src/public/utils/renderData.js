const renderData = (event, to_id) => {
    const messageContainerDiv  = document.createElement('div');
    messageContainerDiv.classList.add('message-container');

    socket.emit('render_data', {to_id: to_id});
    socket.on('new_message', (data) => {
        console.log(data);
        let userMsg = data.from_message_id == userId;
        if(!userMsg){ 
            // renderClientMessage(data, messageContainerDiv);
            renderComingMessage(data, messageContainerDiv);
        }
        // else{
        //     renderComingMessage(data, messageContainerDiv);
        // }
    })
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
                    let to_message_username = messages.data.length>0? messages.data[0].to_message_username : event.srcElement.innerText.length > 0 ? event.srcElement.innerText: event.target.parentElement.innerText;
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

                            //Renderiza mensagens salvas em tela 
                            for(msg of messages.data){
                                if(msg.from_message_id == userId){
                                    renderClientMessage(msg, messageContainerDiv);
                                }
                                else{
                                    renderComingMessage(msg, messageContainerDiv);
                                }
                            }

                            /* 
                                Renderiza nova mensagem do cliente em tela
                                e salva no banco de dados
                            */
                            sendBtn.addEventListener('click', e => {
                                if(textInput.value.length > 0){
                                    const payload = {
                                        from:userId,
                                        to:to_id,
                                        to_message_username: to_message_username,
                                        message:textInput.value,
                                    }
                                    saveNewMessage(payload, socket, messageContainerDiv, textInput);
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}