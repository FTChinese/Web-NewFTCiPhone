function search (keys) {
	var url = '/index.php/ft/search/?keys='+ keys + '&type=default&i=4';
	if (window.location.hostname === 'localhost') {
		url = '/api/search.json';
	}
	// MARK: Construct JSON request
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	    if (this.readyState === 4) {
	        if (this.status === 200) {
	            var data = this.responseText;
	            document.getElementById('search-results').innerHTML = data;
	        } else {

	        }
	    }
	};
	document.getElementById('search-results').innerHTML = '<div style="margin: 14px;">查找中...</div>';
	xmlhttp.open('GET', url, true);
	xmlhttp.send();	
}