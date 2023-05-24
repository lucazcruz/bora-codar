import FetchCards from "./FetchCards.js";
import MenuMobile from "./MenuMobile.js";

const fetchCards = new FetchCards("#flex-content", "#form");
const menuMobile = new MenuMobile();

fetchCards.init();
menuMobile.init();