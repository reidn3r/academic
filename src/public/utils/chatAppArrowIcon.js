const chatAppArrowIcon = () => {
    ChatContainer.style.height = visible ? 5+'vh' : maxHeith+'vh';
    visible = !visible;
    if(visible){
        // socket = io();
        initSocket();
    }
    // else{
    //     if(socket){
    //         socket.disconnect();
    //         socket = null;
    //     }
    // }
}
