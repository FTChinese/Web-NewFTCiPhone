function listen(ele) {
    var message = {
        'audio': ele.src
    };

    if (typeof webkit === 'object') {
    	webkit.messageHandlers.listen.postMessage(message);
    }
}
