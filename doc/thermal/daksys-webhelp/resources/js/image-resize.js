$(function () {
    var imgDom = $('img.image');
    var i = 0, l = imgDom.length, width, height, className, scale, isSpec;
    for (; i < l; i++) {
        className = imgDom[i].className;
        width = imgDom[i].getAttribute('width');
        height = imgDom[i].getAttribute('height');
        scale = imgDom[i].getAttribute('scale');
        
        if(className) {
            switch (true) {
                case (className.indexOf('spec_icon') > -1 &&  height == '60'):
                    imgDom[i].setAttribute('height', '600px');
                    imgDom[i].setAttribute('width', ''); /* width is invalid  */
					isSpec = true;
                    continue;
                case className.indexOf('spec_icon') > -1:
                    imgDom[i].setAttribute('height', '300px');
                    imgDom[i].setAttribute('width', ''); /* width is invalid  */
                    isSpec = true;
                    continue;
                case className.indexOf('bigicon') > -1 && isSpec == true:
                    imgDom[i].setAttribute('height', '80px');
                    imgDom[i].setAttribute('width', '');
                    continue;
                case className.indexOf('icon') > -1 && isSpec == true:
                    imgDom[i].setAttribute('height', '80px');
                    imgDom[i].setAttribute('width', '');
                    continue;
                case className.indexOf('bigicon') > -1:
                    imgDom[i].setAttribute('height', '40px');
                    imgDom[i].setAttribute('width', '');
                    continue;
                case className.indexOf('icon') > -1:
                    imgDom[i].setAttribute('height', '20px');
                    imgDom[i].setAttribute('width', '');
                    continue;
            }
        }
        if(width) {
            switch (true) {
                case width >= 1417:
                    imgDom[i].setAttribute('width', '700px');
                    imgDom[i].setAttribute('height', '');
                    break;
                case width >= 945 && width < 1417:
                    imgDom[i].setAttribute('width', '300px');
                    imgDom[i].setAttribute('height', '');
                    break;
                case width >= 591 && width < 945:
                    imgDom[i].setAttribute('width', '188px');
                    imgDom[i].setAttribute('height', '');
                    break;
                case width >= 354 && width < 591:
                    imgDom[i].setAttribute('width', '122px');
                    imgDom[i].setAttribute('height', '');
                    break;
                case width >= 0 && width < 354:
                    imgDom[i].setAttribute('width', '75px');
                    imgDom[i].setAttribute('height', '');
                    break;
            }
        } else if(height) {
            switch (true) {
                case height >= 2362:
                    if (BrowserDetect.browser=='Firefox' ){
                        imgDom[i].setAttribute('style', 'max-height:750px');
                    } else {
						imgDom[i].style.cssText = "max-height:750px";
					}
                    imgDom[i].setAttribute('height', '');
                    imgDom[i].setAttribute('width', '');
                    break;
                case height >= 1417:
                    if (BrowserDetect.browser=='Firefox' ){
                        imgDom[i].setAttribute('style', 'max-height:450px');
                    } else {
						imgDom[i].style.cssText = "max-height:450px";
					}
                    imgDom[i].setAttribute('height', '');
                    imgDom[i].setAttribute('width', '');
                    break;
                case height >= 945:
					if (BrowserDetect.browser=='Firefox' ){
                        imgDom[i].setAttribute('style', 'max-height:300px');
                    } else {
						imgDom[i].style.cssText = "max-height:300px";
					}
                    imgDom[i].setAttribute('height', '');
                    imgDom[i].setAttribute('width', '');
                    break;
                case height >= 500:
                    if (BrowserDetect.browser=='Firefox' ){
                        imgDom[i].setAttribute('style', 'max-height:150px');
                    } else {
						imgDom[i].style.cssText = "max-height:150px";
					}
                    imgDom[i].setAttribute('height', '');
                    imgDom[i].setAttribute('width', '');
                    break;
                case height >= 119:
                    if (BrowserDetect.browser=='Firefox' ){
                        imgDom[i].setAttribute('style', 'max-height:75px');
                    } else {
						imgDom[i].style.cssText = "max-height:75px";
					}
                    imgDom[i].setAttribute('height', '');
                    imgDom[i].setAttribute('width', '');
                    break;
                case height >= 0:
                    if (BrowserDetect.browser=='Firefox' ){
                        imgDom[i].setAttribute('style', 'max-height:30px');
                    } else {
						imgDom[i].style.cssText = "max-height:30px";
					}
                    imgDom[i].setAttribute('height', '');
                    imgDom[i].setAttribute('width', '');
                    break;
            }
        } else if(scale) {
            imgDom[i].setAttribute('scale', '');
            imgDom[i].setAttribute('height', '');
            imgDom[i].setAttribute('width', scale + '%');
        }
    }
    imgDom = null;
})