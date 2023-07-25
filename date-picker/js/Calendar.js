export default class Calendar {
  constructor() {
    this.datePicker = document.querySelector(".date-picker");
    this.monthPicker = document.querySelector(".month-picker");

    this.nextMonthElement = document.querySelector(".date-picker .chevron-right");
    this.prevMonthElement = document.querySelector(".date-picker .chevron-left");
    this.nextYearElement = document.querySelector(".month-picker .chevron-right");
    this.prevYearElement = document.querySelector(".month-picker .chevron-left");

    this.dateSpan = document.querySelector(".month-selector span");
    this.yearSpan = document.querySelector(".year-selector span");
    
    this.dropDown = document.querySelector(".drop-down");
    this.calendarDays = document.querySelector(".calendar .month-days");
    this.calendarMonths = document.querySelectorAll(".month");
    this.date = new Date();
  }

  renderCalendar = () => {
    const months = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro", "Dezembro"]
    this.calendarDays.innerText = '';
    this.date.setDate(1);

    this.dateSpan.innerText = `${months[this.date.getMonth()]} ${this.date.getFullYear()}` // Atualiza o mês e o ano selecinado;
    this.yearSpan.innerText = this.date.getFullYear(); // Atualiza o mês e o ano selecinado;

    const lastDay = new Date(this.date.getFullYear(), this.date.getMonth() +1, 0).getDate(); // Ultimo dia do mês atual;
    const lastDayIndex = new Date(this.date.getFullYear(), this.date.getMonth() +1, 0).getDay(); // Dia da semana do ultimo dia do mês;
    const prevLastDay = new Date(this.date.getFullYear(), this.date.getMonth(), 0).getDate(); // Pega o ultimo dia do mês anterior;
    const prevDays = prevLastDay - this.date.getDay() +1; // Dias do mês anterior que irão aparecer no calendário;

    for (let i = prevDays; i <= prevLastDay; i++ ) { // Renderiza os dias do mês anterior;
      this.calendarDays.innerHTML += `<div class="prev-day">${i}</div>`;
    }

    const condition = this.date.getMonth() === new Date().getMonth();
    for (let i = 1; i <= lastDay; i++) { // Renderiza os dias do mês atual;
      if (condition && i == new Date().getDate()) {
        this.calendarDays.innerHTML += `<div class="today">${i}</div>`;
      } else {
        this.calendarDays.innerHTML += `<div>${i}</div>`;
      }
    }

    for (let i = 1; i <= (6-lastDayIndex); i++) { // renderiza os dias do proximo mês;
      this.calendarDays.innerHTML += `<div class="next-day">${i}</div>`
    }
  }

  updateMonthsCalendar() {
    this.calendarMonths.forEach((month, index) => {
      month.classList.remove("active");
      if (index === this.date.getMonth()) {
        month.classList.add("active");
      }
    })
  }

  prevMonth() {
    this.date.setMonth(this.date.getMonth() -1);
    this.renderCalendar();
    this.updateMonthsCalendar();
  }

  nextMonth() {
    this.date.setMonth(this.date.getMonth() +1);
    this.renderCalendar();
    this.updateMonthsCalendar();
  }

  prevYear() {
    this.date.setFullYear(this.date.getFullYear() -1);
    this.renderCalendar();
    this.updateMonthsCalendar();
  }

  nextYear() {
    this.date.setFullYear(this.date.getFullYear() +1);
    this.renderCalendar();
    this.updateMonthsCalendar();
  }

  toggleMonth(index) {
    this.date.setMonth(index)
    this.renderCalendar();
    this.toggleCalendar();
    this.updateMonthsCalendar();
  }

  toggleCalendar() {
    this.datePicker.classList.toggle("active")
    this.monthPicker.classList.toggle("active")
  }

  init() {
    this.calendarMonths.forEach((month, index) => {
      month.addEventListener("click", () => this.toggleMonth(index));
    })

    this.dropDown.addEventListener("click", () => this.toggleCalendar());
    this.prevMonthElement.addEventListener("click", () => this.prevMonth());
    this.nextMonthElement.addEventListener("click", () => this.nextMonth());

    this.prevYearElement.addEventListener("click", () => this.prevYear());
    this.nextYearElement.addEventListener("click", () => this.nextYear());

    this.renderCalendar();
    this.updateMonthsCalendar();
  }
}