const form = document.forms[0];

form.cvv.onmouseenter = () => cardBack();
form.cvv.onmouseout = () => cardFront();

function cardFront() {
  document.querySelector('.card-front').style.transform = "perspective(1000px) rotateY(0deg)";
  document.querySelector('.card-back').style.transform = "perspective(1000px) rotateY(-180deg)";
}


function cardBack() {
  document.querySelector('.card-front').style.transform = "perspective(1000px) rotateY(-180deg)";
  document.querySelector('.card-back').style.transform = "perspective(1000px) rotateY(0deg)";
}