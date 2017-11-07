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
