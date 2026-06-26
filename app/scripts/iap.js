function updateProductsHTML(id, json, position) {
	var htmlCode = '';
	for (var i=0; i<json.length; i++) {
		var firstChildClass = '';
		if (i == 0) {
			firstChildClass = ' first-child';
		}
		if (position === 'center') {
			htmlCode += '<a href="buyproduct://' + json[i].id + '"><div class="XLT LT MT ST PT"></div><div class="item-container XL12 XL-half L12 L-half M12 M-half S12 S-half P12 P-half item-container-app has-image"><div class="item-inner"><div class="image portrait-img" target="_blank"><figure class="loading" data-url="' + json[i].image + '"></figure></div><h2 class="item-headline"><div class=item-tag>FT电子书</div>' + json[i].headline + '</h2><div class="item-lead">' + json[i].lead + '</div><div class="item-bottom"></div></div></div></a>';
		} else {
			htmlCode += '<a href="buyproduct://' + json[i].id + '"><div class="item-container XL12 L12 M12 S12 P12 item-container-app has-image is-book' + firstChildClass + '"><div class="item-inner"><div class="image portrait-img" target="_blank"><figure class="loading" data-url="' + json[i].image + '"></figure></div><h2 class="item-headline"><div target="_blank">' + json[i].headline + '</div></h2><div class="item-lead">' + json[i].lead + '</div><div class="item-bottom"></div></div></div></a>';
		}
	}
	if (htmlCode !== '' && position !== 'center') {
		htmlCode = '<h2 class="list-title"><a href="screen://homepage/ebook">FT电子书</a></h2><div class="ebook-inner">' + htmlCode + '<div class="clearfloat"></div></div>';
	}
	var iapEle = document.getElementById(id);
	if (iapEle) iapEle.innerHTML = htmlCode;
	loadImages();
}

function promptUserLogin() {
	var promptDiv = document.getElementById('membership-login-prompt');
	if (promptDiv) {
		promptDiv.className = promptDiv.className.replace(/ hide/g, '');
	}
}

function hideUserLogin() {
	var promptDiv = document.getElementById('membership-login-prompt');
	if (promptDiv) {
		promptDiv.className += ' hide';
	}
}

function promptContactConfirm(membership, action) {
	var promptDiv = document.getElementById('subscriber-contact-confirm');
	if (!promptDiv) {return;}
	promptDiv.className = promptDiv.className.replace(/ hide/g, '');
	if (!membership || membership === '') {return;}
	var promptLink = promptDiv.querySelector('a[href]');
	if (!promptLink) {return;}
	var link = promptLink.href;
	if (/membership=/.test(link)) {
		link = link.replace(/(&membership=)[a-zA-Z\-]+/g, '$1' + membership);
	} else {
		link += '&membership=' + membership;
	}
	if (/action=/.test(link)) {
		link = link.replace(/(&action=)[a-zA-Z\-]+/g, '$1' + action);
	} else {
		link += '&action=' + action;
	}
	promptLink.href = link;
}

function hideContactConfirm() {
	var promptDiv = document.getElementById('subscriber-contact-confirm');
	if (promptDiv) {
		promptDiv.className += ' hide';
	}
}

function getPrivilegeLevelFromTier(tier) {
    if (!tier) {return 0;}
    var normalizedTier = String(tier).toLowerCase();
    if (normalizedTier === 'premium' || normalizedTier === 'vip') {
        return 2;
    }
    if (normalizedTier === 'standard' || normalizedTier === 'subscriber') {
        return 1;
    }
    return 0;
}

function getPrivilegeLevelFromUserType(userType) {
    if (!userType) {return 0;}
    var normalizedUserType = String(userType).toLowerCase();
    if (normalizedUserType === 'vip') {
        return 2;
    }
    if (normalizedUserType === 'subscriber') {
        return 1;
    }
    return 0;
}

function getPrivilegeLevelFromPrivileges(privileges) {
    if (!Array.isArray(privileges)) {return 0;}
    if (privileges.indexOf('EditorChoice') >= 0) {
        return 2;
    }
    if (privileges.indexOf('premium') >= 0) {
        return 1;
    }
    return 0;
}

function isAndroidMembershipActive(membership) {
    if (!membership) {return false;}
    if (membership.vip === true) {
        return true;
    }
    if (!membership.expireDate) {
        return false;
    }
    var expireDate = new Date(membership.expireDate);
    if (isNaN(expireDate.getTime())) {
        return false;
    }
    return expireDate >= new Date();
}

function getPrivilegeLevelFromAndroidMembership(membership) {
    if (!membership) {return 0;}
    if (membership.vip === true) {
        return 2;
    }
    if (!isAndroidMembershipActive(membership)) {
        return 0;
    }
    return getPrivilegeLevelFromTier(membership.webPrivilegeTier || membership.tier);
}

