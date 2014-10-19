/**
 * @author alison benjamin
 */

/* breaking up the trigger function into 2 functions */



var selected = false, 
	positionToBookmark,
	icon,
	dataTarget;

/* event listeners */ 
var bookmark = document.getElementById("bookmark");

/*click*/
bookmark.addEventListener('click',trigger);



function highlightBookmark(){
	icon = document.querySelector("#bookmark");	
	icon.classList.toggle("bookmarked");
}



function trigger(e){

	e.preventDefault();

	if(!selected){
		
		selected = true;
		
		highlightBookmark()
		
		positionToBookmark = $(window).scrollTop(); 
	
		window.localStorage.setItem('position', positionToBookmark);	
		
		var target = dataTarget;
		window.localStorage.setItem(dataTarget,dataTarget);
	
		/* create a list item using the data-target as a reference */	
		dataTarget = this.getAttribute('data-paragraph');	
		var ulOfSavedParagraphs = document.getElementById("retrieveBookmark");
		var listItem = document.createElement('li');
		var listItemAnchor = document.createElement('a');
		var listText = dataTarget; // see if you can grab first few words of the paragraph and put it in the link text 
		listItemAnchor.appendChild(document.createTextNode(listText));
		listItemAnchor.addEventListener('click',returnToBookmark);
		listItem.appendChild(listItemAnchor);
		ulOfSavedParagraphs.appendChild(listItem); 
		
	
		alert(e.target.dataset.paragraph);
		
	
	}
	
	else {
		
		selected = false;
		
		highlightBookmark()
		
		positionToBookmark = window.localStorage.getItem('position');
		
		$(window).scrollTop(positionToBookmark);
		
		var anchor = document.getElementsByClassName(dataTarget);
		console.log(anchor);
		
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
			
	//		console.log(window.localStorage.getItem('position'));
		}
		else if((window.localStorage.getItem('position') !== null) || window.localStorage.getItem('position') != 0){
			icon = document.querySelector("#bookmark");	
			icon.classList.toggle("bookmarked");
			selected = true;

		}

}

document.addEventListener("DOMContentLoaded",newWindowShowBookmark);


/* click event */

var article = document.getElementById('article');
var paragraphs = document.querySelectorAll('#article p');
for(var i = 0, j = paragraphs.length; i < j; i++){
	paragraphs[i].setAttribute('data-paragraph','pg-' + i);
	paragraphs[i].setAttribute('data-toggle','popover');
	paragraphs[i].setAttribute('title','Save my spot');
	paragraphs[i].addEventListener('click', trigger);
}


$('[data-toggle="popover"]').tooltip({
    animated: 'fade',
    placement: 'top',
});

