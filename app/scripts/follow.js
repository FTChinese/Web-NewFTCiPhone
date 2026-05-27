// follow and unfollow topic

function getFollowLanguage() {
    var language = window.preferredLanguage || document.documentElement.getAttribute('lang') || navigator.language || '';
    return String(language).toLowerCase();
}

function getFollowButtonText(button, isFollowed) {
    var customLabel = button.getAttribute(isFollowed ? 'data-following-label' : 'data-follow-label');
    if (customLabel) {
        return customLabel;
    }

    var language = getFollowLanguage();
    if (language.indexOf('en') === 0) {
        return isFollowed ? 'Followed' : 'Follow';
    }
    if (language.indexOf('zh-hk') === 0 || language.indexOf('zh-mo') === 0 || language.indexOf('zh-tw') === 0) {
        return isFollowed ? '已關注' : '關注';
    }
    return isFollowed ? '已关注' : '关注';
}

function setFollowButtonState(button, isFollowed) {
    button.textContent = getFollowButtonText(button, isFollowed);
    if (isFollowed) {
        button.className = button.className.replace(' plus', ' tick');
    } else {
        button.className = button.className.replace(' tick', ' plus');
    }
}

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
            setFollowButtonState(this, true);
            message.action = 'follow';
        } else {
            setFollowButtonState(this, false);
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
        if (!type || !value || !window.follows || !window.follows[type]) {
            continue;
        }
        if (value.indexOf('%')>=0) {
            value = decodeURIComponent(value);
            followButtons[i].setAttribute('data-tag', value);
        }
        if (window.follows[type].indexOf(value) >= 0) {
            setFollowButtonState(followButtons[i], true);
        }
    }
}

document.addEventListener('DOMContentLoaded',function(){
    checkFollow();
});
