function openMySetting(ele){
    var message = {
        'mySetting': '我的设置'
    };

    if (webkit) {
    	webkit.messageHandlers.mySetting.postMessage(message);
    }
}