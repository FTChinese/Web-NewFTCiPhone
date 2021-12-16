function openMySetting(ele){
    var message = {
        'mySetting': '我的设置'
    };

    if (typeof webkit === 'object') {
    	webkit.messageHandlers.mySetting.postMessage(message);
    }
}