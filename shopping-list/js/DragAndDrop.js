export default class DragAndDrop {
  constructor() {
    this.main = document.querySelector("main");

    this.onDragover = this.onDragover.bind(this);
    this.onDragstart = this.onDragstart.bind(this);
    this.onDragend = this.onDragend.bind(this);
  }

  onDragstart({ target }) {
    target.closest(".item").classList.add("dragging");
    this.main.addEventListener("touchmove", this.onDragover);
  }

  onDragend({ target }) {
    target.closest(".item").classList.remove("dragging");
    this.main.removeEventListener("touchmove", this.onDragover);
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
    e.preventDefault();

    const posY = e.type === "dragover" ? e.clientY : e.changedTouches[0].clientY;

    const dragging = this.main.querySelector(".dragging");
    const applyAfter = this.getNewPosition(posY);

    console.log(applyAfter)
    if (applyAfter) {
      applyAfter.insertAdjacentElement("afterend", dragging);
    } else {
      this.main.prepend(dragging);
    }
  }

  addEvents() {
    const dragButtons = this.main.querySelectorAll(".item .draggable");
    this.main.addEventListener("dragstart", this.onDragstart);
    this.main.addEventListener("dragend", this.onDragend);
    this.main.addEventListener("dragover", this.onDragover);

    dragButtons.forEach(dragButton => {
      dragButton.addEventListener("touchstart", this.onDragstart);
      dragButton.addEventListener("touchend", this.onDragend);
    })
  }

  init() {
    this.addEvents();
  }
}