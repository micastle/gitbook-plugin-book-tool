var gitbook = window.gitbook;

gitbook.events.on('page.change', function() {
	
	var book_tool_button = ['<div class="book-tool"><i class="fa fa-comment-o"></i></div>'].join("");
	$(".book").append(book_tool_button);

/*
 	$(".book-tool").hide();

	$('.book-body,.body-inner').on('scroll', function () {
		if ($(this).scrollTop() > 100) { 
			$('.book-tool').fadeIn();
		} else {
			$('.book-tool').fadeOut();
		}
	});
*/

	$('.book-tool').click(function () { 
		onComment(getSelectedText());
		return false;
	});

	//setupSelectHandler($('.markdown-section'), onSelectionEvent);
});

setupSelectHandler(document.body, onSelectionEvent);

function getSelectedText() {
	return document.selection == undefined ? document.getSelection().toString():document.selection.createRange().text;
}

function onComment(selectedText) {
	alert("评论引用的内容为："+selectedText);
}

function onSelectionEvent(selectedText, target){
	//alert("文字属于"+target.tagName+"元素，选中内容为："+selectedText);

	onComment(selectedText);
}

/*
*
* 跨浏览器选中文字事件
* @param
* object o 响应选中事件的DOM对象，required
* function fn(sText,target,mouseP)选中文字非空时的回调函数，required
* |-@param
* |-sText 选中的文字内容
* |-target 触发mouseup事件的元素
* |-mouseP 触发mouseup事件时鼠标坐标
*/
function setupSelectHandler(o, fn){
	o.onmouseup = function(e){
		var event = window.event || e;
		var target = event.srcElement ? event.srcElement : event.target;
		if (/input|textarea/i.test(target.tagName) && /firefox/i.test(navigator.userAgent)) {
			//Firefox在文本框内选择文字
			var staIndex=target.selectionStart;
			var endIndex=target.selectionEnd;
			if(staIndex!=endIndex){
				var sText=target.value.substring(staIndex,endIndex);
				fn(sText,target);
			}
		}
		else{
			//获取选中文字
			var sText = getSelectedText();
			if (sText != "") {
				//将参数传入回调函数fn
				fn(sText, target);
			}
		}
	}
}

