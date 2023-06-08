const collums = document.querySelectorAll(".collum");



document.addEventListener("dragstart", ({ target }) => {
  target.classList.add("dragging");
});

document.addEventListener("dragend", ({ target }) => {
  target.classList.remove("dragging")
});


collums.forEach(collum => {
  collum.addEventListener("dragover", (e) => {
    const dragging = document.querySelector(".dragging");
    const applyAfter = getNewPosition(collum, e.clientY);

    if (applyAfter) {
      applyAfter.insertAdjacentElement("afterend", dragging);
    } else {
      collum.prepend(dragging);
    }
  })
})

function getNewPosition(collum, posY) {
  const cards = collum.querySelectorAll(".card:not(.dragging)");
  let result;

  for (card of cards) {
    const cardPositions = card.getBoundingClientRect();
    const centerY = cardPositions.y + cardPositions.height / 2;
    if (posY >= centerY) result = card;
  }

  return result;
}