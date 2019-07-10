(function () {
	function shouldStopPropagation(ele) {
		var eleParent = ele;
		for (var i=0; i<5; i++) {
			if (!eleParent) {
				return false;
			}
			if (eleParent.tagName === 'A' && eleParent.getAttribute('href')) {
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

	function wrap_single(el, wrapper) {
	    el.parentNode.insertBefore(wrapper, el);
	    wrapper.appendChild(el);
	}

	var images = document.querySelectorAll('.story-body img, .story-image figure');
	for (var i=0; i<images.length; i++) {
		var image = images[i];
		var imageUrl = image.src || image.getAttribute('data-url') || '';
		if (shouldStopPropagation(image) === false && imageUrl !== '') {
			var linkWrapper = document.createElement('a');
			linkWrapper.href = imageUrl;
			linkWrapper.target = '_blank';
			wrap_single(image, linkWrapper);
		}
	}
	
})();