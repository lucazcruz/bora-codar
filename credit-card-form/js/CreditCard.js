export default class CreditCard {
  constructor() {
    this.form = document.forms[0];
    this.cardNumber = document.querySelectorAll(".card-number span");
    this.cardName = document.querySelector("#card-name");
    this.cardValidity = document.querySelector("#card-validity");
    this.cardCvv = document.querySelectorAll("#card-cvv span");
    this.cardBand = document.querySelector("#card-band")

    this.input = this.input.bind(this);
    this.formError = this.formError.bind(this);
  }

  checkCardBand(target ) {           // Checa a bandeira do cartão;
    const cleanValue = target.value.replace(/\s/g, '');

    var visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
    var mastercardRegex = /^(5[1-5][0-9]{14})$/;
    var eloRegex = /^(401178|401179|431274|438935|451416|457393|457631|457632|504175|506699|5067|509\\d|627780|636297|636368|636369|655000|655021|655056|6504|6504|6505|6506|506699|50670[0-9]|50671[0-9]|50672[0-9]|50673[0-9]|50674[0-9]|50675[0-9]|50676[0-9]|50677[0-9]|50678[0-9]|50679[0-9]|5067[0-9][0-9]|627780|636297|636368|636369|6504|6504|6505|6506|6510)[0-9]{10,13}$/;

    this.cardBand.innerHTML = '';
    if (eloRegex.test(cleanValue)) {
      this.cardBand.innerHTML = `<img src="./assets/elo.svg" alt="card elo">`
    } else if (mastercardRegex.test(cleanValue)) {
      this.cardBand.innerHTML = `<img src="./assets/mastercard.svg" alt="card mastercard">`
    } else if (visaRegex.test(cleanValue)) {
      this.cardBand.innerHTML = `<img src="./assets/visa.svg" alt="card visa">`
    }
  }

  replaceNumbersInCard(arrayCard, inputValues = []) {       // ADICIONA INFO NUMÉRICAS AO CARTÃO;
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

  characterValidity(target) {            // REMOVE CHARACTER INVÁLIDO;
    const onlyNumber = /[^0-9]/g;            // ACEITA APENAS NUMEROS DE 0-9
    const onlyLetters = /[^a-zA-Z\s]/g;      // ACEITA APENAS LETRAS E ESPAÇAMENTO

    if (target === this.form.tutelary) {
      target.value = target.value.replace(onlyLetters, '');
      return
    }

    target.value = target.value.replace(onlyNumber, '');
    if (target === this.form.validity) target.value = target.value.replace(/(\d{2})(?=\d)/g, '$&/');
  }

  handleInputNumber(target) {          // FORMATA E CHAMA A FUNÇÃO DE ADICIONAR OS NUMEROS AO CARTÃO;
    this.characterValidity(target);
    const value = target.value.replace(/\s/g, ''); // REMOVE OS ESPAÇOS EM BRANCO
    this.replaceNumbersInCard(this.cardNumber, [...value]); // ADICIONA NUMEROS AO CARTÃO
    target.value = value.replace(/(\d{4})(?=\d)/g, '$& '); // ESPAÇO A CADA 4 DIGITOS
    this.checkCardBand(target);
  }

  handleTutelaryName(target) {        // ADICIONA NOME DO TITULAR AO CARTÃO;
    this.characterValidity(target);
    this.cardName.innerText = target.value = target.value;
    if (this.cardName.innerText === '') this.cardName.innerText = 'Seu nome aqui';
  }

  handleInputValidity(target) {     // ADICIONA A DATA DE VALIDADE AO CARTÃO;
    this.characterValidity(target);
    this.cardValidity.innerText = target.value;
  }

  formError({ target }) {          // VALIDA A DATA E NUMERO DO CARTÃO;
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

  handleCvv(target) {            // ADICIONA CVV AO CARTÃO;
    this.characterValidity(target);
    this.replaceNumbersInCard(this.cardCvv, [...target.value]);
  }

  input({ target }) {          // FILTRA OS ALVOS;
    if (target === this.form.inputNumber) this.handleInputNumber(target);
    if (target === this.form.tutelary) this.handleTutelaryName(target);
    if (target === this.form.validity) this.handleInputValidity(target);
    if (target === this.form.cvv) this.handleCvv(target);
  }

  init() {                   // INICIA A CLASS;
    this.form.addEventListener("input", this.input);
    this.form.addEventListener("change", this.formError);
    this.replaceNumbersInCard(this.cardNumber);
  } 
}
