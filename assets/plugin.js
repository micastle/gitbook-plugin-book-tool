var gitbook = window.gitbook;
var options = {};

gitbook.events.bind('start', function(e, config) {

	// Save config data
    options = config['book-tool'] || {};
	
});

gitbook.events.on('page.change', function() {
	
	var book_tool_button = [
		'<div id="tool-button" class="book-tool"><i class="fa fa-comment-o"></i></div>'
	].join("");

	$(".book").append(book_tool_button);

	var comment_panel = '<div id="comment-panel" class="book-tool-panel" style="position:absolute;left:0;top:0;display:none;"></div>';
	$(".book").append(comment_panel);

	// 拦截评论面板上的鼠标点击事件
	var panel = document.getElementById('comment-panel');
	panel.addEventListener('mousedown', function (event) {  
		event.preventDefault();  
	},true);
	panel.addEventListener('mouseup', function (event) {  
		event.preventDefault();  
	},true);

	// 响应评论按钮的点击事件
	var comment_button = document.getElementById('tool-button');
	comment_button.addEventListener('click', function (event) {  
		onComment('', 400, 500);  
	},false);

	// not work - setup callback on text selection
	//setupSelectHandler($('.markdown-section'), onSelectionEvent);
});

// setup callback on text selection
setupSelectHandler(document.body, onSelectionEvent);

function getSelectedText() {
	return document.selection == undefined ? document.getSelection().toString():document.selection.createRange().text;
}

function onComment(selectedText, x, y) {
	var comment_panel = document.getElementById('comment-panel');
	if (comment_panel.style.display != 'none') {
		console.log('comment panel display: ' + comment_panel.style.display);
		return
	}

	var comment_form = [
		'<form class="comment-form">',
		'文章地址：<input id="comment-page" type="text" style="width:400px;" disabled /><br/>',
		'引用片段：<input id="comment-text" type="text" style="width:400px;" disabled /><br/>',
		'评论内容：<textarea id="comment" style="width:400px;height:120px;" placeholder="这里写评论"></textarea><br/>',
		'<input type="button" name="" value="提交评论" /><br/>',
		'</form>'
	].join("");

	comment_panel.style.left = x + 'px'; 
	comment_panel.style.top = y + 'px';
	comment_panel.innerHTML = comment_form;

	document.getElementById('comment-page').value=decodeURI(window.document.URL);
	document.getElementById('comment-text').value=selectedText;

	comment_panel.style.display = ''; 
}

function onHideComment() {
	var comment_panel = document.getElementById('comment-panel');
	comment_panel.style.display = 'none'; 
}

function onSelectionEvent(selectedText, target, event, selected){
	//check text selection is in the document content area, not other place like summary, icons, etc.
	//alert("文字属于"+target.tagName+"元素，选中内容为："+selectedText);
	if (false) {
		return;
	}

	if (selected == true) {
		onComment(selectedText, event.clientX, event.clientY);
	} else {
		onHideComment();
	}
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
				fn(sText,target, event);
			}
		}
		else{
			//获取选中文字
			var sText = getSelectedText();
			if (sText != "" && sText != undefined) {
				//将参数传入回调函数fn
				fn(sText, target, event, true);
			} else {
				fn(sText, target, event, false);
			}
		}
	}
}

