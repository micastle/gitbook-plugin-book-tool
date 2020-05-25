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
		window.alert('show comment panel on click');
		return false;
	});
	
});
