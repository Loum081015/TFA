'use strict';
const images = document.querySelectorAll('.section2__img');
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
let irisJsonData = [];
const irisButtons = document.querySelectorAll('.iris__btn');
const irisPopupImage = document.querySelector('.popup__content');
const irisPopupImageElement = irisPopupImage?.querySelector('.preview-image');

/*Cartes (code inspiré d'un code pen) */
function animateCartes(newIndex) {
    if(isAnimating) return;
    isAnimating = true;

    currentIndex = (newIndex + cartes.length) % cartes.length;

    cartes.forEach((carte, i) => {
        const offset = (i - currentIndex + cartes.length) % cartes.length;

        carte.classList.remove(
            'center',
            'left-1',
            'left-2',
            'right-1',
            'right-2'
        );

        switch(offset) {
            case 0:
                carte.classList.add('center');
                break;
            case 1:
                carte.classList.add('right-1');
                break;
            case 2:
                carte.classList.add('right-2');
                break;
            case cartes.length -1:
                carte.classList.add('left-1');
                break;
            case cartes.length -2:
                carte.classList.add('left-2');
                break;
            default:
                carte.classList.add('hidden');
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
    carte.addEventListener('click', () => {
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

fetch('assets/fonctionnalite.json')
    .then((response) => response.json())
    .then((data) => {
        irisJsonData = data.images;
    });

irisButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        irisPopupImage?.classList.add('open');
        document.body.classList.add('no-scroll');
        showIrisImage(index);
    //     if(!irisPopupImage.src.includes(irisJsonData[index].src)) {
    //         irisPopupImage.src = irisJsonData[index].src;
    //         irisPopupImage.alt = irisJsonData[index].alt;
    //         irisPopupImage.classList.add('open');
    //         document.body.classList.add('no-scroll');
    //         return;
    //     }

    //     irisPopupImage.src = '';
    //     irisPopupImage.alt = '';
    //     irisPopupImage.classList.remove('open');
    //     document.body.classList.remove('no-scroll');
    });
});
irisPopupImage?.addEventListener('click', () => {
    irisPopupImageElement?.classList.remove('open');
    irisPopupImageElement?.addEventListener('transitionend', () => {
        if(irisPopupImageElement?.classList.contains('open')) return;
        irisPopupImage?.classList.remove('open');
        document.body.classList.remove('no-scroll');
    });
});
function showIrisImage(index) {
    irisPopupImageElement.src = irisJsonData[index].src;
    irisPopupImageElement.alt = irisJsonData[index].alt;
    irisPopupImageElement.classList.add('open');
    currentImageIndex = index;
}


// images?.forEach((image, index) => {
//     image.addEventListener('click', () => {
//         popupImage?.classList.add('open');
//         document.body.classList.add('no-scroll');
//         showImage(index);
//     });
// });
// popupImage?.addEventListener('click', () => {
//     popupImgElement?.classList.remove('open');
//     popupImgElement?.addEventListener('transitionend', () => {
//         if(popupImgElement?.classList.contains('open')) return;
//         popupImage?.classList.remove('open');
//         document.body.classList.remove('no-scroll');
//     });
// });
// function showImage(index) {
//     popupImgElement.src = images[index].getAttribute('src');
//     popupImgElement.classList.add('open');
//     currentImageIndex = index;
// }

const button = document.querySelector('.dropbtn');
const dropdown = document.querySelector('.dropdown');
let isOpen = false;

button?.addEventListener('click', (e) => {
    e.stopPropagation();
    isOpen = !isOpen;

    isOpen ? dropdown?.classList.add('isOpen') : dropdown.classList.remove('isOpen');
});

document.addEventListener('click', (e) => {
    if(!button?.contains(e.target)) {
        isOpen = false;
        dropdown?.classList.remove('isOpen');
    }
});

// const buttonsApplication = document.querySelectorAll('.dropbtn__application');
// const dropdownsApplication = document.querySelectorAll('.dropdown-content__section2');

// buttonsApplication.forEach((btn, index) => {
//     const dropdown = dropdownsApplication[index];

//     btn.addEventListener('click', () => {
//         const isDrpdwnOpen = dropdown.classList.contains('dpdn-open');

//         let toClose = 0;
        
//         dropdownsApplication.forEach((dpdn, idx) => {
//             if(!dpdn.classList.contains('dpdn-open')) return;

//             toClose++;
//             dpdn.style.height = dpdn.scrollHeight + 'px';
//             dpdn.classList.remove('dpdn-open');
//             buttonsApplication[idx]?.classList.remove('dpdn-arrow-open');

//             requestAnimationFrame(() => dpdn.style.height = '0px');

//             dpdn.addEventListener('transitionend', function handler() {
//                 dpdn.removeEventListener('transitionend', handler);
//                 toClose--;
//                 if(toClose === 0) openDropdown();
//             });
//         });

//         if(toClose == 0) openDropdown();

//         function openDropdown() {
//             if(!isDrpdwnOpen) {
//                 btn.classList.add('dpdn-arrow-open');
//                 dropdown.classList.add('dpdn-open');
//                 const targetHeight = dropdown.scrollHeight + 'px';
//                 dropdown.style.height = '0px';

//                 requestAnimationFrame(() => dropdown.style.height = targetHeight);
                
//                 dropdown.addEventListener('transitionend', function handler() {
//                     dropdown.style.height = 'auto';
//                     dropdown.removeEventListener('transitionend', handler);

//                     const y = btn.getBoundingClientRect().top + window.scrollY - 63;
//                     window.scrollTo({ top: y, behavior: 'smooth' });
//                 });
//             }
//         }
//     });
// });

const buttonsApplication = document.querySelectorAll('.dropbtn__application');
const dropdownsApplication = document.querySelectorAll('.dropdown-content__section2');
const SCROLL_OFFSET = 63;

buttonsApplication.forEach((btn, index) => {
    const dropdown = dropdownsApplication[index];

    btn.addEventListener('click', () => {
        const isDrpdwnOpen = dropdown.classList.contains('dpdn-open');

        closeAllDropdowns(() => {
            if(!isDrpdwnOpen) openDropdown(btn, dropdown);
        });
    });
});

function closeAllDropdowns(callback) {
    let openCount = 0;

    dropdownsApplication.forEach((dpdn, idx) => {
        if(!dpdn.classList.contains('dpdn-open')) return;

        openCount++;
        dpdn.style.height = dpdn.scrollHeight + 'px';
        dpdn.classList.remove('dpdn-open');
        buttonsApplication[idx]?.classList.remove('dpdn-arrow-open');

        requestAnimationFrame(() => dpdn.style.height = '0px');

        dpdn.addEventListener('transitionend', function handler() {
            dpdn.removeEventListener('transitionend', handler);
            openCount--;
            if(openCount === 0) callback();
        });
    });

    if(openCount === 0) callback();
}

function openDropdown(btn, dropdown) {
    btn.classList.add('dpdn-arrow-open');
    dropdown.classList.add('dpdn-open');
    const targetHeight = dropdown.scrollHeight + 'px';
    dropdown.style.height = '0px';

    requestAnimationFrame(() => dropdown.style.height = targetHeight);

    dropdown.addEventListener('transitionend', function handler() {
        dropdown.style.height = 'auto';
        dropdown.removeEventListener('transitionend', handler);

        const y = btn.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
        window.scrollTo({ top: y, behavior: 'smooth' });
    });
}