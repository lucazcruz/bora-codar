export default class ToggleCard {
  constructor() {
    this.form = document.forms[0];
    this.creditCard = document.querySelector(".credit-card");

    this.cardToggle = this.cardToggle.bind(this);
  }

  cardToggle({ type }) {
    if (type === "click") this.creditCard.classList.toggle("back");
    if (type === "focus") this.creditCard.classList.add("back");
    if (type === "focusout") this.creditCard.classList.remove("back");
  }

  init() {
    this.creditCard.addEventListener("click", this.cardToggle);
    this.form.cvv.addEventListener("focus", this.cardToggle);
    this.form.cvv.addEventListener("focusout", this.cardToggle);
  }
}



