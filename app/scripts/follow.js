// follow and unfollow topic

// click events
try {
    if (typeof delegate === 'undefined') {
        window.delegate = new Delegate(document.body);
    }
    delegate.on('click', '.myft-follow', function(){
        console.log('clicked');
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
        try {
            if (typeof webkit === 'object') {
                webkit.messageHandlers.follow.postMessage(message);
            }
        } catch (ignore) {}
        try {
            if (typeof Android === 'object') {
                Android.follow(JSON.stringify(message));
            }
        } catch (ignore) {}
    });
} catch (ignore) {

}

function contains(a, obj) {
    if (a && a.length>0 && obj && obj.value && obj.tag) {
        for (var i = 0; i < a.length; i++) {
            if (a[i].value === obj.value && a[i].tag === obj.tag) {
                return true;
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
        if (value.indexOf('%')>=0) {
            value = decodeURIComponent(value);
            followButtons[i].setAttribute('data-tag', value);
        }
        if (window.follows[type].indexOf(value) >= 0) {
            followButtons[i].innerHTML = '已关注';
            followButtons[i].className = followButtons[i].className.replace(/ plus/g, ' tick');
        }
    }
}

document.addEventListener('DOMContentLoaded',function(){
    checkFollow();
});