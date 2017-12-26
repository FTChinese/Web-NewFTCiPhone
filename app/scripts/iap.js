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
	var privileges = window.gPrivileges || [];

	// MARK: Premium content for standard and premium subscribers
	var headlines = document.querySelectorAll('[data-type=premium] .item-headline-link');
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

updateHeadlineLocks();