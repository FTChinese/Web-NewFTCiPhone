// follow and unfollow topic

// click events
try {
    delegate.on('click', '.myft-follow', function(){
        var message = {
            tag: this.getAttribute('data-tag'),
            type: this.getAttribute('data-type')
        };
        if (this.className.indexOf(' plus')>0) {
            this.innerHTML = '已关注';
            this.className = this.className.replace(' plus', ' tick');
            message.action = 'follow';
        } else {
            this.innerHTML = '关注';
            this.className = this.className.replace(' tick', ' plus');
            message.action = 'unfollow';
        }
        webkit.messageHandlers.follow.postMessage(message);
    });
} catch (ignore) {

}

function contains(a, obj) {
    if (a && a.length>0 && obj && obj.value && obj.tag) {
        for (var i = 0; i < a.length; i++) {
            if (a[i].value === obj.value && a[i].tag === obj.tag) {
                // console.log ('yes:');
                // console.log (a[i]);
                // console.log (obj);
                return true;
            } else {
                // console.log ('no:');
                // console.log (a[i]);
                // console.log (obj);
            }
        }
    }
    return false;
}

function checkFollow() {
    var followButtons = document.querySelectorAll('button.myft-follow');
    for (var i=0; i < followButtons.length; i++) {
        var type = followButtons[i].getAttribute('data-type');
        var value = followButtons[i].getAttribute('data-tag');
        if (window.follows[type].indexOf(value) >= 0) {
            followButtons[i].innerHTML = '已关注';
            followButtons[i].className = followButtons[i].className.replace(/ plus/g, ' tick');
        }
    }
}

checkFollow();