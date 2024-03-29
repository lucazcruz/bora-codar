export default class ShoppingList {
  constructor() {
    this.body = document.body;
    this.main = document.querySelector("main");
    this.form = document.forms[0];
    this.formButton = this.form.querySelector(".submit-button");
    this.selects = this.form.querySelectorAll(".select");
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
    item.classList.add("item");

    const checked = formData.checked ? "checked" : "";
    item.innerHTML = `  
      <div class="flex g-16">
        <div class="checkbox">
          <input type="checkbox" class="inputCheck" ${checked}>
          <i data-lucide="check"></i>
        </div>
        <div class="col">
          <h3>${formData.item}</h3>
          <p>${formData.unities} ${formData.unitType}</p>
        </div>
      </div>
      <div class="flex g-12">
        <span data-category="${formData.category.toLowerCase()}" >
          ${formData.category}
        </span>
        <div class="right">
          <div class="draggable" draggable="true">
            <i data-lucide="more-vertical"></i>
          </div>
          <button class="delete-button">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
      </div>
    `
    return item;
  }

  resetForm() {
    this.form.reset();

    const select = this.selects[0].querySelector(".selected-value");
    const categorySelected = this.selects[1].querySelector(".selected-value");
    categorySelected.innerText= "Selecione";
    select.innerText= "UN.";

    this.formButton.innerHTML= `<i data-lucide="plus"></i>`;
    lucide.createIcons();
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
    this.resetForm();
  }

  isChecked({ target }, index) {
    if (!target.classList.contains("inputCheck")) return;

    const data = this.getData();
    if (data[index].checked) {
      data[index].checked = false;
      this.saveData(data);
      return
    }

    data[index].checked = true;
    this.saveData(data);
  }

  selectItem(e, index) {
    const itemCheckbox = e.currentTarget.querySelector('input[type="checkbox"]');
    if (itemCheckbox === e.target) return;
    
    if (e.currentTarget.classList.contains("selected")) {
      e.currentTarget.classList.remove("selected");
      this.form.onsubmit = (e) => this.addNewItem(e);
      this.resetForm();
      return;
    }

    this.items = this.main.querySelectorAll(".item");
    this.items.forEach(item => item.classList.remove("selected"));

    e.currentTarget.classList.add("selected");
    this.editItem(e, index);
  }

  deleteItem(e, index) {
    const deleteButton = e.currentTarget.querySelector(".delete-button");
    if (!deleteButton.contains(e.target)) return;

    const data = this.getData();
    data.splice(index, 1);
    this.saveData(data);
    this.loadData();
  }

  saveEdit(e, index) {
    e.preventDefault();
    const formPrototype = new FormData(this.form);
    const formData = Object.fromEntries(formPrototype);

    const data = this.getData()
    data[index] = formData;
    this.saveData(data);
    this.loadData();

    this.form.onsubmit = (e) => this.addNewItem(e);
    this.resetForm();
  }

  editItem(e, index) {
    const data = this.getData();
    const types = {
      "UN.": "Unidade",
      "L": "Litro",
      "kg": "Kilograma"
    }

    const unitType = types[data[index].unitType];

    this.form["item-name"].value = data[index].item;
    this.form.unities.value = data[index].unities;
    this.form.querySelector(`[data-label='${unitType}']`).click()
    this.form.querySelector(`[data-label='${data[index].category}']`).click()

    this.formButton.innerHTML= `<i data-lucide="pencil"></i>`;
    lucide.createIcons();

    this.form.onsubmit = (e) => this.saveEdit(e, index)
  }

  itemActions(e, index) {
    this.deleteItem(e, index);
    this.selectItem(e, index);
  }

  loadData() {
    this.main.innerHTML= "";
    const data = this.getData();
    data.forEach((element, index) => {
      const item = this.createItem(element);
      item.addEventListener("change", (e) => this.isChecked(e, index))
      item.addEventListener("click", (e) => this.itemActions(e, index))
      this.main.appendChild(item)
    });

    lucide.createIcons();
  }

  changeOptions({ target, currentTarget}) {
    const seletedValue = currentTarget.querySelector(".selected-value")
    if (target.value !== 'on') {
      seletedValue.innerText = target.value;
    }
  }

  accessibility({ key }) {
      this.selects.forEach(select => {
      const viewbutton = select.querySelector(".options-view-button")
      if (key === " " || key === "Escape" || !select.contains(document.activeElement)) {
        viewbutton.checked = false;
      }
    })
  }

  outClick({ target }) {
    this.selects.forEach(select => {
      const viewbutton = select.querySelector(".options-view-button")
      if (!select.contains(target) && viewbutton.checked) {
        viewbutton.checked = false;
      }
    })
  }

  bindEvents() {
    this.addNewItem = this.addNewItem.bind(this);
    this.changeOptions = this.changeOptions.bind(this);
    this.outClick = this.outClick.bind(this);
    this.accessibility = this.accessibility.bind(this);
  }

  addEvents() {
    this.form.onsubmit = (e) => this.addNewItem(e);
    this.selects.forEach(select => {
      select.addEventListener("change", this.changeOptions);
    })
    this.form.addEventListener("keyup", this.accessibility);
    this.body.addEventListener("click", this.outClick)
  }

  init() {
    this.bindEvents();
    this.addEvents();
    this.loadData();
  }
}