export default class Dashboard {
  constructor(circleBar, percentage, reached) {
    this.circleBar = document.querySelector(circleBar);
    this.percentage = document.querySelector(percentage);
    this.metaNow = document.querySelector(reached);
  }

  interval() {
    const ramdom = Math.round(Math.random() * 95);
    if (this.metaNow.classList.contains("reachedSales")) {
      this.metaNow.innerText = `${ramdom}`
    } else {
      this.metaNow.innerText = `R$ ${ramdom}K`
    }

    let sales = 0
    const interval = setInterval(() => {
      sales++
      this.percentage.innerText = `${sales}%`;
      this.circleBar.style.strokeDashoffset = (410 - 410 * (sales/100));

      if (sales == ramdom) clearInterval(interval);
    }, 50)
  }
  init() {
    this.interval();
  }
}