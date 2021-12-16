(function () {
	try {
        // MARK: - The Android native app doesn't have the cookie required for posting comments and login, hide it
        if (typeof Android === 'object') {
            var commentsEle = document.getElementById('allcomments');
            if (commentsEle) {
                commentsEle.parentElement.style.display = 'none';
            }
        }
    } catch(ignore){}
	
})();