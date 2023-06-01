var div = document.querySelectorAll(".money-wrapper");

div.forEach(div => {
  div.querySelector("input").addEventListener("focus", onFocus);
  div.querySelector("input").addEventListener("blur", offFocus);
  
  function onFocus() {
    div.classList.add("focus");
  }
  
  function offFocus() {
    div.classList.remove("focus");
  }
})

const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach(dropdown => {
  dropdown.addEventListener('click', handleDrop);

  function handleDrop() {
    dropdown.classList.toggle("on");
  }
});
