const calculo = document.querySelector(".calculo");
const result = document.querySelector(".result");

function sizeHandle(length) {
  if (length < 19) {  
    result.style.fontSize= `22px`
    if (length <= 15) {
      result.style.fontSize= `28px`
      if (length <= 11) {
        result.style.fontSize= `36px`
      }
    }
    return;
  }
  result.style.fontSize= `22px`
  result.innerText = result.innerText.slice(0, 19);
}

function backspace() {
  sizeHandle(result.innerText.length)
  result.innerText = result.innerText.slice(0, -1);
  if (result.innerText == "") result.innerText= "0";
}

function clearDisplay() {
  calculo.innerText = "";
  result.innerText = "0";
  sizeHandle(result.innerText.length)
}

function invalid() {
  result.innerText = "invalid!";
  const interval = setTimeout(() => result.innerText= "0", 1500)
}

function validation(n) {
  if (result.innerText == "0" && !isNaN(n)) {
    result.innerText = "";
  }
  const last = isNaN(result.innerText.slice(-1));
  if (last && isNaN(n)) {
    backspace();
  }
}

function display(n) {
  validation(n);
  result.innerText += n;
  sizeHandle(result.innerText.length);
}

function percentage() {
  const arrNum = result.innerText.split(/[+\*\-\/\%]/)
  const lastNum = arrNum[arrNum.length-1];
  result.innerText = result.innerText.replace(`${lastNum}`, lastNum/100);
  sizeHandle(result.innerText.length);
}

function calculate() {
  try {
    if (eval(result.innerText) === undefined) throw new Error();
    calculo.innerText = result.innerText;
    result.innerText = eval(result.innerText);
    sizeHandle(result.innerText.length);

  } catch(error) {
    invalid();
  }
}
