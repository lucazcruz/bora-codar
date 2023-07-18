class MyContacts {
  constructor() {
    this.modal = document.querySelector(".modal");
    this.plusButton = document.querySelector(".plus-button");
    this.deleteButton = document.querySelector(".delete-button");
    this.editButton = document.querySelector(".edit-button");
    this.form = document.querySelector(".modal form");
    
    this.main = document.querySelector("main");
    this.searchInput = document.querySelector("#search-input");
    
    this.containerTemplate = document.querySelector("#container-template");
    this.contactTemplate = document.querySelector("#contact-template");
  }

  renderContact = ({ name, number }) => {
    const contactElement = this.contactTemplate.content.cloneNode(true);
    // const random = Math.floor(Math.random() * 100);
    const random = 1;
    const imgUrl = `https://source.unsplash.com/random?a=${random}`

    contactElement.querySelector(".perfil-image").src = imgUrl;
    contactElement.querySelector("h3").innerText = name;
    contactElement.querySelector("p").innerText = number;
    return contactElement;
  }

  renderContainer = (letter, contacts) => {
    const containerElement = this.containerTemplate.content.cloneNode(true);
    containerElement.querySelector(".letter").innerText = letter;
    contacts.forEach(contact => {
      const li = this.renderContact(contact)
      containerElement.children[0].appendChild(li);
    })

    return containerElement;
  }

  renderData = (data) => {
    const ul = document.createElement("ul");
    ul.classList.add('contact-list');
    
    let contactsByLetter = {};
    data.forEach(contact => {
      const letter = contact.name[0].toUpperCase();
      if (!contactsByLetter[letter]) {
        contactsByLetter[letter] = [];
      }
      contactsByLetter[letter].push(contact);
    })

    for (const letter in contactsByLetter) {
      const contacts = contactsByLetter[letter];
      const container = this.renderContainer(letter, contacts);
      ul.appendChild(container);
    }
    
    this.main.innerHTML = '';
    this.main.appendChild(ul);
  }

  sortData = (a, b) => {
    let nameA = a.name.toUpperCase();
    let nameB = b.name.toUpperCase();

    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  }

  saveContacts = (formData, index) => {
    const data = this.getData();
    this.form[0].value = '';
    this.form[1].value = '';
    
    if (index !== undefined) {
      data[index] = formData;
      this.saveData(data);
      return
    }
    const newData = [...data, formData];
    this.saveData(newData)
  }

  getData = () => {
    const data = JSON.parse(localStorage.getItem("contactsList")) || [];
    return data;
  }

  saveData = (newData) => {
    newData.sort(this.sortData);
    localStorage.setItem("contactsList", JSON.stringify(newData));
  }

  selectContacts = ({ currentTarget }) => {
    if (currentTarget.classList.contains("selected")) {
      currentTarget.classList.remove("selected");
      return
    }
    currentTarget.classList.add("selected");
  }

  selectEvent = () => {
    const contactsArray = document.querySelectorAll(".contact");
    contactsArray.forEach((contact) => {
      contact.addEventListener("click", this.selectContacts);
    })
  }

  showData = () => {
    const data = this.getData();
    this.renderData(data)
    this.selectEvent();
  }

  filterData = ({ target }) => {
    const data = this.getData();

    const search = target.value.toLowerCase();
    const filteredData = data.filter(contact => {
      const condition1 = contact.name.toLowerCase().includes(search);
      const condition2 = contact.number.includes(search);
      return condition1 || condition2;
    })

    this.renderData(filteredData);
  }

  onModal = (e, index) => {
    this.modal.classList.remove("hidden");

    if(index !== undefined) {
      this.form[2].onclick = (e) => this.newContact(e, index);
      return
    }

    this.form[2].onclick = (e) => this.newContact(e);
  }

  hiddenModal = (e , hidden = false) => {
    if (hidden) {
      this.modal.classList.add("hidden");
      return
    }

    if (e.target === this.modal) this.modal.classList.add("hidden");
  }

  newContact = (e, index) => {
    e.preventDefault();

    const formPrototype = new FormData(this.form);
    const formData = Object.fromEntries(formPrototype);

    if (formData.name === '' || formData.number === ''){
      alert("Campos Inválidos.")
      return
    }

    this.saveContacts(formData, index);
    this.hiddenModal('', true)
    this.showData();
  }

  deleteContacts = () => {
    const data = this.getData();
    const contactsArray = document.querySelectorAll(".contact");

    const newData = data.filter((item, index) => {
      if (contactsArray[index].classList.contains("selected")) {
        return false
      }
      return true
    })

    this.saveData(newData);
    this.showData();
  }

  editContacts = () => {
    const contactSelected = document.querySelectorAll(".contact.selected");
    if (contactSelected.length === 0) return;
    if (contactSelected.length > 1) {
      alert("Selecione apenas um contato.")
      return
    }

    const contactsArray = document.querySelectorAll(".contact");
    const data = this.getData();

    const index = Array.from(contactsArray).indexOf(contactSelected[0]);
    const contact = data[index];

    this.form[0].value = contact.name;
    this.form[1].value = contact.number;
    
    this.onModal('', index);
  }

  init() {
    this.modal.addEventListener("click", this.hiddenModal);
    this.plusButton.addEventListener("click", this.onModal);
    this.searchInput.addEventListener("input", this.filterData);
    this.deleteButton.addEventListener("click", this.deleteContacts);
    this.editButton.addEventListener("click", this.editContacts);
    this.showData();
  }
}

const myContacts = new MyContacts();
myContacts.init();
