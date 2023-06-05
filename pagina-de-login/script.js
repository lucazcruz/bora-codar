const formLogin = document.querySelector("form");

formLogin.onchange = ({ target }) => {
  target.nextElementSibling.innerText = "";
  target.classList.remove("invalid");

  if (target.checkValidity()) return;

  target.classList.add("invalid");
  if (target === formLogin.email) {
    target.nextElementSibling.innerText = "Digite um e-mail válido";
  }
  if (target === formLogin.password) {
    target.nextElementSibling.innerText= "Digite uma senha válida";
  }
}