export default class FetchCards {
  constructor(container, form) {
    this.gridContainer = document.querySelector(container);
    this.formElement = document.querySelector(form);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.searchValue = e.target.search.value;
    this.stateValue = e.target.state.value;
    this.showCards();
  }
  
  cardConstructor(json) {
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

  filterJson(response) {
    let filterText = '';
    let filterState = this.stateValue;

    if (this.searchValue) filterText = this.searchValue.toLowerCase();

    const filteredJson = response.filter(card => {
      const title = card.title.toLowerCase();
      const location = card.location;
  
      if (!title.includes(filterText)) return;
      if (filterState !== "undefined" && !location.includes(filterState)) return;
      return card;
    })

    return filteredJson;
  }
  
  async fetchAPI(url) {
    const promisse = await fetch(url);
    const response = await promisse.json();

    return response
  }

  async showCards() {
    const response = await this.fetchAPI("./api/api.json");
    const filteredJson = this.filterJson(response);

    this.gridContainer.innerHTML= "";
    filteredJson.forEach(json => {
      const card = this.cardConstructor(json);
      this.gridContainer.appendChild(card);
    })
  }

  init() {
    this.showCards();
    this.formElement.addEventListener("submit", (e) => this.handleSubmit(e));
  }
}