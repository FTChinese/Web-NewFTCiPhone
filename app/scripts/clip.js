var isLove=false
function clip(ele){

    if (isLove===false) {
        console.log('llllove')
        ele.src = 'http://static.ftchinese.com/images/png/loveActive.png'
        isLove = true
    }else{
        console.log('not llllove')
        ele.src = 'http://static.ftchinese.com/images/png/love.png'
        isLove = false
    }
}
function updateFav(url, storyid, type) {
    var saveType = (type || 'story').replace(/^photonews$/g, 'photo');
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/text');
    xhr.onload = function() {
        if (xhr.status === 200) {
            var data = xhr.responseText;
            if (data === 'ok' || data === '') {
                return data;
            }
        } else if (xhr.status !== 200) {
            //alert('Request failed.  Returned status of ' + xhr.status);
        }
    };
    xhr.send(JSON.stringify({
        storyid: storyid,
        type: saveType
    }));
}