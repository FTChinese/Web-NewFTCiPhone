(function () {
	function isInLink(ele) {
		var eleParent = ele;
		for (var i=0; i<5; i++) {
			if (!eleParent) {
				return false;
			}
			if (eleParent.tagName === 'A' && eleParent.getAttribute('href')) {
				return true;
			}
			eleParent = eleParent.parentNode;
		}
		return false;
	}
	var images = document.querySelectorAll('.story-body img, .story-image figure');
	for (var i=0; i<images.length; i++) {
		var image = images[i];
		var imageUrl = image.src || image.getAttribute('data-url') || '';
		if (isInLink(image) === false && imageUrl !== '') {
			var parentEl = image.parentNode;
			if (parentEl !== undefined) {			
				var imgEl = parentEl.innerHTML;
				parentEl.innerHTML = '<a href="' + imageUrl + '" target="_blank">' + imgEl + '</a>';
			}
		}
	}
})();