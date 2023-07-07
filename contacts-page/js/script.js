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

const getData = () => {
  let data = [
    {
      "name": "João",
      "number": "123456789"
    },
    {
      "name": "Maria",
      "number": "987654321"
    },
    {
      "name": "Joana",
      "number": "749944444"
    },
    {
      "name": "Ana",
      "number": "321654987"
    }
  ]
  
  data.sort(sortData);

  return data;
}

const showData = () => {
  const data = getData();
  renderData(data)
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

searchInput.addEventListener("input", filterData);
showData()
