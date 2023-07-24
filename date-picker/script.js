const calendarDays = document.querySelector(".calendar .month-days");
const prev = document.querySelector(".chevron-left");
const next = document.querySelector(".chevron-right");

const date = new Date();

const renderCalendar = () => {
  calendarDays.innerText = '';
  date.setDate(1);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]

  const month = document.querySelector(".month-selector span");
  month.innerText = `${months[date.getMonth()]} ${date.getFullYear()}`

  const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

  const prevDays = prevLastDay - date.getDay() +1;

  const lastDay = new Date(date.getFullYear(), date.getMonth() +1, 0).getDate();

  const lastDayIndex = new Date(date.getFullYear(), date.getMonth() +1, 0).getDay();


  for (let i = prevDays; i <= prevLastDay; i++ ) {
    calendarDays.innerHTML += `<div class="prev-day">${i}</div>`
  }

  for (let i = 1; i <= lastDay; i++) {
    if (i == new Date().getDate()) {
      calendarDays.innerHTML += `<div class="today">${i}</div>`
    } else {
      calendarDays.innerHTML += `<div>${i}</div>`
    }
  }

  for (let i = 1; i <= (6-lastDayIndex); i++) {
    calendarDays.innerHTML += `<div class="next-day">${i}</div>`
  }
}

prev.addEventListener("click", () => {
  date.setMonth(date.getMonth() -1);
  renderCalendar();
})

next.addEventListener("click", () => {
  date.setMonth(date.getMonth() +1);
  renderCalendar();
})

renderCalendar();