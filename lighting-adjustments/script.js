const lightElement = document.querySelector('.ilumination');
const inputs = document.querySelectorAll("input");

function newColor(hue, brightness, contrast) {
  const color = `hsl(${hue}, ${brightness}%, ${contrast}%)`;
  const shadow = `0px 0px 53px 13px hsla(${hue}, ${brightness}%, ${contrast}%, 0.91)`;

  lightElement.style.background = color;
  lightElement.style.boxShadow = shadow;
}

function changeColor() {
  const hue = inputs[0].value;
  const brightness = inputs[1].value;
  const contrast = inputs[2].value;

  newColor(hue, brightness, contrast);
}

inputs.forEach(input => {
  input.addEventListener("input", changeColor);
})

changeColor();