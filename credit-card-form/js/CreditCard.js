export default class CreditCard {
  constructor() {
    this.form = document.forms[0];
    this.cardNumber = document.querySelectorAll(".card-number span");
    this.cardName = document.querySelector("#card-name");
    this.cardValidity = document.querySelector("#card-validity");
    this.cardCvv = document.querySelectorAll("#card-cvv span");

    this.keyUp = this.keyUp.bind(this);
  }

  replaceNumbersInCard(arrayCard, inputValues = []) {
    arrayCard.forEach((span, i) => {
      if(inputValues[i]) {
        span.innerHTML = inputValues[i]
        return
      }
      if (arrayCard.length == 16) {
        span.innerHTML = `<img src="./assets/placeholder.svg">`
        return
      } 
      span.innerHTML = `•`
    })
  }

  inputNumberEvent({ target }) {
    const value = target.value.replace(/\s/g, '');
    this.replaceNumbersInCard(this.cardNumber, [...value]);
    target.value = value.replace(/(\d{4})(?=\d)/g, '$& ');
  }
  
  tutelaryNameEvent({ target }) {
    this.cardName.innerText = target.value;
  }

  inputValidityEvent({ target }) {
    const value = target.value.replace(/(\d{2})(?=\d)/g, '$&/');
    this.cardValidity.innerText = value;
    target.value = value;
  }

  keyUp(e) {
    if (e.target === this.form.inputNumber) this.inputNumberEvent(e);
    if (e.target === this.form.tutelary) this.tutelaryNameEvent(e);
    if (e.target === this.form.validity) this.inputValidityEvent(e);
    if (e.target === this.form.cvv) this.replaceNumbersInCard(this.cardCvv, [...e.target.value]);
  }

  init() {
    this.form.addEventListener("keyup", this.keyUp)
    this.replaceNumbersInCard(this.cardNumber);
  }
}
