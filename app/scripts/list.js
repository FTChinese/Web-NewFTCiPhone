function getJSON() {
	if (window.location.href.indexOf('keeplinks=yes')>0) {
		console.log ('should keep links');
		return;
	}
	var items = document.querySelectorAll('.item-container-app');
	var adId = window.adchID || '1000';
	var adZone = 'home';
	try {
		var results = {};
		var jsonScripts = Array.from(document.querySelectorAll('script[data-o-ads-config]'));
		for (var k=0; k<jsonScripts.length; k++) {
			results = JSON.parse(jsonScripts[k].innerHTML);
			adZone = results.gpt.zone;
		}
	} catch (ignore) {}
	var data = {'meta':{'title':document.title,'description':'','theme':'default','adid':adId, 'adZone': adZone},'sections':[{'type':'block','title':'','name':'','side':'none','sideAlign':'right','lists':[{'name':'New List','title':'','url':'','description':'','language':'','float':'none','showTag':'no','showTimeStamp':'no','preferLead':'longlead','sponsorAdId':'','sponsorLogoUrl':'','sponsorLink':'','sponsorNote':'','feedStart':'0','feedItems':'0','feedTag':'','feedType':'all','feedImage':'optional','moreLink':'','items':[]}]}]};
	var itemsArray = [];
	for (var i=0; i<items.length; i++) {
		var item = {};
		item.id = items[i].getAttribute('data-id') || '';
		item.type = items[i].getAttribute('data-type') || '';
		var itemHeadlineEle = items[i].querySelector('.item-headline-link')
		if (itemHeadlineEle) {
			item.headline = itemHeadlineEle.innerHTML || '';
		} else {
			item.headline = '';
		}
		var audioUrl = items[i].getAttribute('data-audio') || '';
		if (audioUrl !== '') {
			item.shortlead = items[i].getAttribute('data-audio');
		}
		var caudioUrl = items[i].getAttribute('data-caudio') || '';
		if (caudioUrl !== '') {
			item.caudio = caudioUrl;
		}
		var eaudioUrl = items[i].getAttribute('data-eaudio') || '';
		if (eaudioUrl !== '') {
			item.eaudio = eaudioUrl;
		}
		var subType = items[i].getAttribute('data-sub-type') || '';
		if (subType != '') {
			item.subType = subType;
		}
		var pubDate = items[i].getAttribute('data-date') || '';
		if (pubDate != '') {
			item.timeStamp = pubDate;
		}
		data.sections[0].lists[0].items.push(item);
		items[i].setAttribute('data-row', i);
		removeLink(itemHeadlineEle);
		removeLink(items[i].querySelector('.image'));
		items[i].onclick = function(e) {
			tapOnEle(e, this);
		};
	}
	try {
		webkit.messageHandlers.items.postMessage(data);
	} catch (ignore) {}
	specialReportsData();
	sendPageInfoToApp();
}

function tapOnEle(event, ele) {
	var target = event.target;
	// if (target.tagName === 'A' && target.getAttribute('href')) {
	// 	//console.log ('this is a link, return now! ');
	// 	return;
	// }
	if (isInLink(target)) {
		return;
	}
	var row = ele.getAttribute('data-row');
	//console.log (row);
	webkit.messageHandlers.selectItem.postMessage(row);
}

function isInLink(ele) {
	var eleParent = ele;
	for (var i=0; i<5; i++) {
		if (!eleParent) {
			return false;
		}
		if (eleParent.tagName === 'A' && eleParent.getAttribute('href')) {
			//console.log ('this is a link, return now! ');
			return true;
		}
		eleParent = eleParent.parentNode;
	}
	return false;
}

function removeLink(ele) {
	if (ele && ele.getAttribute('href')) {
		var sponsorLink = ele.getAttribute('data-sponsor-link') || '';
		if (sponsorLink !== 'yes') {
		ele.removeAttribute('href');
		}
	}
}

function refreshAllAds() {
	var adFrames = document.querySelectorAll('.banner-iframe');
	for (var i=0; i<adFrames.length; i++) {
		adFrames[i].contentDocument.location.reload(true);
	}
}

function specialReportsData() {
	var specialAnchors = document.querySelectorAll('.specialanchor');
	var specialAnchorsData = [];
	for (var i=0; i<specialAnchors.length; i++) {
		var item = {};
		item.tag = specialAnchors[i].getAttribute('tag') || '';
		item.title = specialAnchors[i].getAttribute('title') || '';
		item.adid = specialAnchors[i].getAttribute('adid') || '';
		item.zone = specialAnchors[i].getAttribute('zone') || '';
		item.channel = specialAnchors[i].getAttribute('channel') || '';
		if (specialAnchors[i].getAttribute('hideAd')) {
			item.hideAd = specialAnchors[i].getAttribute('hideAd');
		}
		specialAnchorsData.push(item);
	}
	try {
		webkit.messageHandlers.sponsors.postMessage(specialAnchorsData);
	} catch (ignore) {}
}

