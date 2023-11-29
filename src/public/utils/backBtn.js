const backBtn = (backArrow, container) => {
    
    backArrow.addEventListener('click', (e) => {
        $(".users-container").empty();
        const contactTitle = document.querySelector('.ctt-title');
        contactTitle.innerText = "Conversas Iniciadas";

        //Requisição ajax p/ buscar (apenas) contatos
            //Renderizaçao de cada um
        $.ajax({
            url: `/v1/chat/get/contacts/${userId}`,
            type: 'GET',
            success: (data) => {
                for(user of data.messagesUser){
                    if(user.message_id != userId){
                        const contactGroupDiv = document.createElement('div');
                        contactGroupDiv.classList.add('contact-group');
                        
                        const contactNameGroupDiv = document.createElement('div');
                        contactNameGroupDiv.classList.add('contact-name-group');
                        
                        const contactNameParagraph = document.createElement('p');
                        contactNameParagraph.classList.add('contact-name');
                        contactNameParagraph.innerText = user.message_username;

                        contactNameGroupDiv.appendChild(contactNameParagraph);
                        contactNameGroupDiv.setAttribute("d-msg", user.message_id);
                        contactGroupDiv.appendChild(contactNameGroupDiv);
                        container.appendChild(contactGroupDiv);
                        
                        contactNameParagraph.addEventListener("click", (function(userId) {
                            return function(e) {
                                renderData(e, userId);
                            };
                        })(user.message_id));
                        backArrow.remove();
                    }
                }
            }
            
        })
    })
}