function getJSON() {
	if (window.location.href.indexOf('keeplinks=yes')>0) {
		console.log ('should keep links');
		return;
	}
	var allItems = document.querySelectorAll('.item-container-app');
	var items = [];
	for (var itemIndex=0; itemIndex<allItems.length; itemIndex++) {
		if (shouldUseNativeItemSelection(allItems[itemIndex])) {
			items.push(allItems[itemIndex]);
		}
	}
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
	var pageTitle;
	if (window.linksForShare && window.linksForShare.title) {
		pageTitle = window.linksForShare.title.replace(' - FT中文网', '').replace('&apos;', '\'');
	} else {
		pageTitle = document.title;
	}
	var data = {'meta':{'title':pageTitle,'description':'','theme':'default','adid':adId, 'adZone': adZone},'sections':[{'type':'block','title':'','name':'','side':'none','sideAlign':'right','lists':[{'name':'New List','title':'','url':'','description':'','language':'','float':'none','showTag':'no','showTimeStamp':'no','preferLead':'longlead','sponsorAdId':'','sponsorLogoUrl':'','sponsorLink':'','sponsorNote':'','feedStart':'0','feedItems':'0','feedTag':'','feedType':'all','feedImage':'optional','moreLink':'','items':[]}]}]};
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
		// MARK: - Send the keywords to native app
		var tag = items[i].getAttribute('data-keywords') || '';
		if (tag !== '') {
			item.tag = tag;
		}
		data.sections[0].lists[0].items.push(item);
		items[i].setAttribute('data-row', i);
		checkReadItem(items[i], item.id);
		removeLink(itemHeadlineEle);
		removeLink(items[i].querySelector('.image'));
		items[i].onclick = function(e) {
			tapOnEle(e, this);
		};
		//console.log (item);
	}
	try {
		if (typeof webkit === 'object') {
			webkit.messageHandlers.items.postMessage(data);
		}
	} catch (ignore) {}

	try {
		if (typeof Android === 'object') {
			Android.onPageLoaded(JSON.stringify(data));
		}
	} catch (ignore) {}

	specialReportsData();
	sendPageInfoToApp();
}

function shouldUseNativeItemSelection(ele) {
	var eleParent = ele;
	while (eleParent && eleParent !== document.body) {
		if (eleParent.className && typeof eleParent.className === 'string' && eleParent.className.indexOf('home-page-recommendation-list') >= 0) {
			return false;
		}
		eleParent = eleParent.parentNode;
	}
	return true;
}

function checkReadItem(ele, id) {
	try {
		var shouldCheckReadItems = window.readItems && window.readItems != '' && ele.className && ele.className.indexOf(' visited') < 0;
		if (shouldCheckReadItems) {
			var itemIsRead = window.readItems.indexOf(id) >= 0;
			if (itemIsRead) {
				ele.className += ' visited';
			}
		}
	} catch(ignore) {console.log(ignore);}
}

function checkReadItems() {
	var items = document.querySelectorAll('.item-container-app');
	console.log(items);
	for (var i=0; i<items.length; i++) {
		var itemId = items[i].getAttribute('data-id') || '';
		checkReadItem(items[i], itemId);
	}
}

function tapOnEle(event, ele) {
	var target = event.target;
	if (shouldStopPropagation(target)) {
		return;
	}
	var row = ele.getAttribute('data-row');
	try {
		if (typeof webkit === 'object') {
			webkit.messageHandlers.selectItem.postMessage(row);
		}
	} catch (ignore) {}

	try {
		if (typeof Android === 'object') {
			Android.onSelectItem(row);
		}
	} catch (ignore) {}


}

function shouldStopPropagation(ele) {
	var eleParent = ele;
	// MARK: - go up 5 levels
	for (var i=0; i<5; i++) {
		if (!eleParent) {
			return false;
		}
		if (eleParent.tagName === 'A' && eleParent.getAttribute('href')) {
			//console.log ('this is a link, return now! ');
			return true;
		}
		// MARK: - check if the user is clicking on an my ft follow link
		if (eleParent.className.indexOf('myft-follow') >= 0) {
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
		item.storyKeyWords = specialAnchors[i].getAttribute('storyKeyWords') || '';
		item.cntopic = specialAnchors[i].getAttribute('cntopic') || '';
		if (specialAnchors[i].getAttribute('hideAd')) {
			item.hideAd = specialAnchors[i].getAttribute('hideAd');
		}
		if (specialAnchors[i].getAttribute('hasPayingSponsor')) {
			item.hasPayingSponsor = specialAnchors[i].getAttribute('hasPayingSponsor');
		}
		specialAnchorsData.push(item);
	}
	try {
		if (typeof webkit === 'object') {
			webkit.messageHandlers.sponsors.postMessage(specialAnchorsData);
		}
	} catch (ignore) {}

	try {
		if (typeof Android === 'object') {
			Android.onLoadedSponsors(JSON.stringify(specialAnchorsData));
		}
	} catch (ignore) {}

}


function sharePageFromApp(linkObj) {
	try {
		if (typeof webkit === 'object') {
			webkit.messageHandlers.sharePageFromApp.postMessage(linkObj);
		}
	} catch (ignore) {}
	try {
		if (typeof Android === 'object') {
			Android.onSharePageFromApp(JSON.stringify(linkObj));
		}
	} catch (ignore) {}
}

function sendPageInfoToApp() {
	if (typeof window.linksForShare === 'object') {
		try {
			if (typeof webkit === 'object') {
				webkit.messageHandlers.sendPageInfoToApp.postMessage(window.linksForShare);
			}
		} catch (ignore) {}
		try {
			if (typeof Android === 'object') {
				Android.onSendPageInfoToApp(JSON.stringify(window.linksForShare));
			}
		} catch (ignore) {}
	}
}

var nativeListPageInitialized = false;

var NATIVE_HOME_RECOMMENDATION_TIMEOUT_MS = 30000;

function ensureNativeHomePageRecommendationContainer() {
	return document.getElementById('home-page-recommendation-container');
}

function renderNativeHomePageRecommendation() {
	var container = ensureNativeHomePageRecommendationContainer();
	if (!container || typeof renderHomePageRecommendationNow !== 'function') {
		return Promise.resolve({status: 'missing'});
	}
	return renderHomePageRecommendationNow({
		targetDom: container,
		limit: 24,
		timeoutMs: NATIVE_HOME_RECOMMENDATION_TIMEOUT_MS
	}).then(function(result) {
		var status = result && result.status ? result.status : 'unknown';
		container.setAttribute('data-native-render-status', status);
		if (result && typeof result.count === 'number') {
			container.setAttribute('data-native-render-count', result.count);
		}
		return result;
	}).catch(function(error) {
		console.log(error);
		container.setAttribute('data-native-render-status', 'failed');
		return {status: 'failed'};
	});
}

async function initNativeListPage() {
	if (nativeListPageInitialized) {
		return;
	}
	nativeListPageInitialized = true;
	try {
		var recommendationResult = await renderNativeHomePageRecommendation();
		window.ftcNativeHomeRecommendationStatus = recommendationResult && recommendationResult.status ? recommendationResult.status : 'unknown';
	} catch (error) {
		console.log(error);
		window.ftcNativeHomeRecommendationStatus = 'failed';
	} finally {
		getJSON();
	}
}

window.initNativeListPage = initNativeListPage;
