const chatAppTalk = (event) => {
    const to_id = Number(event.srcElement.className.split(' ')[2].split('-')[1]);
    ChatContainer.style.height = maxHeith+'vh';
    visible = true;
    if(visible){
        if(!socket){
            initSocket();
        }
        renderData(event, to_id);
    }
}