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
	document.getElementById(id).innerHTML = htmlCode;
	loadImages();
}

// MARK: Update the locks at the end of premium content headlines
function updateHeadlineLocks() {
	// MARK: If a reader opens the link in an HTML Book, No need to display locks
	if (window.location.href.indexOf('htmlbook') > 0) {
		return;
	}
	var privileges = window.gPrivileges || [];
	
	// MARK: Story Archive
	var archiveInSeconds = 7 * 24 * 60 * 60;
	var storyItems = document.querySelectorAll('[data-type=story][data-date]');
	for (var k=0; k<storyItems.length; k++) {
		var storyPubDate = storyItems[k].getAttribute('data-date');
		storyPubDate = parseInt(storyPubDate, 10);
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

	// MARK: Premium content for standard and premium subscribers
	var headlines = document.querySelectorAll('[data-type=premium] .item-headline-link, [data-sub-type=radio] .item-headline-link, [data-sub-type=speedreading] .item-headline-link');
	for (var i=0; i<headlines.length; i++) {
		var headlineClass = headlines[i].className.replace(/unlocked/g, '').replace(/locked/g, '').replace(/ +/, ' ');
		if (privileges.indexOf('premium') >= 0) {
			headlines[i].className = headlineClass + ' unlocked';
		} else {
			headlines[i].className = headlineClass + ' locked';
		}
	}

	// MARK: Premium content for premium subscribers such as EditorChoice
	if (window.location.href.indexOf('pageid=EditorChoice-')>=0) {
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

updateHeadlineLocks();