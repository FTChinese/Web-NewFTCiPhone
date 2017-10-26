function openMySetting(ele){
    var message = {
        'mySetting': '我的设置'
    };
    webkit.messageHandlers.mySetting.postMessage(message);
   
}