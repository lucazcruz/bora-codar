const inputSearch = document.querySelector("#search");
const inputCity = document.querySelector("#city");
const gridContainer = document.querySelector(".grid");
const formElement = document.forms[0];

formElement.onsubmit = (e) => {
  e.preventDefault();
  fetchCards();
}

async function fetchCards() {
  const url = "./api/api.json";
  const promisse = await fetch(url);
  const response = await promisse.json();

  const filterText = inputSearch.value.toLowerCase();
  const filterCity = inputCity.value;

  const filteredJson = response.filter(card => {
    const title = card.title.toLowerCase();
    const location = card.location;

    if (!title.includes(filterText)) return;
    if (filterCity !== "undefined" && !location.includes(filterCity)) return;
    return card
  })

  showCards(filteredJson);
  return filteredJson;
}

function cardConstructor(json) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <img src="${json.img}" alt="">
    <div class="info">
      <h3>${json.title}</h3>
      <p>${json.content}</p>
      <div class="location">
        <img src="./assets/location.svg" alt="location -icon">
        <span>${json.location}</span>
      </div>
    </div>`

  return card;
}

function showCards(filteredJson) {
  gridContainer.innerHTML= "";
  filteredJson.forEach(json => {
    const card = cardConstructor(json);
    gridContainer.appendChild(card);
  })
}

fetchCards();