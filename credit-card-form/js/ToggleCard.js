export default class ToggleCard {
  constructor() {
    this.form = document.forms[0];
    this.creditCard = document.querySelector(".credit-card");

    this.cardToggleShow = this.cardToggleShow.bind(this);
    this.showFront = this.showFront.bind(this);
  }

  cardToggleShow({ type }) {
    if (type === "click") this.creditCard.classList.toggle("back");
    if (type === "focus") this.creditCard.classList.add("back");
    if (type === "focusout") this.creditCard.classList.remove("back");
  }

  showFront() {
    this.creditCard.classList.remove("back");
  }

  init() {
    this.creditCard.addEventListener("click", this.cardToggleShow);
    this.form.cvv.addEventListener("focus", this.cardToggleShow);
    this.form.cvv.addEventListener("focusout", this.cardToggleShow);

    this.form.inputNumber.addEventListener("focus", this.showFront);
    this.form.inputNumber.addEventListener("focus", this.showFront);
    this.form.validity.addEventListener("focus", this.showFront);
  }
}



