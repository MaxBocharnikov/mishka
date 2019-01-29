var navMenu = document.querySelector('.nav-menu');
var navToggle = document.querySelector('.nav-menu__toggle');



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
