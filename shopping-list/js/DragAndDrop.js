export default class DragAndDrop {
  constructor() {
    this.main = document.querySelector("main");

    this.onDragover = this.onDragover.bind(this);
  }

  onDragstart({ target }) {
    target.classList.add("dragging");
  }

  onDragend({ target }) {
    target.classList.remove("dragging");
  }

  getNewPosition(posY) {
    const items = this.main.querySelectorAll(".item:not(.dragging)");
    let result;

    items.forEach(item => {
      const box = item.getBoundingClientRect();
      const cardCenterY = box.y + box.height / 2;
    
      if (posY >= cardCenterY) result = item;
    })

    return result;
  }

  onDragover(e) {
    const dragging = this.main.querySelector(".dragging");
    const applyAfter = this.getNewPosition(e.clientY);

    if (applyAfter) {
      applyAfter.insertAdjacentElement("afterend", dragging);
    } else {
      this.main.prepend(dragging);
    }
  }

  addEvents() {
    document.addEventListener("dragstart", this.onDragstart);
    document.addEventListener("dragend", this.onDragend);
    this.main.addEventListener("dragover", this.onDragover);
  }

  init() {
    this.addEvents();
  }
}