class ShoppingList {
  constructor() {
    this.form = document.forms[0];
    this.main = document.querySelector("main");
    this.addNewItem = this.addNewItem.bind(this);
  }

  createItem(formData) {
    const item = document.createElement("div");
    item.classList.add("item")
    item.innerHTML = `  
      <div class="flex g-16">
        <div class="checkbox">
          <input type="checkbox" name="" id="">
          <i data-lucide="check"></i>
        </div>
        <div class="col">
          <h3>${formData.item}</h3>
          <p>${formData.unities} ${formData.unitType}</p>
        </div>
      </div>
      <div class="flex g-12">
        <span data-category="${formData.category}" >
          ${formData.category}
        </span>
        <button class="moreButton">
          <i data-lucide="more-vertical"></i>
        </button>
      </div>
    `
    return item;
  }

  addNewItem(e) {
    e.preventDefault();
    const formPrototype = new FormData(this.form);
    const formData = Object.fromEntries(formPrototype);


    this.saveData(formData)
    this.loadData()
    
  }

  saveData(formData) {
    this.data = JSON.parse(localStorage.getItem("data")) || [];
    const newData = [...this.data, formData];
    localStorage.setItem("data", JSON.stringify(newData));
  }

  loadData() {
    this.main.innerHTML= "";
    this.data = JSON.parse(localStorage.getItem("data")) || [];
    this.data.forEach(element => {
      const item = this.createItem(element);
      this.main.appendChild(item)
    });
    lucide.createIcons();
  }

  init() {
    this.form.addEventListener("submit", this.addNewItem);
    this.loadData();
  }
}

const shoppingList = new ShoppingList();
shoppingList.init();