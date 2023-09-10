class ShoppingList {
  constructor() {
    this.form = document.forms[0];
    this.main = document.querySelector("main");

    this.addNewItem = this.addNewItem.bind(this);
  }

  getData() {
    const data = JSON.parse(localStorage.getItem("shoppingList")) || [];
    return data;
  }

  saveData(newData) {
    localStorage.setItem("shoppingList", JSON.stringify(newData));
  }

  createItem(formData) {
    const item = document.createElement("div");
    item.classList.add("item")

    const checked = formData.checked ? "checked" : "";
    item.innerHTML = `  
      <div class="flex g-16">
        <div class="checkbox">
          <input type="checkbox" ${checked}>
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
    formData.checked= false;

    const data = this.getData();
    const newData = [...data, formData];

    this.saveData(newData);
    this.loadData();
  }

  isChecked(index) {
    const data = this.getData();

    if (data[index].checked) {
      data[index].checked = false;
      this.saveData(data);
      return
    }

    data[index].checked = true;
    this.saveData(data);
  }

  loadData() {
    this.main.innerHTML= "";
    const data = this.getData();
    data.forEach((element, index) => {
      const item = this.createItem(element);
      item.addEventListener("change", (e) => this.isChecked(index))
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