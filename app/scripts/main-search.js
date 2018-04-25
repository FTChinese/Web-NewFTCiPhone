function search (keys, page) {
	// console.log (keys);
	// console.log (typeof page);
	var url = '/index.php/ft/search/?keys='+ keys + '&type=default&i=4';
	if (typeof page === 'string') {
		url += '&page=' + page;
	}
	if (window.location.hostname === 'localhost') {
		url = '/api/search.json';
	}
	// MARK: Construct JSON request
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	    if (this.readyState === 4) {
	        if (this.status === 200) {
	            var data = this.responseText;
	            var searchResults = document.getElementById('search-results')
	            searchResults.innerHTML = data;
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
	            		var page = this.href.replace(/^.*page=([0-9]+).*$/g, '$1');
	            		search(keys, page);
	            		return false;
	            	}
	            }
	        } else {

	        }
	    }
	};
	document.getElementById('search-results').innerHTML = '<div style="margin: 14px;">查找中...</div>';
	xmlhttp.open('GET', url, true);
	xmlhttp.send();	
}