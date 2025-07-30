var searchResults = document.getElementById('search-results');

function search(keys, page) {
    function reportSearchResultToNative(term, status) {
        var data = {action: 'search', term: term, status: status};
        try {
            if (typeof webkit === 'object') {
                webkit.messageHandlers.searchResults.postMessage(data);
            } else if (typeof Android === 'object') {
                Android.onPageLoaded(JSON.stringify(data));
            }
        } catch (ignore) {}
    }
	// MARK: - Set Cookie so that the search engine will not refuse to serve
	SetCookie('viewpc',1,86400*10000,'/');
	var brand = 'other';
	var ua = navigator.userAgent || '';
	if (typeof webkit === 'object') {
		brand = 'apple';
	} else if (/huawei/gi.test(ua)) {
		brand = 'huawei';
	}
	var isPaidSubscriber = false;
	if (typeof window.subscriptionType === 'string') {
		// MARK: - iOS native app
		isPaidSubscriber = !(window.subscriptionType === 'noneSubscriber');
	} else if (window.androidUserInfo && window.androidUserInfo.membership) {
		// MARK: - Android native app
		var expireDate = new Date(window.androidUserInfo.membership.expireDate);
		var todayDate = new Date();
		if (expireDate >= todayDate) {
			isPaidSubscriber = true;
		} else if (window.androidUserInfo.membership.vip === true) {
			isPaidSubscriber = true;
		}
	}
	var paid = isPaidSubscriber ? 'yes' : 'no';
	var url = '/index.php/ft/search/?keys='+ keys + '&type=default&i=4&supportsubtype=yes&brand=' + brand + '&paid=' + paid;
	if (typeof page === 'string') {
		url += '&page=' + page;
	}
	if (window.location.hostname === 'localhost') {
		// url = '/api/search.json';
		url = '/api/search-result.html';
	}
	// MARK: Construct JSON request
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	    if (this.readyState === 4) {
	        if (this.status === 200) {
				// MARK: - the format returned from server might be messy. Use JSON to make it work better. 
	            // var d = JSON.parse(this.responseText);
	            // var data = JSON.stringify(d);
				var data = this.responseText;
				// console.log(data);
	            if (data.indexOf('search-server-down')>=0) {
	            	reportSearchResultToNative(keys, 'fail');
					// console.log(2)
	            } else {
	            	reportSearchResultToNative(keys, 'success');
					if (typeof webkit === 'object') {
						// MARK: - If it's an iOS native app, upload the data to native side to convert to localized language
						const info = {data: data, keys: keys};
						webkit.messageHandlers.searchResultsData.postMessage(info);
					}
		            showSearchResult(data, keys);
	            }
	        } else {
	        	reportSearchResultToNative(keys, 'fail');
	        }
	    }
	};
	searchResults.innerHTML = '<div style="margin: 14px;">查找中...</div>';
	xmlhttp.open('GET', url, true);
	xmlhttp.send();	
}

function showSearchResult(data, keys) {
	// console.log('data:', data);
	// console.log('keys:', keys);
	searchResults.innerHTML = data;//<div>${keys}</div>
	updateHeadlineLocks();
	var paginationEle = document.querySelector('.pagination');
	if (paginationEle !== null) {
		var paginationEleHTML = '<div class="pagination-inner">' + paginationEle.innerHTML + '</div>';
		paginationEle.innerHTML = paginationEleHTML;
		paginationEle.className = 'pagination-container';
	}
	var pageLinks = searchResults.querySelectorAll('.pagination-inner a');
	for (var i=0; i<pageLinks.length; i++) {
		pageLinks[i].onclick = function() {
			var page = this.href.replace(/^.*(page|p)=([0-9]+).*$/g, '$2');
			// console.log('keys: ', keys, ', page: ', page);
			search(keys, page);
			return false;
		}
	}
}