
//----------------------------------
const mainImg = document.getElementById("main-img");
const optionBtns = document.querySelectorAll(".option-btn");
let selectedBtn = optionBtns[0]; 

optionBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    selectedBtn = btn;
    mainImg.src = btn.dataset.image;
  });
});

document.querySelectorAll(".option-btn").forEach(btn => {
  btn.addEventListener("mouseover", () => {
    mainImg.src = btn.dataset.image;
  });
});

//-----WISHLIST RECENT
const wishlistItems = document.querySelectorAll('.wishlist');
let currentIndex = 0;

function selectItem(index) {
  deselectAll();
  wishlistItems[index].classList.add('selected');
}

function deselectAll() {
  wishlistItems.forEach((item) => {
    item.classList.remove('selected');
  });
}

function moveToNextItem() {
  currentIndex = (currentIndex + 1) % wishlistItems.length;
  selectItem(currentIndex);
}

function moveToPrevItem() {
  currentIndex = (currentIndex - 1 + wishlistItems.length) % wishlistItems.length;
  selectItem(currentIndex);
}

selectItem(currentIndex);

document.querySelector('.wishlist-next').addEventListener('click', moveToNextItem);
document.querySelector('.wishlist-prev').addEventListener('click', moveToPrevItem);

//add to cart cua han
const addButtons = document.querySelectorAll('.add');
const headerShoppingBag = document.querySelector('.bag-quanity');

addButtons.forEach(addButton => {
  addButton.addEventListener('click', () => {
    let currentQuantity = parseInt(headerShoppingBag.textContent);
    if (currentQuantity < 9) {
      headerShoppingBag.textContent = currentQuantity + 1;
    } else {
      headerShoppingBag.textContent = '9+';
    }
  });
});
