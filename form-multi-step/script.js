class MultiStep {
  constructor() {
    this.stepsForm = document.querySelectorAll(".steps-form > div");
    this.stepElements = document.querySelectorAll(".steps div");
    this.nextButtons = document.querySelectorAll("form .next");
    this.backButtons = document.querySelectorAll("form .ghost");
  }

  removeActive(i, isBack) {
    this.stepElements[i].classList.remove("select");
    this.stepElements[i].classList.remove("active");
    this.stepsForm[i].classList.remove("active");
    
    if (isBack) return
    this.stepElements[i].classList.add("select");
  }

  addActive(i) {
    this.stepElements[i].classList.add("active");
    this.stepsForm[i].classList.add("active");
  }

  nextStep(e, index) {
    if (index === 2) {
      alert("formulário enviado com sucesso!");
      return
    }
    e.preventDefault();
    this.removeActive(index);
    this.addActive(index +1);
  }

  backStep(e, index) {
    e.preventDefault();
    this.removeActive(index +1, true);
    this.addActive(index);
  }

  addEvents() {
    this.nextButtons.forEach((btn, index) => {
      btn.addEventListener("click", (e) => nextStep(e, index));
    })
    
    this.backButtons.forEach((btn, index) => {
      btn.addEventListener("click", (e) => backStep(e, index));
    })
  }

  init() {
    this.addEvents();
    this.addActive(0);
  }
}

const multiStep = new MultiStep();
multiStep.init();