function sharePageFromApp(linkObj) {
	try {
		webkit.messageHandlers.sharePageFromApp.postMessage(linkObj);
	} catch (ignore) {

	}
}

function sendPageInfoToApp() {
	if (typeof window.linksForShare === 'object') {
		try {
			webkit.messageHandlers.sendPageInfoToApp.postMessage(window.linksForShare);
		} catch (ignore) {}
	}
}

function highlightFollowedContent(obj) {
	function anyMatchInArray(target, toMatch) {
	    var found, targetMap, i, j, cur;
	    found = false;
	    targetMap = {};
	    for (i = 0, j = target.length; i < j; i++) {
	        cur = target[i];
	        targetMap[cur] = true;
	    }
	    for (i = 0, j = toMatch.length; !found && (i < j); i++) {
	        cur = toMatch[i];
	        found = !!targetMap[cur];
	    }
	    return found;
	}
	// MARK: Don't do anything if not on mobile
	if (typeof obj !== 'object' || w > 450) {
		return;
	}
	var keyWords = [];
	for (var prop in obj) {
	    if (obj.hasOwnProperty(prop)) {
	    	for (var i=0; i<obj[prop].length; i++) {
	    		keyWords.push(obj[prop][i]);
	    	}
	    }
	}
	var items = document.querySelectorAll('[data-keywords]');
	var myFTFollowHTML = '';
	for (var j=0; j<items.length; j++) {
		var currentKeyWords = items[j].getAttribute('data-keywords').split(',');
		if (anyMatchInArray(currentKeyWords, keyWords)) {
			var lead = items[j].querySelector('.item-lead');
			if (lead) {
				var topLine = (j===0) ? '' : '<div class="PT"></div>';
				if (j > 0 && items[j].className && items[j].className.indexOf('P-half')<0) {
					items[j].className += ' P-half';
				}
				myFTFollowHTML += topLine + items[j].outerHTML;
				var topLineEle = items[j].previousElementSibling;
				//if ()(topLineEle.className);
				if (topLineEle && topLineEle.className && topLineEle.className.indexOf('PT') >= 0) {
					topLineEle.outerHTML = '';
				}
				items[j].outerHTML = '';
			}
		}
	}
	if (myFTFollowHTML === '') {
		return;
	}
	var newItem = document.createElement('div');
	newItem.innerHTML = '<div class="block-container no-side"><div class="block-inner"><div class="content-inner"><div class="list-container"><div class="list-inner"><h2 class="list-title"><a class="list-link" href="screen://myft/follow">我的FT</a></h2><div class="items">'+ myFTFollowHTML +'</div></div></div><div class="clearfloat block-bottom"></div></div></div><div class="clearfloat"></div></div></div>';
	var firstBlock = document.querySelector('.block-container');
	if (firstBlock) {
		var listTitleEle = firstBlock.querySelector('.list-title');
		var listItems = firstBlock.querySelector('.items');
		if (!listTitleEle && listItems) {
			listTitleEle = document.createElement('h2');
			listTitleEle.className = 'list-title';
			listTitleEle.innerHTML = '<a class="list-link" href="#">今日焦点</a>';
			listItems.parentNode.insertBefore(listTitleEle, listItems);
		}
		firstBlock.parentNode.insertBefore(newItem, firstBlock);
		var inforAd1 = document.querySelector('[data-o-ads-name="infoflow1"],.hide-iframe');
		if (inforAd1) {
			firstBlock.parentNode.insertBefore(inforAd1, firstBlock);
		}

		var iapHighlight = document.querySelector('#iap-highlight');
		var itemsWithIAPHighlight = iapHighlight.parentNode.querySelectorAll('.PT');
		var iapHighlightPos = 8;
		if (itemsWithIAPHighlight.length > iapHighlightPos) {
			for (var l=0; l<itemsWithIAPHighlight.length; l++) {
				iapHighlight.parentNode.insertBefore(iapHighlight, itemsWithIAPHighlight[iapHighlightPos]);
			}
		} else {
			iapHighlight.outerHTML = '';
		}
	}
	var listEles = document.querySelectorAll('.items');
	for (var k=0; k<listEles.length; k++) {
		var allItems = listEles[k].querySelectorAll('.item-container');
		for (var m=0; m<allItems.length; m++) {
			if (m === 0) {
				var firstItemTopLine = allItems[m].previousElementSibling;
				if (firstItemTopLine && firstItemTopLine.className && firstItemTopLine.className.indexOf('PT') >= 0) {
					firstItemTopLine.outerHTML = '';
				}
				allItems[m].className = allItems[m].className.replace(/P-half/g, '');
			} else {
				allItems[m].className += ' P-half';
			}
		}
	}
}
try {
	highlightFollowedContent(window.myFollow);
} catch (ignore) {}
getJSON();
