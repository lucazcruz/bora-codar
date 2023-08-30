const inputText = document.querySelector("#githubUser");
const btn = document.querySelector(".primary-button");

const h3 = document.querySelector(".content-user h3");
const img = document.querySelector(".content-user img");
const fail = document.querySelector("#danger");
const sucess = document.querySelector("#sucess");


async function gerarTicket() {
  const url = `https://api.github.com/users/${inputText.value}`;

  const promisse = await fetch(url);
  const user = await promisse.json();
  
  if (user.message !== undefined) userNotExist();
  else userExist(user);
}

function userExist(user) {
  h3.innerText= user.name;
  img.src = user.avatar_url;

  fail.classList.remove("show");
  sucess.classList.add("show");
  btn.innerText = "Fazer download";
}

function userNotExist() {
  h3.innerText= 'Seu nome aqui';
  img.src = './assets/foto.png';
  
  danger.classList.add("show");
}

btn.addEventListener("click", gerarTicket);