'use strict'
const images = document.querySelectorAll(".section2__img");

images.forEach((image) => {
  image.addEventListener("click", () => {
    image.classList.toggle("expanded");
  });
});