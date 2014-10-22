/**
 * @author alison benjamin
 */


var positionToBookmark,
	icon,
	dataTarget;

function highlightBookmark(){
	icon = document.querySelector("#bookmark");	
	icon.classList.toggle("bookmarked");
}

function clearItemFromStorage(){
//	window.localStorage.removeItem(this.parentNode.parentNode.dataset.history);
//	window.localStorage.getItem(this.parentNode.parentNode.dataset.history);
}


function setting(data){
		
	/* set localStorage key/value to the data-paragraph value */
	window.localStorage.setItem(data, data);
	
	var target = document.querySelector('[data-paragraph="' + data + '"]');
	var anchor = target.id;
	
	target.classList.add("saved");
	
	/* create a list item using the data-target as a reference */	
	dataTarget = target.dataset.paragraph;
	var ulOfSavedParagraphs = document.getElementById("retrieveBookmark");
	var listItem = document.createElement('li');
	listItem.setAttribute('data-history',target.dataset.paragraph);
	var listItemAnchor = document.createElement('a');
	
	var sentenceFragment = target.innerHTML;
	sentenceFragment = sentenceFragment.replace(/(([^\s]+\s\s*){8})(.*)/,"$1…");
	
	var icon = document.createElement("i");
	icon.classList.add("fa","fa-close","navbar-toggle","delete-localStorage");
	icon.addEventListener('click', clearItemFromStorage);

	var text = document.createTextNode(sentenceFragment);

	
	listItemAnchor.appendChild(text);
	listItemAnchor.appendChild(icon);
	
	//listItemAnchor.parentNode.insertBefore(text,parentNode.nextSibling);
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
//	paragraphs[i].addEventListener('click', setting);
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
    	setting(data);
    	$('[data-toggle="popover"]').popover('hide');
	});






