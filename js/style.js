'use strict';

var mainNav = document.querySelector('.main-nav');
var toggleButton = mainNav.querySelector('.main-nav__toggle');
var closetButton = mainNav.querySelector('.main-nav__close');
mainNav.classList.remove('main-nav--nojs');
function toggleMenu() {
    if(mainNav.classList.contains('main-nav--closed')) {
        mainNav.classList.remove('main-nav--closed');
        mainNav.classList.add('main-nav--opened');
    } else {
        mainNav.classList.remove('main-nav--opened');
        mainNav.classList.add('main-nav--closed');
    }
}
toggleButton.addEventListener('click', toggleMenu);
closetButton.addEventListener('click',function () {
    mainNav.classList.remove('main-nav--opened');
    mainNav.classList.add('main-nav--closed');
});

