const shoppingBagIcons = document.querySelectorAll('.wishlistne-btn');
const headerShoppingBag = document.querySelector('.quanity');
updateShoppingBagWishList();
// shoppingBagIcons.forEach(shoppingBagIcon => {
//   shoppingBagIcon.addEventListener('click', () => {
//     let currentQuantity = parseInt(headerShoppingBag.textContent);
//     if (currentQuantity < 9) {
//       headerShoppingBag.textContent = currentQuantity + 1;
//     } else {
//       headerShoppingBag.textContent = '9+';
//     }
//   });
// });

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

    // Get the newly added "Add to Cart" button
    const addToCartButton = WishListItem.querySelector('.wishlistne-btn');
    
    // Attach event listener to the button
    addToCartButton.addEventListener('click', () => addEventListenersToIcons(item));

    // DETAILS
    const productImgDiv = WishListItem.querySelector('.wishlistbox__box1-description a');
    productImgDiv.addEventListener('click', () => {
        navigateToProductDetailPage(item);
      });
      // DELETE
       // Add event listener to close button for deleting the item
    const deleteButton = WishListItem.querySelector('.wishlistne-close-btn');
    deleteButton.addEventListener('click', (event) => {
        console.log('Deleting PID:', PID);  // Log PID when retrieving it for deletion
        if (PID) {
            WishListItem.remove();
            deleteWishListItemFromDatabase(PID);
            
        } else {
            console.error('Failed to get product ID for deletion');
        }
    });
}

async function deleteWishListItemFromDatabase(pid) {
    try {
        const response = await fetch(`http://localhost:3001/wishlist-items/${pid}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete wishlist item');
        }

        console.log('Wishlist item deleted successfully');
        updateShoppingBagWishList();
    } catch (error) {
        console.error('Error deleting wishlist item:', error);
    }
}

updateShoppingBagIcon();
// Function to handle adding product to cart
async function addEventListenersToIcons(product) {
    const user1 = JSON.parse(sessionStorage.getItem('user'));
    if (!user1 || !user1.user || !user1.user.Mail) {
        console.error('User data not found');
        showAlert('User not logged in');
        return;
    }
  
    const userMail = user1.user.Mail;
    console.log('User mail:', userMail);
  
    const url = new URL('http://localhost:3001/cart');
    url.searchParams.append('username', userMail);
    url.searchParams.append('PID', product.PID);
    url.searchParams.append('Name', product.Name);
    url.searchParams.append('Price', product.Price);
    url.searchParams.append('Material', product.Material);
    url.searchParams.append('Weight', product.Weight);
    url.searchParams.append('Size', product.Size);
    url.searchParams.append('Image', product.Image);
    url.searchParams.append('Quantity', '1');
  
    try {
        const response = await fetch(url.toString(), {
            method: 'GET',
        });
  
        if (response.ok) {
            showAlert('Product added to cart successfully');
            console.log('Product added successfully:', product.Name);
            updateShoppingBagIcon();
        } else {
            showAlert('Failed to add product to cart');
            console.log('Failed to add product to cart:', product.Name);
        }
    } catch (error) {
        console.error('Error adding product to cart:', error);
        showAlert('Error adding product to cart');
    }
}
// UPDATE CÁI ICON CART
async function updateShoppingBagIcon() {
  const user1 = JSON.parse(sessionStorage.getItem('user'));
  const userMail = user1.user.Mail;
  console.log('user mail:', userMail);
    try {
        const response = await fetch('http://localhost:3001/cart-items');
        const data = await response.json();
        
        // Debugging step to inspect data structure
        console.log('Fetched data:', data);

        // Access the cartItems array within the fetched data
        const items = data.cartItems;

        if (Array.isArray(items)) {
            // Filter the items based on the allowed username
            const userItems = items.filter(item => item.username === userMail);

            // Calculate the total quantity of the filtered items
            let totalQuantity = 0;
            for (const item of userItems) {
                totalQuantity += item.Quantity;
            }

            // Debugging step to check total quantity
            console.log('Total quantity for user:', totalQuantity);

            // Update the shopping bag icon with the total quantity
            const headerShoppingBag = document.querySelector('.quanity');
            if (headerShoppingBag) {
                headerShoppingBag.textContent = totalQuantity;
            }
        } else {
          showAlert('Failed to add product to cart');
          console.log('Failed to add product to cart:', productName);
        }
      } catch (error) {
        console.error('Error adding product to cart:', error);
        showAlert('Error adding product to cart');
      }
}

// UPDATE WISHLIST ICON
async function updateShoppingBagWishList() {
    const user1 = JSON.parse(sessionStorage.getItem('user'));
    const userMail = user1.user.Mail;
    console.log('user mail:', userMail);
      try {
          const response = await fetch('http://localhost:3001/wishlist-items');
          const data = await response.json();
          
          // Debugging step to inspect data structure
          console.log('Fetched data:', data);
  
          // Access the WishListItems array within the fetched data
          const items = data.WishListItems;
  
          if (Array.isArray(items)) {
              // Filter the items based on the allowed username
              const userItems = items.filter(item => item.username === userMail);
  
              // Calculate the total quantity of the filtered items
              let totalQuantity = 0;
              for (const item of userItems) {
                  totalQuantity += item.Quantity;
              }
  
              // Debugging step to check total quantity
              console.log('Total quantity for user:', totalQuantity);
             // Update the wishlist header with the total quantity
             const wishlistHeader = document.querySelector('.wishlist__grid-wlHeader p');
            if (wishlistHeader) {
                wishlistHeader.textContent = `YOU HAVE ${totalQuantity} ITEMS SAVED`;
            }

              // Update the shopping bag icon with the total quantity
              const headerShoppingBag = document.querySelector('.quanityheart');
              if (headerShoppingBag) {
                  headerShoppingBag.textContent = totalQuantity;
              }
          } else {
            showAlert('Failed to add product to wishlist');
            console.log('Failed to add product to wishlist:', productName);
          }
        } catch (error) {
          console.error('Error adding product to wishlist:', error);
          showAlert('Error adding product to wishlist');
        }
  }
// Function to display alert message
function showAlert(message) {
alert(message);
}

// ------DAC -----

function navigateToProductDetailPage(product) {
    // Store the product information in local storage
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    // Redirect to the product detail page
    window.location.href = '../productdetails/productdetails.html'; // Replace 'product_detail_page.html' with your actual product detail page URL
  }