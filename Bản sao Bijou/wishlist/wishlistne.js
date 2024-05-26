const shoppingBagIcons = document.querySelectorAll('.wishlistne-btn');
const headerShoppingBag = document.querySelector('.quanity');

shoppingBagIcons.forEach(shoppingBagIcon => {
  shoppingBagIcon.addEventListener('click', () => {
    let currentQuantity = parseInt(headerShoppingBag.textContent);
    if (currentQuantity < 9) {
      headerShoppingBag.textContent = currentQuantity + 1;
    } else {
      headerShoppingBag.textContent = '9+';
    }
  });
});