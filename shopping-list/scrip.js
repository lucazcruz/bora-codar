class ShoppingList {
  constructor() {
    this.form = document.forms[0];
    this.selects = this.form.querySelectorAll(".select")
    this.unitiesSelected = this.form.querySelector("#unities-select .selected-value")
    this.main = document.querySelector("main");
    this.body = document.body;

    this.addNewItem = this.addNewItem.bind(this);
    this.changeOptions = this.changeOptions.bind(this);
    this.outClick = this.outClick.bind(this);
    this.accessibility = this.accessibility.bind(this);
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
        <div class="buttons">
            <div class="moreButton">
              <i data-lucide="more-vertical"></i>
              <input type="checkbox">
            </div>

            <div class="modal">
              <button class="editButton">
                <i data-lucide="pencil"></i>
              </button>
              <button class="deleteButton">
                <i data-lucide="trash-2"></i>
              </button>
            </div>
          </div>
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

  deleteItem(index) {
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

    this.form.addEventListener("submit", this.addNewItem);
  }

  editItem(index) {
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

    this.form.removeEventListener("submit", this.addNewItem);
    this.form.onsubmit = (e) => this.saveEdit(e, index);
  }

  loadData() {
    this.main.innerHTML= "";
    const data = this.getData();
    data.forEach((element, index) => {
      const item = this.createItem(element);
      item.addEventListener("change", (e) => this.isChecked(e, index))
      item.querySelector(".deleteButton").addEventListener("click", () => this.deleteItem(index));
      item.querySelector(".editButton").addEventListener("click", () => this.editItem(index));
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

  init() {
    this.form.addEventListener("submit", this.addNewItem);
    this.selects.forEach(select => {
      select.addEventListener("change", this.changeOptions);
    })

    this.form.addEventListener("keyup", this.accessibility);
    this.body.addEventListener("click", this.outClick)

    this.loadData();
  }
}

  const shoppingList = new ShoppingList();
  shoppingList.init();
  