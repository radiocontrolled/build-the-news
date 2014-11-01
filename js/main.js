/**
 * @author alison benjamin
 */


var positionToBookmark,
	icon,
	dataTarget,
	articleStorage = {};


function highlightBookmark(){
	icon = document.querySelector("#bookmark");	
	icon.classList.toggle("bookmarked");
}

function clearItemFromStorage(){

	
	//clear saved spot from storage
	var key = this.parentNode.parentNode.dataset.history;

	for(var i in articleStorage){
		if(articleStorage.hasOwnProperty(i)){
			if(key == articleStorage[i]){
				delete articleStorage[i];
			}
		}
	}
	
	//update storage
	localStorage.setItem('articleStorage', JSON.stringify(articleStorage));
	
	//remove list item from My Placeholders menu
	var itemToDelete = document.querySelector('[data-history="' + key + '"]');
	itemToDelete.parentNode.removeChild(itemToDelete);
	
	//remove .saved class from paragraph
	var saved = document.querySelector('[data-paragraph="' + key + '"]');
	saved.classList.remove("saved");
}

function setting(data){
		
	
	articleStorage[data] = data;
	localStorage.setItem('articleStorage', JSON.stringify(articleStorage));
		
	
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
	sentenceFragment = sentenceFragment.replace(/(([^\s]+\s\s*){3})(.*)/,"$1…");
	
	var icon = document.createElement("i");
	icon.classList.add("fa","fa-close","navbar-toggle","delete-localStorage");
	icon.addEventListener('click', clearItemFromStorage);

	var text = document.createTextNode(sentenceFragment);

	listItemAnchor.appendChild(icon);
	listItemAnchor.appendChild(text);
	listItemAnchor.classList.add('scrollto');
	listItemAnchor.addEventListener('click', getting);
	listItemAnchor.setAttribute("href","#"+ anchor);
	listItem.appendChild(listItemAnchor);
	ulOfSavedParagraphs.appendChild(listItem); /* prepend to the beginning of the list */
	

}


function getting(){
	
	var key = this.parentNode.dataset.history;
	var storageRetrieved = localStorage.getItem(key);
			
}		




/* when the user opens a new page 
 * show spots that are saved 
 * and populate the "My Placeholders" menu
 */


function newWindowShowBookmark(){
	
	/* check if saved spots exist in local storage
	 */
	
	if(JSON.parse(localStorage.getItem('articleStorage')) === null){
		articleStorage = {};
	}
	else{
		articleStorage = JSON.parse(localStorage.getItem('articleStorage'));
	}
	
	/* rebuild the 'My Plceholders' list */

	var ulOfSavedParagraphs = document.getElementById("retrieveBookmark");
	
	for(var i in articleStorage){
		if(articleStorage.hasOwnProperty(i)){

			var target = document.querySelector('[data-paragraph="' + articleStorage[i] + '"]');
			var anchor = target.id;
			
			target.classList.add("saved");
			
			dataTarget = target.dataset.paragraph;
			var listItem = document.createElement('li');
			listItem.setAttribute('data-history',articleStorage[i]);
			var listItemAnchor = document.createElement('a');
			
			var sentenceFragment = target.innerHTML;
			sentenceFragment = sentenceFragment.replace(/(([^\s]+\s\s*){3})(.*)/,"$1…");
			//sentenceFragment = sentenceFragment.substring(0,25);
			
			icon = document.createElement("i");
			icon.classList.add("fa","fa-close","navbar-toggle","delete-localStorage");
			icon.addEventListener('click', clearItemFromStorage);
		
			var text = document.createTextNode(sentenceFragment);
		
			listItemAnchor.appendChild(icon);
			listItemAnchor.appendChild(text);			
			listItemAnchor.classList.add('scrollto');
			listItemAnchor.addEventListener('click', getting);
			listItemAnchor.setAttribute("href","#"+ anchor);
			listItem.appendChild(listItemAnchor);
			ulOfSavedParagraphs.appendChild(listItem); /* prepend to the beginning of the list */
			
			
			
		}
	}
	
	var retrievedStorage = JSON.parse(localStorage.getItem('articleStorage'));


		/* build a key called refresh that has an 
		 * object which is added to every time 
		 * there is a key added? 
		 */

		if(localStorage.getItem('position') === null){
			//console.log(localStorage.getItem('position'));
		}
		else if((localStorage.getItem('position') !== null) || localStorage.getItem('position') !== 0){
			icon = document.querySelector("#bookmark");	
			icon.classList.toggle("bookmarked");
		}

}

document.addEventListener("DOMContentLoaded",newWindowShowBookmark);


/* save my spot 
 * paragraph popovers
 */
var article = document.getElementById('article');
var paragraphs = document.querySelectorAll('#article p');
for(var i = 0, j = paragraphs.length; i < j; i++){
	
	paragraphs[i].setAttribute('data-paragraph','pg-' + i);
	paragraphs[i].setAttribute('data-toggle','popover');
	paragraphs[i].setAttribute('id',i);
	
	
}

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



