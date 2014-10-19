/**
 * @author alison benjamin
 
 	this is functionality before the data-target has been added
 
 */

/* bookmarker */

var selected = false, 
	positionToBookmark,
	icon,
	dataTarget;

/* event listeners */ 
var bookmark = document.getElementById("bookmark");

/*click*/
bookmark.addEventListener('click',trigger);

/*keyboard access
bookmark.setAttribute('tabindex',0); 
bookmark.addEventListener("keydown", function (event) {
	var key = event.which || event.keyCode;
	
	if (key == 37) { 
		trigger();
	}
				    
	if (key == 39) { 
		trigger();		    
	}
});
*/


function highlightBookmark(){
	icon = document.querySelector("#bookmark");	
	icon.classList.toggle("bookmarked");
}



function trigger(){

	if(!selected){
		
		selected = true;
		
		highlightBookmark()
		
		positionToBookmark = $(window).scrollTop(); 
	
		window.localStorage.setItem('position', positionToBookmark);	
		
		window.localStorage.setItem()
		
		
		window.localStorage.setItem('scroll-to', dataTarget);
		
	}
	
	else {
		
		selected = false;
		
		highlightBookmark()
		
		positionToBookmark = window.localStorage.getItem('position');
		
		$(window).scrollTop(positionToBookmark);
		
		window.localStorage.clear();

		
	}
}

/* when the user opens a new page 
 * if they already have a bookmark in localStorage
 * ensure they can see the bookmark
 * 
 * this is because often when you open up 
 * a webpage again the broswer will 
 * refresh automatically and you 
 * will lose your place.. 
 * 
 * 
 * this function doesn't work.
 * 
 */


function newWindowShowBookmark(){

		if(window.localStorage.getItem('position') === null){
			
			console.log(window.localStorage.getItem('position'));
		}
		else if((window.localStorage.getItem('position') !== null) || window.localStorage.getItem('position') != 0){
			icon = document.querySelector("#bookmark");	
			icon.classList.toggle("bookmarked");
			selected = true;

		}

}

document.addEventListener("DOMContentLoaded",newWindowShowBookmark);


/* touch events */

var article = document.getElementById('article');
var paragraphs = document.querySelectorAll('#article p');
for(var i = 0, j = paragraphs.length; i < j; i++){
	paragraphs[i].setAttribute('data-paragraph','pg-' + i);
	paragraphs[i].setAttribute('data-toggle','popover');
	paragraphs[i].setAttribute('title','Save my spot');
	paragraphs[i].addEventListener('click', sendToStorage);
}

function sendToStorage(){
	dataTarget = this.getAttribute('data-paragraph');
}


/*

$('[data-toggle="popover"]').tooltip({
    animated: 'fade',
    placement: 'top',
});
*/
