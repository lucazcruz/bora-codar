const send = document.querySelector(".send");
const messages = document.querySelector("#messages");

function newBallon(msg) {
  const div = document.createElement("div");
  div.classList.add("message");
  
  const date = new Date();
  const now = `${date.getHours()}:${date.getMinutes()}`;
  const past = messages.querySelector(".message:last-child .hora")
    .innerText.slice(7);
  
  if (past === now) {
    div.innerHTML = `
      <div class="me">
        <span class="hora sr-only">Você - ${now}</span>
        <p class="ballon">${msg}</p>
      </div>
    `;
  } else {
    div.classList.add("mt-30")
    div.innerHTML = `
      <div class="me">
        <span class="hora">Você - ${now}</span>
        <p class="ballon">${msg}</p>
      </div>
    `;
  }

  return div;
}

function sending() {
  const input = document.querySelector("input");
  const msg = input.value;
  
  const div = newBallon(msg);
  messages.appendChild(div);

  input.value = '';
  input.focus();
}

send.addEventListener("click", sending);