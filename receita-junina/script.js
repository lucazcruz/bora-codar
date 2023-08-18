const plusButton = document.querySelector(".plus-button");
const minusButton = document.querySelector(".minus-button");
const ingredientes = document.querySelector(".ingredientes");

const amount = document.querySelector(".amount span");

function ingredientesIncrement(i) {
  ingredientes.innerHTML = `
    <li>${i} espiga de milho verde</li>
    <li>${i} colher de sopa de açúcar</li>
    <li>${i} colher de sopa de manteiga</li>
    <li>Sal a gosto</li>
    <li>Palha de milho (para embrulhar)</li>
  `
}

function newAmount(i) {
  if (amount.innerText < 9) {
    amount.innerText =  '0' + i;
    return
  }
  amount.innerText = i;
}

plusButton.onclick = () => {
  const i = +amount.innerText +1;
  ingredientesIncrement(i);
  newAmount(i);
}

minusButton.onclick = () => {
  if (amount.innerText === "01") return;
  const i = +amount.innerText -1;
  ingredientesIncrement(i);
  newAmount(i);
}
