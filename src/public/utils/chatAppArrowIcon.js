const chatAppArrowIcon = () => {
    ChatContainer.style.height = visible ? 5+'vh' : maxHeith+'vh';
    visible = !visible;
    if(visible){
        socket = io();
    }
    else{
        if(socket){
            socket.disconnect();
        }
    }
}
