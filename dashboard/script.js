import Dashboard from "./script/Dashboard.js";


const intervalSales = new Dashboard("#circleSales" , ".salesPercentage", ".reachedSales");
const intervalGoal = new Dashboard("#goalCircle" , ".goalPercentage", ".reachedGoal");

intervalSales.init();
intervalGoal.init();



const bars = document.querySelectorAll(".bar-graphs li .bar");
bars.forEach(bar => {
  const value = bar.dataset.value * 2;
  let i = 0;  
  const interval = setInterval(() => {
    i += value / 100
    bar.style.height = i + 'px';
    if (i >= value) clearInterval(interval);
  })
  bar.addEventListener("mouseenter", handleMouse);
  bar.addEventListener("mouseout", onMouseOut)
})

function onMouseOut(e) {
  const barValue = e.target.querySelector(".bar-value");
  barValue.classList.remove("on")
}

function handleMouse(e) {
  const value = e.target.dataset.value
  const barValue = e.target.querySelector(".bar-value");
  barValue.innerText = value;
  barValue.classList.add("on")
}
