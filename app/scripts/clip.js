function updateFav(url, storyid, type) {
    var saveType = (type || 'story').replace(/^photonews$/g, 'photo');
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/text');
    xhr.onload = function() {
        if (xhr.status !== 200) {return;}
        var data = xhr.responseText;
        if (data !== 'ok' && data !== '') {return;}
        return data;
    };
    xhr.send(JSON.stringify({
        storyid: storyid,
        type: saveType
    }));
}