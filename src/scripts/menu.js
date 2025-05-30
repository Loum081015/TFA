'use strict'
const burgerBtn = document.getElementById('burgerBtn');
const burgerMenu = document.getElementById('burgerMenu');

burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('active');
    burgerMenu.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
});

console.log(window.scrollY);

var oldScroll = 0;
var nav = document.querySelector('.nav');
window. addEventListener('scroll', scrollListener);
function scrollListener() {
    if (oldScroll > window.scrollY){
        nav.classList.remove('nav--close');
    }else {
        nav.classList.add('nav--close');
    }

    oldScroll = window.scrollY;
}