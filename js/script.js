var navMenu = document.querySelector('.nav-menu');
var navToggle = document.querySelector('.nav-menu__toggle');

var orderButton = document.querySelector('.product__send');
var overlay = document.querySelector('.modal-overlay');
var modalForm = document.querySelector('.modal-form');
var modalSubmit = document.querySelector('.modal-form__submit');

navMenu.classList.remove('nav-menu--nojs');
navToggle.classList.remove('nav-menu__toggle--nojs');



navMenu.classList.add('nav-menu--close');
navToggle.classList.add('nav-menu__toggle--close');

navToggle.addEventListener('click', function() {

	if(navToggle.classList.contains('nav-menu__toggle--close')) {
		navToggle.classList.remove('nav-menu__toggle--close');
		navToggle.classList.add('nav-menu__toggle--open');
	} else {
		navToggle.classList.add('nav-menu__toggle--close');
		navToggle.classList.remove('nav-menu__toggle--open');
	}

	if(navMenu.classList.contains('nav-menu--close')) {
		navMenu.classList.remove('nav-menu--close');
		navMenu.classList.add('nav-menu--open');
	} else {
		navMenu.classList.add('nav-menu--close');
		navMenu.classList.remove('nav-menu--open');
	}


});



orderButton.addEventListener('click', function(e){
	e.preventDefault();

	overlay.classList.add('modal-overlay--opened');
	modalForm.classList.add('modal-form--opened');
});


document.onkeydown = function(e) {
	if(e.keyCode == 27) {
		if(overlay.classList.contains('modal-overlay--opened')) overlay.classList.remove('modal-overlay--opened');
		if(modalForm.classList.contains('modal-form--opened')) modalForm.classList.remove('modal-form--opened');
	}
}