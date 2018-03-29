function passLoginToNative() {
	var message = {};
	var uniqueId = GetCookie('uniqueVisitorId') || guid();
	if (!!username) {
		message = {
        	'username': username,
        	'userId': userId,
        	'uniqueVisitorId': uniqueId
    	};
    	// MARK: Get subscription: standard/premium
    	var paywall = GetCookie('paywall') || '';
    	var paywallExpire = GetCookie('paywall_expire') || '';
    	if (paywall !== '') {
    		message.paywall = paywall;
    	}
    	if (paywallExpire !== '') {
    		message.paywallExpire = paywallExpire;
    	}
	} else {
		message = {
			'uniqueVisitorId': uniqueId
		}
	}
	webkit.messageHandlers.user.postMessage(message);
}

passLoginToNative();