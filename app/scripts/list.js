function getJSON() {
	if (window.location.href.indexOf('keeplinks=yes')>0) {
		console.log ('should keep links');
		return;
	}
	var items = document.querySelectorAll('.item-container-app');
	var adId = window.adchID || '1000';
	var data = {'meta':{'title':'List','description':'','theme':'default','adid':adId},'sections':[{'type':'block','title':'','name':'','side':'none','sideAlign':'right','lists':[{'name':'New List','title':'','url':'','description':'','language':'','float':'none','showTag':'no','showTimeStamp':'no','preferLead':'longlead','sponsorAdId':'','sponsorLogoUrl':'','sponsorLink':'','sponsorNote':'','feedStart':'0','feedItems':'0','feedTag':'','feedType':'all','feedImage':'optional','moreLink':'','items':[]}]}]};
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
}

function tapOnEle(event, ele) {
	var target = event.target;
	if (target.tagName === 'A' && target.getAttribute('href')) {
		//console.log ('this is a link, return now! ');
		return;
	}
	var row = ele.getAttribute('data-row');
	//console.log (row);
	webkit.messageHandlers.selectItem.postMessage(row);
}

function removeLink(ele) {
	if (ele && ele.getAttribute('href')) {
		ele.removeAttribute('href');
	}
}

function refreshAllAds() {
	var adFrames = document.querySelectorAll('.banner-iframe');
	for (var i=0; i<adFrames.length; i++) {
		adFrames[i].contentDocument.location.reload(true);
	}
}

getJSON();