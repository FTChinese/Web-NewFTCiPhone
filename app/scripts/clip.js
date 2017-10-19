    var isLove=false
    function clip(ele){

        if (isLove===false) {
            console.log('llllove')
            ele.src = 'http://static.ftchinese.com/images/png/loveActive.png'
            isLove = true
        }else{
            console.log('not llllove')
            ele.src = 'http://static.ftchinese.com/images/png/love.png'
            isLove = false
        }
    }