function getUserPrivilegeLevel() {
    var userPrivilegeLevel = getPrivilegeLevelFromPrivileges(window.gPrivileges);
    if (userPrivilegeLevel > 0) {
        return userPrivilegeLevel;
    }

    var membership = window.androidUserInfo && window.androidUserInfo.membership;
    userPrivilegeLevel = getPrivilegeLevelFromAndroidMembership(membership);
    if (userPrivilegeLevel > 0) {
        return userPrivilegeLevel;
    }

    userPrivilegeLevel = getPrivilegeLevelFromUserType(window.gUserType);
    if (userPrivilegeLevel > 0) {
        return userPrivilegeLevel;
    }

    userPrivilegeLevel = getPrivilegeLevelFromTier(window.subscriptionType);
    if (userPrivilegeLevel > 0) {
        return userPrivilegeLevel;
    }

    return 0;
}

function getExplicitContentPrivilegeLevel(itemContainer) {
    var tier = itemContainer.getAttribute('data-tier');
    return getPrivilegeLevelFromTier(tier);
}

function isAudioContent(itemContainer, subType, keywords) {
    if (/^(radio|speedreading)$/i.test(subType)) {
        return true;
    }
    if (itemContainer.getAttribute('data-audio')) {
        return true;
    }
    if (/\bis-audio\b/.test(itemContainer.className || '')) {
        return true;
    }
    return /音频|音頻|英语电台|英語電台|radio|speedreading/i.test(keywords);
}

function updateHeadlineLocks() {
    // Handle the case for HTML Book environment
    if (window.location.href.indexOf('htmlbook') > 0) {
        var itemContainers = document.querySelectorAll('.item-container');
        for (let container of itemContainers) {
            var itemHeadline = container.querySelector('.item-headline-link');
            if (itemHeadline) {
                var dataType = container.getAttribute('data-type');
                if (dataType === 'TryBook') {
                    itemHeadline.classList.add('locked');
                }
            }
        }
        return;
    }

    var userPrivilegeLevel = getUserPrivilegeLevel();

    // Select all item headlines
    var headlines = document.querySelectorAll('.item-headline-link');
    
    // Process each headline item
    for (let headline of headlines) {
        // Reset the classes (locked, unlocked, etc.)
        headline.classList.remove('locked', 'unlocked', 'vip');

        // Determine content privilege level
        var contentPrivilegeLevel = 0;
        var itemContainer = headline.closest('.item-container') || headline.closest('[data-type]');
        if (!itemContainer) {
            continue;
        }

        // Check for specific privilege based on data attributes or keywords
        var dataType = itemContainer.getAttribute('data-type');
        var dataSubType = itemContainer.getAttribute('data-sub-type') || '';
        var dataKeywords = itemContainer.getAttribute('data-keywords') || '';
        var dataDate = itemContainer.getAttribute('data-date') || null;
        var explicitPrivilegeLevel = getExplicitContentPrivilegeLevel(itemContainer);

        // Determine content privilege level
        if (dataType === 'TryBook') {
            contentPrivilegeLevel = 0; // No privilege for TryBook (locked by default)
        } else if (explicitPrivilegeLevel > 0) {
            contentPrivilegeLevel = explicitPrivilegeLevel;
        } else if (/高端专享|高端專享|高階專享/.test(dataKeywords)) {
            contentPrivilegeLevel = 2; // VIP content
        } else if (/会员专享|會員專享/.test(dataKeywords)) {
            contentPrivilegeLevel = 1; // Premium content
        } else if (dataType === 'premium' || isAudioContent(itemContainer, dataSubType, dataKeywords)) {
            contentPrivilegeLevel = 1; // Premium content
        } else if (dataType === 'story' && dataDate) {
            const archiveInSeconds = 24 * 60 * 60; // 24 hours
            let storyPubDate;

            if (/[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(dataDate)) {
                // Convert YYYY-MM-DD date to timestamp
                storyPubDate = new Date(dataDate).getTime() / 1000;
            } else {
                // Treat as a direct timestamp
                storyPubDate = parseInt(dataDate, 10);
            }

            const currentTimeStamp = Math.round(new Date().getTime() / 1000);
            if (currentTimeStamp - storyPubDate >= archiveInSeconds) {
                // Stories older than 24 hours require premium access
                contentPrivilegeLevel = Math.max(contentPrivilegeLevel, 1);
            }
        }

        if (contentPrivilegeLevel <= 0) {
            continue;
        }
        
        // Apply lock/unlock classes based on content privilege level

        if (userPrivilegeLevel >= contentPrivilegeLevel) {
            headline.classList.add('unlocked');
        } else {
            headline.classList.add('locked');
        }

        // Mark VIP articles
        if (contentPrivilegeLevel === 2) {
            headline.classList.add('vip');
        }
    }
}



updateHeadlineLocks();
