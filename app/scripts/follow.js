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

function hasClassName(element, className) {
    if (!element) {
        return false;
    }
    if (element.classList) {
        return element.classList.contains(className);
    }
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') >= 0;
}

function setClassName(element, className, enabled) {
    if (!element) {
        return;
    }
    if (element.classList) {
        if (enabled) {
            element.classList.add(className);
        } else {
            element.classList.remove(className);
        }
        return;
    }
    var classes = (' ' + element.className + ' ').replace(new RegExp(' ' + className + ' ', 'g'), ' ');
    if (enabled) {
        classes += className + ' ';
    }
    element.className = classes.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ' ');
}

function setFollowButtonState(button, isFollowed) {
    button.textContent = getFollowButtonText(button, isFollowed);
    setClassName(button, 'tick', isFollowed);
    setClassName(button, 'plus', !isFollowed);
}

function postFollowMessage(message) {
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
}

function handleFollowButtonClick(button) {
    var message = {
        tag: button.getAttribute('data-tag'),
        type: button.getAttribute('data-type')
    };
    if (hasClassName(button, 'plus')) {
        setFollowButtonState(button, true);
        message.action = 'follow';
    } else {
        setFollowButtonState(button, false);
        message.action = 'unfollow';
    }
    postFollowMessage(message);
}

function findFollowButton(element) {
    if (element && element.nodeType === 3) {
        element = element.parentNode;
    }
    while (element && element !== document) {
        if (hasClassName(element, 'myft-follow')) {
            return element;
        }
        element = element.parentNode;
    }
    return null;
}

// click events
if (!window.__ftcMyFtFollowClickBound) {
    window.__ftcMyFtFollowClickBound = true;
    document.addEventListener('click', function(event){
        var button = findFollowButton(event.target);
        if (button) {
            handleFollowButtonClick(button);
        }
    }, false);
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
