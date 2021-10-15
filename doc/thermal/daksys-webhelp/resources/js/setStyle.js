/*设置content_area的高度*/
/*var contentArea = $('#content_area');
var bodyWrapper = contentArea.parent();
contentArea.css('height', (parseFloat(bodyWrapper.css('height').replace('px', '')) - contentArea.position().top) + 'px');*/
/*当点击上方的菜单按钮时修改content_area的高度*/
var preMenuHeight = 0;
var contentArea = $('#content_area');
var bodyWrapper = $('.bodywrapper').eq(0);
var footer = $('.wh_footer').eq(0);
/* setInterval(function(){
	if($('.wh_top_menu_and_indexterms_link').length > 0){
		var nowMenuHeight = parseFloat($('.wh_headerlogo').eq(0).css('height').replace('px', '')) - parseFloat($('.wh_logo_and_publication_title_container').eq(0).css('height').replace('px', ''));
		if(preMenuHeight != nowMenuHeight){
			contentArea.css('margin-top', (parseFloat(contentArea.css('margin-top').replace('px', '')) + (nowMenuHeight - preMenuHeight)) + 'px');
			preMenuHeight = nowMenuHeight;
		}
	}
}, 200); */
if($(document).width() < 767){
	/*增加wh_top_menu_and_indexterms_link的最大高度为页面的最大高度*/
	$('.wh_top_menu_and_indexterms_link').eq(0).css('max-height', $(window).height() * 0.5 + 'px');
}else{
	/*增加对于index.html页面的跳转*/
	var home_url = window.location.href;
	if(home_url.indexOf('index.html') > 0 || home_url.charAt(home_url.length-1)=='/'){
		var a = $('.desktop_left').eq(0).children('.menu_ul').eq(0).children('li').eq(0).find('a').eq(0);
		if(a.attr('href') != null && a.attr('href') != ''){
			window.location.href = a.attr('href');
		}
	}
}
//bodyWrapper.css('width', '100%');//document.body.clientWidth + 'px'
//footer.css('width', '100%');//document.body.clientWidth + 'px'
/*$('.wh_toggle_button').on('mouseup', function(){
	var menuHeight = parseFloat($('.wh_top_menu_and_indexterms_link').eq(0).css('height').replace('px', ''));
	if(menuHeight == 0.0){
		contentArea.css('height', (parseFloat(contentArea.css('height').replace('px', '')) - menuHeight) + 'px');
	}else{
		contentArea.css('height', (parseFloat(contentArea.css('height').replace('px', '')) + menuHeight) + 'px');
	}
});*/
/*当页面滚动时，取消输入框自动补齐的Autocomplete功能*/
$(document).scroll(function(){
	$("#textToSearch").autocomplete("close");
});
/*根据iframe中内容的高度，设置iframe的高度*/
/*var iframeTimer = setInterval(function(){
	if($('iframe').eq(0).contents().find('.menu_ul_1').length > 0){
		//console.log($('iframe').eq(0).contents().find('.menu_ul_1').css('height'));
		$('iframe').eq(0).attr('height', $('iframe').eq(0).contents().find('.menu_ul_1').css('height'));
		clearInterval(iframeTimer);
	}
}, 100);*/
/*记录li_has_children的li_open和li_close*/
var liStatus;
if($.cookie('li_status') != null){
	liStatus = str2array($.cookie('li_status'));
	console.log(liStatus);
	if(liStatus.length == $('.li_has_children').length){
		for(var i = 0; i < $('.li_has_children').length; i++){
			if(liStatus[i] == 'li_open'){
				setLiStatusOpen($('.li_has_children').eq(i));
			}else if(liStatus[i] == 'li_close'){
				setLiStatusClose($('.li_has_children').eq(i));
			}
		}
	}else{
		liStatus = new Array();
		$('.li_has_children').each(function(){
			liStatus.push('li_close');
			setLiStatusClose($(this));
		});
		$.cookie('li_status', array2str(liStatus), { expires: 7 });
	}
}else{
	liStatus = new Array();
	$('.li_has_children').each(function(){
		liStatus.push('li_close');
		setLiStatusClose($(this));
	});
	$.cookie('li_status', array2str(liStatus), { expires: 7 });
}
/*根据url添加目录的active类*/
var url = location.href;
var href = url.split('/')[url.split('/').length - 1];
if($('.desktop_left').length != 0){
	$('.desktop_left').find('li').each(function(){
		if(href == $(this).find('a').attr('href')){
			$(this).addClass('active');
		}
	});
}
/*增加li_before的点击事件*/
$('.li_before').unbind('click').bind('click', function(){
	var liPosition = $('.li_has_children').index($(this).parent().parent());
	if($(this).parent().parent().hasClass('li_close')){
		$(this).parent().parent().removeClass('li_close');
		$(this).parent().parent().addClass('li_open');
		liStatus[liPosition] = 'li_open';
	}else if($(this).parent().parent().hasClass('li_open')){
		$(this).parent().parent().addClass('li_close');
		$(this).parent().parent().removeClass('li_open');
		liStatus[liPosition] = 'li_close';
	}
	$.cookie('li_status', array2str(liStatus), { expires: 7 });
});
/*监听窗口的滚动事件*/
var startX, startY;  
document.addEventListener('touchstart', function(ev){
    startX = ev.touches[0].pageX;
    startY = ev.touches[0].pageY;
}, false);
document.addEventListener('touchend',function (ev) {  
    var endX, endY;  
    endX = ev.changedTouches[0].pageX;  
    endY = ev.changedTouches[0].pageY;  
    var direction = GetSlideDirection(startX, startY, endX, endY);
    switch(direction){
        case 0:
            break;
        case 1:
            // 手指向上滑动
            //$('.wh_header').css('display', 'none');
            //$('.wh_main_page_search').css('display', 'none');
            //$('.wh_search_input').css('display', 'none');
            var scrollTop = 0;
            var scrollTimer = setInterval(function(){
				if(scrollTop != $(document).scrollTop()){
					scrollTop = $(document).scrollTop();
				}else{
					scrollTop = $(document).scrollTop();
					clearInterval(scrollTimer);
					//alert(scrollTop);
					if($(document).scrollTop() > 60){
		            	$('.wh_header').css('display', 'none');
		            	$('.wh_main_page_search').css('display', 'none');
		            	$('.wh_search_input').css('display', 'none');
		            }
				}
			}, 50);
            break;
        case 2:
            // 手指向下滑动
            //alert(endScrollTop());
            var scrollTop = 0;
            var scrollTimer = setInterval(function(){
				if(scrollTop != $(document).scrollTop()){
					scrollTop = $(document).scrollTop();
				}else{
					scrollTop = $(document).scrollTop();
					clearInterval(scrollTimer);
					//alert(scrollTop);
					if($(document).scrollTop() <= 60){
		            	$('.wh_header').css('display', 'block');
		            	$('.wh_main_page_search').css('display', 'block');
		            	$('.wh_search_input').css('display', 'block');
		            }
				}
			}, 50);
            break;
    }
}, false);
function setLiStatusOpen(obj){
	obj.removeClass('li_close');
	obj.addClass('li_open');
}
function setLiStatusClose(obj){
	obj.removeClass('li_open');
	obj.addClass('li_close');
}
function array2str(array){
	var str = "";
	for(var i = 0; i < array.length; i++){
		if(i != array.length - 1){
			str = str + array[i] + "-";
		}else{
			str = str + array[i];
		}
	}
	return str;
}
function str2array(str){
	var array = new Array();
	for(var i = 0; i < str.split('-').length; i++){
		array.push(str.split('-')[i]);
	}
	return array;
}
function GetSlideDirection(startX, startY, endX, endY) {  
    var dy = startY - endY;  
    var dx = endX - startX;  
    var result = 0; 
    if(dy > 0){//向上滑动
        return 1;
    }else{//向下滑动
        return 2;
    }
    if(dx > 0){//向右滑动
    	return 3;
    }else{//向左滑动
    	return 4;
    } 
}

