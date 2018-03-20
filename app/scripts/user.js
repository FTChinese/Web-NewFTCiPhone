function passLoginToNative() {
	var message = {};
	var uniqueId = GetCookie('uniqueVisitorId') || guid();
	if (!!username) {
		message = {
        	'username': username,
        	'userId': userId,
        	'uniqueVisitorId': uniqueId
    	};
	} else {
		message = {
			'uniqueVisitorId': uniqueId
		}
	}
	webkit.messageHandlers.user.postMessage(message);
}

passLoginToNative();