import Dashboard from "./script/Dashboard.js";


const intervalSales = new Dashboard("#circleSales" , ".salesPercentage", ".reachedSales");
const intervalGoal = new Dashboard("#goalCircle" , ".goalPercentage", ".reachedGoal");

intervalSales.init();
intervalGoal.init();
