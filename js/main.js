/**
 * @author alison benjamin
 */

/* bookmarker */

var positionToBookmark,
	icon,
	dataTarget;


function highlightBookmark(){
	icon = document.querySelector("#bookmark");	
	icon.classList.toggle("bookmarked");
}



function setting(e){
	
	e.preventDefault();
		
	/* set localStorage key/value to the data-paragraph value */
	window.localStorage.setItem(e.target.dataset.paragraph, e.target.dataset.paragraph);			
	var target = e.target.dataset.paragraph;
	var anchor = e.target.id;

	
	
	e.target.classList.add("saved");
	
	/* create a list item using the data-target as a reference */	
	dataTarget = e.target.dataset.paragraph;
	var ulOfSavedParagraphs = document.getElementById("retrieveBookmark");
	var listItem = document.createElement('li');
	var listItemAnchor = document.createElement('a');
	var sentenceFragment = e.target.innerHTML;
	var sentenceFragment = sentenceFragment.replace(/(([^\s]+\s\s*){5})(.*)/,"$1…");
	var listText = sentenceFragment; 
	var close = "<i class='fa fa-close navbar-toggle'></i>";
	
	
	listItemAnchor.appendChild(document.createTextNode(listText));
	listItemAnchor.classList.add('scrollto');
	listItemAnchor.addEventListener('click', getting);
	listItemAnchor.setAttribute("href","#"+anchor);
	listItem.appendChild(listItemAnchor);
	ulOfSavedParagraphs.appendChild(listItem); /* prepend to the beginning of the list */
	
	/* add a link to the popover with an event listener */
	
		
}

function getting(dataset,e){


	var storageRetrieved = window.localStorage.getItem(dataset);
	console.log(storageRetrieved);

	var defaultAnchorOffset = 0;
	var anchor = document.querySelector('[data-paragraph="' + dataset + '"]');

	
	// scroll to the element	
	
	
		
	//window.localStorage.clear();
	
	
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
 */


function newWindowShowBookmark(){

		if(window.localStorage.getItem('position') === null){
			//console.log(window.localStorage.getItem('position'));
		}
		else if((window.localStorage.getItem('position') !== null) || window.localStorage.getItem('position') !== 0){
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
	paragraphs[i].setAttribute('id',i);
	paragraphs[i].addEventListener('click', setting);
}

/* tooltip that appears over paragraph */

$('[data-toggle="popover"]')
	.popover({
		placement: 'top',
		animation: 'fade',
		html: true,
		content: "<button id='close-me'>Save my spot</buttom>"
	})
	.parent()
	.delegate('button#close-me', 'click', function() {
    	data = this.parentNode.parentNode.previousSibling.dataset.paragraph;
    	getting(data);
    	$('[data-toggle="popover"]').popover('hide');
	})






