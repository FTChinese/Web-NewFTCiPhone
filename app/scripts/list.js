function getJSON() {
	if (window.location.href.indexOf('keeplinks=yes')>0) {
		console.log ('should keep links');
		return;
	}
	var items = document.querySelectorAll('.item-container-app');
	var adId = window.adchID || '1000';
	var data = {'meta':{'title':document.title,'description':'','theme':'default','adid':adId},'sections':[{'type':'block','title':'','name':'','side':'none','sideAlign':'right','lists':[{'name':'New List','title':'','url':'','description':'','language':'','float':'none','showTag':'no','showTimeStamp':'no','preferLead':'longlead','sponsorAdId':'','sponsorLogoUrl':'','sponsorLink':'','sponsorNote':'','feedStart':'0','feedItems':'0','feedTag':'','feedType':'all','feedImage':'optional','moreLink':'','items':[]}]}]};
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
	} catch (ignore) {

	}
	specialReportsData();
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
		item.channel = specialAnchors[i].getAttribute('channel') || '';
		if (specialAnchors[i].getAttribute('hideAd')) {
			item.hideAd = specialAnchors[i].getAttribute('hideAd');
		}
		specialAnchorsData.push(item);
	}
	try {
		webkit.messageHandlers.sponsors.postMessage(specialAnchorsData);
	} catch (ignore) {

	}
}

getJSON();