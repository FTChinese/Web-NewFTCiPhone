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
	// MARK: If a reader opens the link in an HTML Book, No need to display locks. But if an item is marked as 'TryBook', display the lock.
	if (window.location.href.indexOf('htmlbook') > 0) {
		var itemContainers = document.querySelectorAll('.item-container');
		for (var s=0; s<itemContainers.length; s++) {
			var itemHeadline = itemContainers[s].querySelector('.item-headline-link');
			if (itemHeadline) {
				var itemHeadlineClass = itemHeadline.className;
				var itemHeadlineNewClass = itemHeadlineClass.replace(/unlocked/g, '').replace(/locked/g, '').replace(/ +/, ' ');
				var itemDataType = itemContainers[s].getAttribute('data-type');
				if (itemDataType && itemDataType === 'TryBook') {
					itemHeadlineNewClass += ' locked';
				}
				if (itemHeadlineClass !== itemHeadlineNewClass) {
					itemHeadline.className = itemHeadlineNewClass;
				}
			}
		}
		return;
	}
	var privileges = window.gPrivileges || [];
	var userPrivilegeLevel = 0;
	if (privileges.indexOf('EditorChoice') >= 0) {
		userPrivilegeLevel = 2;
	} else if (privileges.indexOf('premium') >= 0) {
		userPrivilegeLevel = 1;
	}
	// MARK: Remove all existing lock classes
	var lockedItems = document.querySelectorAll('.item-headline-link.locked, .item-headline-link.unlocked');
	for (var r=0; r<lockedItems.length; r++) {
		lockedItems[r].className = lockedItems[r].className.replace(/unlocked/g, '').replace(/locked/g, '').replace(/ +/, ' ');
	}
	// MARK: Story Archive
	var archiveInSeconds = 2 * 24 * 60 * 60;
	var storyItems = document.querySelectorAll('[data-type=story][data-date]');
	for (var k=0; k<storyItems.length; k++) {
		var storyPubDate = storyItems[k].getAttribute('data-date');
		if (/[0-9]{4}-[0-9]{2}-[0-9]{2}/i.test(storyPubDate)){
			storyPubDate = new Date(storyPubDate).getTime() / 1000
		} else {
			storyPubDate = parseInt(storyPubDate, 10);
		}
		var currentTimeStamp = Math.round(new Date().getTime()/1000);
		var storyHeadline = storyItems[k].querySelector('.item-headline-link');
		if (currentTimeStamp - storyPubDate >= archiveInSeconds) {
			var headlineClass = storyHeadline.className.replace(/unlocked/g, '').replace(/locked/g, '').replace(/ +/, ' ');
			if (privileges.indexOf('premium') >= 0) {
				storyHeadline.className = headlineClass + ' unlocked';
			} else {
				storyHeadline.className = headlineClass + ' locked';
			}
		}
	}
	// MARK: Paid content for standard and premium subscribers
	var headlines = document.querySelectorAll('[data-type=premium] .item-headline-link, [data-sub-type=radio] .item-headline-link, [data-sub-type=speedreading] .item-headline-link, [data-type=premium].item-headline-link, [data-sub-type=radio].item-headline-link, [data-sub-type=speedreading].item-headline-link');
	for (var i=0; i<headlines.length; i++) {
		var headlineClass = headlines[i].className.replace(/unlocked/g, '').replace(/locked/g, '').replace(/ +/, ' ');
		if (privileges.indexOf('premium') >= 0) {
			headlines[i].className = headlineClass + ' unlocked';
		} else {
			headlines[i].className = headlineClass + ' locked';
		}
	}
	// MARK: Paid content for premium subscribers such as EditorChoice
	if (window.location.href.indexOf('pageid=EditorChoice-')>=0 || window.location.href.indexOf('editorchoice-issue')>=0) {
		var headlines2 = document.querySelectorAll('.item-headline-link');
		for (var j=0; j<headlines2.length; j++) {
			var headlineClass = headlines2[j].className.replace(/unlocked/g, '').replace(/locked/g, '').replace(/ +/, ' ');
			if (privileges.indexOf('EditorChoice') >= 0) {
				headlines2[j].className = headlineClass + ' unlocked';
			} else {
				headlines2[j].className = headlineClass + ' locked';
			}
		}
	}
	// MARK: Support "会员专享" and "高端专享"
	var interactives = document.querySelectorAll('[data-type=interactive][data-keywords]');
	for (var m=0; m<interactives.length; m++) {
		var keyWords = interactives[m].getAttribute('data-keywords');
		var contentPrivilegeLevel = 0;
		if (keyWords.indexOf('高端专享')>=0) {
			contentPrivilegeLevel = 2;
		} else if (keyWords.indexOf('会员专享')>=0) {
			contentPrivilegeLevel = 1;
		}
		if (contentPrivilegeLevel>0) {
			var currentHeadline = (interactives[m].className.indexOf('item-headline-link') >= 0) ? interactives[m] : interactives[m].querySelector('.item-headline-link');
			if (currentHeadline) {
				var headlineClass = currentHeadline.className.replace(/unlocked/g, '').replace(/locked/g, '').replace(/ +/, ' ');
				if (userPrivilegeLevel >= contentPrivilegeLevel) {
					currentHeadline.className = headlineClass + ' unlocked';
				} else {
					currentHeadline.className = headlineClass + ' locked';
				}
			}
		}
	}
}

updateHeadlineLocks();