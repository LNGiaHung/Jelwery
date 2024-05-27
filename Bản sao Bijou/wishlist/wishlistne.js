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

document.addEventListener('DOMContentLoaded', function() {
    fetchWishListItemsFromDatabase();
});

const user1 = JSON.parse(sessionStorage.getItem('user'));
const allowedUsername = user1 ? user1.user.Mail : null;

async function fetchWishListItemsFromDatabase() {
    try {
        const response = await fetch('http://localhost:3001/wishlist-items');
        if (!response.ok) {
            throw new Error('Failed to fetch WishList items');
        }

        const data = await response.json();
        const WishListItems = data.WishListItems;
        WishListItems.forEach(item => {
            if (item.username === allowedUsername) {
                addWishList(item);
            }
        });
    } catch (error) {
        console.error('Error fetching WishList items:', error.message);
    }
}

function addWishList(item) {
    const { PID, Price, Image, Name, Material, Quantity } = item;
    const WishListBody = document.querySelector(".wishlistne__grid__items");

    const WishListItem = document.createElement("div");
    WishListItem.classList.add("wishlistbox", "box1");

    WishListItem.innerHTML = `
        <div class="wishlistbox__box1-img">
            <img src="${Image}" alt="${Name}">
            <div class="wishlistne-close-btn">
                <!-- Close button functionality can be added here -->
            </div>
        </div>
        <div class="wishlistbox__box1-description">
            <a href="../productdetails/productdetails.html">${Name}</a>
            <p>Price: ${Price}</p>
            <p>Material: ${Material}</p>
        </div>
        <button class="wishlistne-btn">Add to Cart</button>
    `;

    WishListBody.appendChild(WishListItem);
}


// ------DAC -----