// 显示目录的全部
setDesktopMenuMove();
function setDesktopMenuMove(){
    $('.desktop_left').find('a').unbind('mouseover').bind('mouseover', function(){
        var flag = isEllipsis($(this)[0]);
        if(flag){
            $('.menu-tempdiv').html($(this).html());
            $('.menu-tempdiv').removeClass('hidden');
            $('.menu-tempdiv').addClass('show');
            $('.menu-tempdiv').css('top', $(this).offset().top + 29 - $('body,html').scrollTop() + 'px');
            $('.menu-tempdiv').css('left', $(this).offset().left + 'px');
            /*if($(this).parent().hasClass('li-1')){
                $('.menu-tempdiv').css('left', $(this).offset().left + 36 + 'px');
            }else if($(this).parent().hasClass('li-2')){
                $('.menu-tempdiv').css('left', $(this).offset().left + 72 + 'px');
            }else if($(this).parent().hasClass('li-3')){
                $('.menu-tempdiv').css('left', $(this).offset().left + 108 + 'px');
            }*/
        }
    })
    $('.desktop_left').find('a').unbind('mouseout').bind('mouseout', function(){
        $('.menu-tempdiv').removeClass('show');
        $('.menu-tempdiv').addClass('hidden');
    })
}
function isEllipsis(dom) {
    var checkDom = dom.cloneNode(), parent, flag;
    checkDom.style.width = dom.offsetWidth + 'px';
    checkDom.style.height = dom.offsetHeight + 'px';
    checkDom.style.overflow = 'auto';
    checkDom.style.position = 'absolute';
    checkDom.style.zIndex = -1;
    checkDom.style.opacity = 0;
    checkDom.style.whiteSpace = "nowrap";
    checkDom.innerHTML = dom.innerHTML;
 
    parent = dom.parentNode;
    parent.appendChild(checkDom);
    flag = checkDom.scrollWidth > checkDom.offsetWidth;
    parent.removeChild(checkDom);
    return flag;
}
/*修改默认的手机端右上角目录按钮事件*/
setMobileToggle();
function setMobileToggle(){
    if(document.body.clientWidth <= 767){
        $('.wh_toggle_button').bind('click', function(event){
            if($('.wh_top_menu_and_indexterms_link').hasClass('in')){
                $('.wh_toggle_button').css('background-color', '#2d2d2d');
                $('.wh_toggle_button').find('.icon-bar').css('background-color', 'white');
            }else{
                $('.wh_toggle_button').css('background-color', '#ddd');
                $('.wh_toggle_button').find('.icon-bar').css('background-color', '#333');
            }
        });
        $('#content_area').bind('click', function(){
            if($('.wh_top_menu_and_indexterms_link').hasClass('in')){
                $('.wh_toggle_button').click();
            }
        });
        $('.wh_header').bind('click', function(){
            if($('.wh_top_menu_and_indexterms_link').hasClass('in')){
                $('.wh_toggle_button').click();
            }
        });
        $('.wh_search_input').bind('click', function(){
            if($('.wh_top_menu_and_indexterms_link').hasClass('in')){
                $('.wh_toggle_button').click();
            }
        });
    }
}