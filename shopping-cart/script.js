class Cart {
  constructor() {
    this.amountElements = document.querySelectorAll(".amount");
    this.cardsElements = document.querySelectorAll(".itens .card");
    this.totalElement = document.querySelector(".amount-total");
  }

  formatValue(item) {
    const value = item.querySelector("h3").innerText;
    const valueItem = value.replace("R$ ", "").replace(".", "").replace(",", ".");
    return +valueItem;
  }

  attTotal() {
    let total = 0
    this.cardsElements.forEach(card => {
      const cardValue = this.formatValue(card);
      const amount = card.querySelector(".amount span").innerText;

      total += cardValue * amount
    })

    const totalBRL = total.toLocaleString("pt-BR", {style:"currency", currency:"BRL"});
    this.totalElement.innerText = totalBRL;
  }

  amountObject(amount) {
    const amountObj = {
      plusButton: amount.querySelector(".plus-button"),
      amountElement: amount.querySelector("span"),
      minusButton: amount.querySelector(".minus-button")
    }

    return amountObj;
  }

  amountVerification(amountObj) {
    if (amountObj.amountElement.innerText < 2) {
      amountObj.minusButton.setAttribute("disabled", '');
      amountObj.amountElement.innerText = 1;
      return
    }

    amountObj.minusButton.removeAttribute("disabled");
  }

  moreItem(amountObj) {
    const amount =  +amountObj.amountElement.innerText;
    amountObj.amountElement.innerText = amount +1;
    this.amountVerification(amountObj);
    this.attTotal();
  }

  minusItem(amountObj) {
    const amount =  +amountObj.amountElement.innerText;
    amountObj.amountElement.innerText = amount -1;
    this.amountVerification(amountObj);
    this.attTotal();
  }

  cartEvents({ target }, amountElement) {
    const amountObj = this.amountObject(amountElement)
    if (amountObj.plusButton === target || target.parentElement === amountObj.plusButton) this.moreItem(amountObj);
    if (amountObj.minusButton === target || target.parentElement === amountObj.minusButton) this.minusItem(amountObj);
  }

  addCartEvents() {
    this.amountElements.forEach(amountElement => {
      amountElement.addEventListener("click", (e) => this.cartEvents(e, amountElement));
    })
  }
}

const cart = new Cart();
cart.addCartEvents();
