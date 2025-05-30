'use strict';
const images = document.querySelectorAll(".section2__img");
const cartes = document.querySelectorAll('.carte');
const burgerBtn = document.getElementById('burgerBtn');
const burgerMenu = document.getElementById('burgerMenu');
let currentIndex = 0;
let isAnimating = false;

/*Cartes (codé inspiré d'un code pen) */
function animateCartes(newIndex) {
    if (isAnimating) return;
    isAnimating = true;

    currentIndex = (newIndex + cartes.length) % cartes.length;

    cartes.forEach((carte, i) => {
        const offset = (i - currentIndex + cartes.length) % cartes.length;

        console.log(offset);

        carte.classList.remove(
            "center",
            "left-1",
            "left-2",
            "right-1",
            "right-2",
            "hidden"
        );
        if (offset === 0) {
            carte.classList.add("center");
        }else if (offset === 1){
            carte.classList.add("right-1");
        }else if (offset === 2){
            carte.classList.add("right-2");
        }else if (offset === cartes.length -1){
            carte.classList.add("left-1");
        }else if (offset === cartes.length -2){
            carte.classList.add("left-2");
        }else{
            carte.classList.add("hidden");
        }
    });

    setTimeout(() => {
        isAnimating = false;
    }, 800);
}

cartes.forEach((carte, i) => {
    carte.addEventListener("click", () => {
        animateCartes(i);
    });
});

animateCartes(0);

/*Menu*/
if (burgerBtn) {
    burgerBtn.addEventListener('click', () => {
        burgerBtn.classList.toggle('active');
        burgerMenu.classList.toggle('open');
        document.body.classList.toggle('no-scroll');
    });
}


console.log(window.scrollY);

var oldScroll = 1;
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

/*Design fiction*/
if (images){
images.forEach((image) => {
  image.addEventListener("click", () => {
    image.classList.toggle("expanded");
  });
})
}