const carousels = document.querySelector(".carousels");


function scrollMouseWheel() {
  carousels.children[0].classList.toggle("active");
  carousels.children[1].classList.toggle("active");

  carousels.insertBefore(carousels.children[1], carousels.children[0]);
}


carousels.addEventListener("mousewheel", scrollMouseWheel);