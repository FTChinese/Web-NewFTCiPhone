function listen(ele) {
    var message = {
        'audio': ele.src
    };
    webkit.messageHandlers.listen.postMessage(message);
}