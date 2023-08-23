const stepsForm = document.querySelectorAll(".steps-form > div");
const stepElements = document.querySelectorAll(".steps div");

const nextButtons = document.querySelectorAll("form .next");
const backButtons = document.querySelectorAll("form .ghost");

addActive(0);

function removeActive(i, isBack) {
  stepElements[i].classList.remove("select");
  stepElements[i].classList.remove("active");
  stepsForm[i].classList.remove("active");
  
  if (isBack) return
  stepElements[i].classList.add("select");
}

function addActive(i) {
  stepElements[i].classList.add("active");
  stepsForm[i].classList.add("active");
}

function nextStep(e, index) {
  if (index === 2) {
    alert("formulário enviado com sucesso!");
    return
  }
  e.preventDefault();
  removeActive(index);
  addActive(index +1);
}

function backStep(e, index) {
  e.preventDefault();
  removeActive(index +1, true);
  addActive(index);
}

nextButtons.forEach((btn, index) => {
  btn.addEventListener("click", (e) => nextStep(e, index));
})

backButtons.forEach((btn, index) => {
  btn.addEventListener("click", (e) => backStep(e, index));
})

