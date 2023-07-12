const modal = document.querySelector(".modal");
const plusButton = document.querySelector(".plus-button");
const deleteButton = document.querySelector(".delete-button");
const editButton = document.querySelector(".edit-button");
const form = document.querySelector(".modal form");

const main = document.querySelector("main");
const searchInput = document.querySelector("#search-input");

const containerTemplate = document.querySelector("#container-template");
const contactTemplate = document.querySelector("#contact-template");

const renderContact = ({ name, number }) => {
  const contactElement = contactTemplate.content.cloneNode(true);
  contactElement.querySelector("h3").innerText = name;
  contactElement.querySelector("p").innerText = number;
  return contactElement;
}

const renderContainer = (letter, contacts) => {
  const containerElement = containerTemplate.content.cloneNode(true);
  containerElement.querySelector(".letter").innerText = letter;
  contacts.forEach(contact => {
    const li = renderContact(contact)
    containerElement.children[0].appendChild(li);
  })

  return containerElement;
}

const renderData = (data) => {
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
    const container = renderContainer(letter, contacts);
    ul.appendChild(container);
  }
  
  main.innerHTML = '';
  main.appendChild(ul);
}

const sortData = (a, b) => {
  let nameA = a.name.toUpperCase();
  let nameB = b.name.toUpperCase();

  if (nameA < nameB) return -1;
  if (nameA > nameB) return 1;
  return 0;
}

const saveContacts = (formData, index) => {
  const data = getData();
  
  if (index !== undefined) {
    data[index] = formData;
    saveData(data);
    return
  }
  const newData = [...data, formData];
  saveData(newData)
}

const getData = () => {
  const data = JSON.parse(localStorage.getItem("contactsList")) || [];
  return data;
}

const saveData = (newData) => {
  newData.sort(sortData);
  localStorage.setItem("contactsList", JSON.stringify(newData));
}

const selectContacts = ({ currentTarget }) => {
  if (currentTarget.classList.contains("selected")) {
    currentTarget.classList.remove("selected");
    return
  }
  currentTarget.classList.add("selected");
}

const showData = () => {
  const data = getData();
  renderData(data)

  const contactsArray = document.querySelectorAll(".contact");
  contactsArray.forEach((contact) => {
    contact.addEventListener("click", selectContacts);
  })
}

const filterData = ({ target }) => {
  const data = getData();

  const search = target.value.toLowerCase();
  const filteredData = data.filter(contact => {
    const condition1 = contact.name.toLowerCase().includes(search);
    const condition2 = contact.number.includes(search);
    return condition1 || condition2;
  })

  renderData(filteredData);
}

const onModal = (e, index) => {
  modal.classList.remove("hidden");

  if(index !== undefined) {
    form[2].onclick = (e) => newContact(e, index);
    return
  }

  form[2].onclick = (e) => newContact(e);
}

const hiddenModal = (e , hidden = false) => {
  if (hidden) {
    modal.classList.add("hidden");
    return
  }

  if (e.target === modal) modal.classList.add("hidden");
}

const newContact = (e, index) => {
  e.preventDefault();

  const formPrototype = new FormData(form);
  const formData = Object.fromEntries(formPrototype);

  saveContacts(formData, index);
  hiddenModal('', true)
  showData();
}

const deleteContacts = () => {
  const data = getData();
  const contactsArray = document.querySelectorAll(".contact");

  const newData = data.filter((item, index) => {
    if (contactsArray[index].classList.contains("selected")) {
      return false
    }
    return true
  })

  saveData(newData);
  showData();
}

const editContacts = () => {
  const contactSelected = document.querySelectorAll(".contact.selected");
  if (contactSelected.length === 0) return;
  if (contactSelected.length > 1) {
    alert("Selecione apenas um contato.")
    return
  }

  const contactsArray = document.querySelectorAll(".contact");
  const data = getData();

  const index = Array.from(contactsArray).indexOf(contactSelected[0]);
  const contact = data[index];

  form[0].value = contact.name;
  form[1].value = contact.number;
  
  onModal('', index);
}

modal.addEventListener("click", hiddenModal);
plusButton.addEventListener("click", onModal);
searchInput.addEventListener("input", filterData);
deleteButton.addEventListener("click", deleteContacts);
editButton.addEventListener("click", editContacts);

showData();
