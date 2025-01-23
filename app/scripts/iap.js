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

    var privileges = window.gPrivileges || [];
    var userPrivilegeLevel = 0;

    // Determine user privilege level
    if (privileges.indexOf('EditorChoice') >= 0) {
        userPrivilegeLevel = 2;
    } else if (privileges.indexOf('premium') >= 0) {
        userPrivilegeLevel = 1;
    }

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
        var dataKeywords = itemContainer.getAttribute('data-keywords') || '';
        var dataDate = itemContainer.getAttribute('data-date') || null;

        // Determine content privilege level
        if (dataType === 'TryBook') {
            contentPrivilegeLevel = 0; // No privilege for TryBook (locked by default)
        } else if (/高端专享|高端專享|高階專享/.test(dataKeywords)) {
            contentPrivilegeLevel = 2; // VIP content
        } else if (/会员专享|會員專享/.test(dataKeywords)) {
            contentPrivilegeLevel = 1; // Premium content
        } else if (dataType === 'premium' || /radio|speedreading/.test(dataKeywords)) {
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