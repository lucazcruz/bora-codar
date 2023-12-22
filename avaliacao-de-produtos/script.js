const form = document.forms[0];
const comment = form.querySelector(".comment");
const review = form.querySelector(".review");
const backButton = document.body.querySelector(".backButton");
const stars = form.querySelectorAll(".stars span");

stars.forEach((star, index) => {
  star.addEventListener("click", () => starRate(index));
})


function starRate(index) {
  stars.forEach(star => star.classList.remove("selected"));
  for(let i = index; i >= 0; i--){
    stars[i].classList.add("selected");
  }
}

function toggleHideClass(event) {
  event.preventDefault();
  comment.classList.toggle("hide");
  review.classList.toggle("hide");
  backButton.classList.toggle("hide");
}