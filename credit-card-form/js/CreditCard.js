export default class CreditCard {
  constructor() {
    this.form = document.forms[0];
    this.cardNumber = document.querySelectorAll(".card-number span");
    this.cardName = document.querySelector("#card-name");
    this.cardValidity = document.querySelector("#card-validity");
    this.cardCvv = document.querySelectorAll("#card-cvv span");

    this.keyUp = this.keyUp.bind(this);
    this.formError = this.formError.bind(this);
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

  characterValidity(target) {  // SUBSTITUI CHARACTER INVÁLIDO
    const onlyNumber = /[^0-9]/g;            // ACEITA APENAS NUMEROS DE 0-9
    const onlyLetters = /[^a-zA-Z\s]/g;      // ACEITA APENAS LETRAS E ESPAÇAMENTO

    if (target === this.form.tutelary) {
      target.value = target.value.replace(onlyLetters, '');
      return
    }

    target.value = target.value.replace(onlyNumber, '');
    if (target === this.form.validity) target.value = target.value.replace(/(\d{2})(?=\d)/g, '$&/');
  }

  handleInputNumber(target) {
    this.characterValidity(target);
    const value = target.value.replace(/\s/g, ''); // REMOVE OS ESPAÇOS EM BRANCO
    this.replaceNumbersInCard(this.cardNumber, [...value]); // ADICIONA NUMEROS AO CARTÃO
    target.value = value.replace(/(\d{4})(?=\d)/g, '$& '); // ESPAÇO A CADA 4 DIGITOS
  }

  handleTutelaryName(target) {
    this.characterValidity(target);
    this.cardName.innerText = target.value = target.value;
    if (this.cardName.innerText === '') this.cardName.innerText = 'Seu nome aqui';
  }

  handleInputValidity(target) {
    this.characterValidity(target);
    this.cardValidity.innerText = target.value;
  }

  formError({ target }) {
    target.nextElementSibling.innerText = "";
    target.classList.remove("invalid");

    if (target === this.form.validity) {
      const [month, year] = target.value.split('/');
      let message = ''

      if (month < 1 || month > 12) {
        message = "Mês e ano inválido";
      } else if (year === undefined || year < 24) {
        message = "ano inválido";
      }

      if(message === '') return;

      target.classList.add("invalid");
      target.nextElementSibling.innerHTML = `<img src="./assets/warning.svg" > ${message}`
    }

    if (target === this.form.inputNumber) {
      const allNumbers = target.value.replace(/\s/g, '').split('');

      const newNumbers = allNumbers.map((number, index) => {
        if (index === 15) return 0

        if (index % 2 === 0) {
          const x2 = number * 2;
          const newNumber = x2 >= 10 ? x2 -9 : x2
          return newNumber;
        }
        return number;
      })

      const soma = newNumbers.reduce((acc, value) => +value + acc, 0);
      const verificador = 10 - soma % 10;
      const valid = verificador == allNumbers[allNumbers.length-1];
      
      if(valid) return;

      target.classList.add("invalid");
      target.nextElementSibling.innerHTML = `<img src="./assets/warning.svg" > Insira um número de cartão válido`
    }
  }

  handleCvv(target) {
    this.characterValidity(target);
    this.replaceNumbersInCard(this.cardCvv, [...target.value]);
  }

  keyUp({ target }) {
    if (target === this.form.inputNumber) this.handleInputNumber(target);
    if (target === this.form.tutelary) this.handleTutelaryName(target);
    if (target === this.form.validity) this.handleInputValidity(target);
    if (target === this.form.cvv) this.handleCvv(target);
  }

  init() {
    this.form.addEventListener("input", this.keyUp);
    this.form.addEventListener("change", this.formError);
    this.replaceNumbersInCard(this.cardNumber);
  }
}
