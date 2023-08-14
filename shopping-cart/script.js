class Cart {
  constructor() {
    this.amountElements = document.querySelectorAll(".amount");
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
      return true
    }

    amountObj.minusButton.removeAttribute("disabled");
    return false;
  }

  moreItem(amountObj) {
    const amount =  +amountObj.amountElement.innerText;
    amountObj.amountElement.innerText = amount +1;
    this.amountVerification(amountObj);
  }

  minusItem(amountObj) {
    const amount =  +amountObj.amountElement.innerText;
    amountObj.amountElement.innerText = amount -1;
    this.amountVerification(amountObj);
  }

  cartEvents({ target }, amount) {
    const amountObj = this.amountObject(amount)
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