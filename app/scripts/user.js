function passLoginToNative() {
	if (!!username) {
		var message = {
        	'username': username,
        	'userId': userId
    	};
    	webkit.messageHandlers.user.postMessage(message);
	}
}

passLoginToNative();