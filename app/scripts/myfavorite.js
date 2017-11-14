function updateFav(url, id) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState === 4) {
			if (this.status === 200) {
				console.log (this.responseText);
			}
		}
	};
	var params = 'storyid=' + id;
	var randomNumber = parseInt(Math.random()*1000000, 10);
	xmlhttp.open('POST', url + '?' + randomNumber);
	xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xmlhttp.send(params);
}

function getMyFavoriteList() {
	if (!document.getElementById('myfavorite-remote')) {
		return;
	}
	var url = '/users/favstorylist?type=json&' + Math.random();
	// MARK: for the covenience of test
    if (window.location.hostname === 'localhost') {
        url = '/api/myfavorite.json';
    }
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                var data = JSON.parse(this.responseText);
                var contentItems = '';
                for (var i=0; i<data.length; i++) {
                	if (!document.querySelector('[data-id="'+data[i].id+'"]')) {
	                	var contentItem = '<div class=\"item-container one-row L6 M12 S6 P12 item-container-app no-image\" data-id=\"' + data[i].id + '\" data-type=\"story\"><div class=\"item-inner\"><h2 class=\"item-headline\"><a target=\"_blank\" href=\"/story/' + data[i].id + '\">' + data[i].cheadline + '</a></h2><div class=\"item-lead\">' + data[i].clongleadbody + '</div><div class=\"item-bottom\"></div></div></div>';
	                	contentItems += contentItem;
                	}
                }
                document.getElementById('myfavorite-remote').innerHTML = contentItems;
                getJSON();
            }
        }
    };
    xmlhttp.open('GET', url, true);
    xmlhttp.send();

}

getMyFavoriteList();