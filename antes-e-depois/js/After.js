export default class After {
  constructor() {
    this.slider = document.querySelector(".slider");
    this.before = document.querySelector(".before");
    this.body = document.body;

    this.mouseDown = this.mouseDown.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    
    this.position = {start: 0, moviment:0, initialWidth: 0}
  }
  
  mouseDown({ clientX }) {
    this.body.addEventListener("mousemove", this.mouseMove);
    
    this.position.start = clientX;
    this.position.initialWidth = this.before.clientWidth;
  }

  mouseMove(e) {
    e.preventDefault();
    this.position.moviment = this.position.start - e.clientX;
    const width = this.position.initialWidth - this.position.moviment;

    this.before.style.width = `${width}px`;
  }
  
  mouseUp() {
    this.body.removeEventListener("mousemove", this.mouseMove);   
  }

  init() {
    this.slider.addEventListener("mousedown", this.mouseDown);
    this.body.addEventListener("mouseup", this.mouseUp); 
  }
}
