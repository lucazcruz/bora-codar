export default class MenuMobile {
  constructor() {
    this.menuForm = document.querySelector("#form");
    this.cortina = document.querySelector(".cortina");
    this.menuBtn = document.querySelector(".button.menu");
    this.searchBtn = this.menuForm.querySelector(".button");
    this.bindEvents();
  }

  toggleMenu() {
    this.menuForm.classList.toggle("on")
    this.cortina.classList.toggle("on")
    this.menuBtn.classList.toggle("on")
  }

  bindEvents() {
    this.toggleMenu = this.toggleMenu.bind(this);
  }
  
  init() {
    this.menuBtn.addEventListener("click", this.toggleMenu);
    this.searchBtn.addEventListener("click", this.toggleMenu);
    this.cortina.addEventListener("click", this.toggleMenu);
  }
  
}

