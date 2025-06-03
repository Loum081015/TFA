'use strict';
const images = document.querySelectorAll(".section2__img");
const cartes = document.querySelectorAll('.carte');
const cartesFrontfaces = document.querySelectorAll('.front-face');
const cartesBackfaces = document.querySelectorAll('.back-face');
let lastCarteIndex = -1;
const burgerBtn = document.getElementById('burgerBtn');
const burgerMenu = document.getElementById('burgerMenu');
let currentIndex = 0;
let currentImageIndex = 0;
let isAnimating = false;
let popupImage = document.querySelector('.popup__img');
let popupImgElement = popupImage?.querySelector('img');

/*Cartes (code inspiré d'un code pen) */
function animateCartes(newIndex) {
    if (isAnimating) return;
    isAnimating = true;

    currentIndex = (newIndex + cartes.length) % cartes.length;

    cartes.forEach((carte, i) => {
        const offset = (i - currentIndex + cartes.length) % cartes.length;

        carte.classList.remove(
            "center",
            "left-1",
            "left-2",
            "right-1",
            "right-2"
        );

        switch(offset) {
            case 0:
                carte.classList.add("center");
                break;
            case 1:
                carte.classList.add("right-1");
                break;
            case 2:
                carte.classList.add("right-2");
                break;
            case cartes.length -1:
                carte.classList.add("left-1");
                break;
            case cartes.length -2:
                carte.classList.add("left-2");
                break;
            default:
                carte.classList.add("hidden");
                break;
        }
    });

    setTimeout(() => {
        isAnimating = false;
    }, 800);
}

function TurnCard(index) {
    cartesFrontfaces[index].classList.toggle('hidden');
    cartesBackfaces[index].classList.toggle('hidden');
    if(lastCarteIndex === index)
        lastCarteIndex = -1;
    else
        lastCarteIndex = index;
}

cartes.forEach((carte, i) => {
    carte.addEventListener("click", () => {
        if(cartes[i].classList.contains('center'))
            TurnCard(i);
        else {
            animateCartes(i);
            if(lastCarteIndex !== -1)
                TurnCard(lastCarteIndex);
        }
    });
});

animateCartes(2);

/*Menu*/  
burgerBtn?.addEventListener('click', () => {
    burgerBtn.classList.toggle('active');
    burgerMenu.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
});

let oldScroll = 0;
let nav = document.querySelector('.nav');


window.addEventListener('scroll', scrollListener);
function scrollListener() {
    if(oldScroll < window.scrollY && !burgerMenu?.classList.contains('open'))
        nav?.classList.add('nav--close');
    else
        nav?.classList.remove('nav--close');

    oldScroll = window.scrollY;
}

/*Design fiction*/
images?.forEach((image, index) => {
    image.addEventListener("click", () => {
        popupImage?.classList.add("open");
        document.body.classList.add('no-scroll');
        showImage(index);
    });
});
popupImage?.addEventListener("click", () => {
    popupImgElement?.classList.remove('open');
    popupImgElement?.addEventListener('transitionend', () => {
        if(popupImgElement?.classList.contains('open')) return;
        popupImage?.classList.remove("open");
        document.body.classList.remove('no-scroll');
    });
});
function showImage(index) {
    popupImgElement.src = images[index].getAttribute('src');
    popupImgElement.classList.add('open');
    currentImageIndex = index;
}