const calculo = document.querySelector(".calculo");
const result = document.querySelector(".result");

function invalid() {
  result.innerText = "invalid!";
  const interval = setTimeout(() => result.innerText= "0", 1500)
}

function display(n) {
  if (result.innerText == "0" && !isNaN(n)) {
    result.innerText = "";
  }
  if (result.innerText.length > 9) {
    result.innerText = result.innerText.slice(1);
  }

  const last = isNaN(result.innerText.slice(-1));
  if (last && isNaN(n)) {
    backspace();
  }
  result.innerText += n;
}

function backspace() {
  result.innerText = result.innerText.slice(0, -1);
  if (result.innerText == "") result.innerText= "0";
}

function clearDisplay() {
  calculo.innerText = "";
  result.innerText = "0";
}

function calculate() {
  try {
    if (eval(result.innerText) === undefined) throw new Error();
    calculo.innerText = result.innerText;
    result.innerText = String(eval(result.innerText)).slice(0,9);
  } catch(error) {
    invalid();
  }
}