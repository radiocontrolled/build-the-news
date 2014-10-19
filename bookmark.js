/**
 * @author benjamin
 */

var localStorage = window.localStorage,
		selected = false;
		
var mark = $("#bookmark");
	
mark.click(bookmarker);
	
var bookmarker = function(){
	alert("hello")
	if(!selected){
		localStorage.setItem('position', $(window).scrollTop());
		selected = true;
		$("#bookmark").addClass("bookmarked");
	}
	
};


