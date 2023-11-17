const chatAppTalk = (event) => {
    const to_id = Number(event.srcElement.className.split(' ')[2].split('-')[1]);
    ChatContainer.style.height = ChatContainer.style.height != "40vh" ? maxHeith+'vh' : ChatContainer.style.height;
    visible=true;
    if(visible===true){
        if(!socket){
            initSocket();
        }
        renderData(event, to_id);
    }
}