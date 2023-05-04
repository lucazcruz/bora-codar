const sendButton = document.querySelector(".send-button");
const messagesElement = document.querySelector("#messages");

function newMessage(messageText) {
  const div = document.createElement("div");
  div.classList.add("message");
  
  const date = new Date();
  const now = `${date.getHours()}:${date.getMinutes()}`;
  const previousBalloonTime = messagesElement.querySelector(".message:last-child .hour")
    .innerText.slice(7);
  
  if (previousBalloonTime === now) {
    div.innerHTML = `
      <div class="my-message">
        <span class="hour sr-only">Você - ${now}</span>
        <p class="balloon">${messageText}</p>
      </div>
    `;
  } else {
    div.classList.add("mt-30")
    div.innerHTML = `
      <div class="my-message">
        <span class="hour">Você - ${now}</span>
        <p class="balloon">${messageText}</p>
      </div>
    `;
  }

  return div;
}

function scrollBar() {
  const main = document.querySelector("main");
  const heightMain = main.scrollHeight;

  main.scrollTo({
    top: heightMain,
    behavior: "smooth"
  });
}

function toSend() {
  const input = document.querySelector(".text-input");
  const messageText = input.value;
  
  const div = newMessage(messageText);
  messagesElement.appendChild(div);

  input.value = '';
  input.focus();
  scrollBar();
}

sendButton.addEventListener("click", toSend);
