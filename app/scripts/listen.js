function listen(ele) {
    var message = {
        'audio': ele.src
    };

    if (webkit) {
    	webkit.messageHandlers.listen.postMessage(message);
    }
}
