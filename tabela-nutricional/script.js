const topInfo = document.querySelector(".top-info");
const moreButton = document.querySelector(".more-button");
const slider = document.querySelector(".more-details .slider");
const moreDetails = document.querySelector(".more-details");

const favoriteButton = document.querySelector(".favorite-button");

function toggle({ currentTarget }) {
  if (currentTarget === topInfo) {
    moreDetails.classList.remove("active");  
    return
  }
  moreDetails.classList.toggle("active");  
}

function favorited() {
  const img = favoriteButton.children[0];
  if (favoriteButton.dataset.filled === "false") {
    img.src = "./assets/heart-filled.svg";
    favoriteButton.dataset.filled = true
  } else {
    img.src = "./assets/heart.svg";
    favoriteButton.dataset.filled = false;
  }
}

moreButton.addEventListener("click", toggle);
topInfo.addEventListener("click", toggle);
slider.addEventListener("mousedown", toggle);
favoriteButton.addEventListener("mousedown", favorited);