try{
    const user1 = JSON.parse(sessionStorage.getItem('user'));
    const userMail = user1.user.Mail;
    console.log('user mail:', userMail);
}catch(e){
    console.log(sessionStorage.getItem('user'));
    console.log('user is not logged in');
}

document.addEventListener('DOMContentLoaded', () => {

    const storedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
    console.log('productdetail');
    if (storedProduct) {
        // Update main product image
        const mainImg = document.getElementById('main-img');
        mainImg.src = storedProduct.Image;

        // Update product information in the right column
        document.querySelector('.product__atrribute-name').innerText = storedProduct.Name;
        document.querySelector('.product__atrribute-ID').innerText = `ID: ${storedProduct.PID}`;
        document.querySelector('.product__atrribute-price').innerText = `VND ${storedProduct.Price} (Reference)`;
        document.querySelector('.product__atrribute-weight').innerText = `Weight: ${storedProduct.Weight}`;
        document.querySelector('.product__atrribute-stone').innerText = `Stone: ${storedProduct.Stone}`;
        document.querySelector('.product__atrribute-material').innerText = `Material: ${storedProduct.Material}`;
        document.querySelector('.product__atrribute-size').innerText = `Size: ${storedProduct.Size}`;
        document.querySelector('.description-product-name').innerText = `Product Name: ${storedProduct.Name}`;
        // document.querySelector('.description-content').innerText = `Product Name: ${storedProduct.Name}`;

         // Function to update the shopping bag icon with the number of items
        async function updateShoppingBagIcon() {
            if(sessionStorage.getItem('user')!==null){try {
                const user1 = JSON.parse(sessionStorage.getItem('user'));
                const userMail = user1.user.Mail;
                const response = await fetch('http://localhost:3001/cart-items');
                const data = await response.json();

                console.log('Fetched data:', data); // Debugging step to inspect data structure

                // Access the cartItems array within the fetched data
                const items = data.cartItems;
                if (Array.isArray(items)) {
                    const userItems = items.filter(item => item.username === userMail);

                    // Calculate the total quantity of the filtered items
                    let totalQuantity = 0;
                    for (const item of userItems) {
                        totalQuantity += item.Quantity;
                    }
                    console.log('totalQuantity:', totalQuantity); // Debugging step to check total quantity

                    const shoppingBagIcon = document.querySelector('.header__navbar-item .quanity');
                    if (shoppingBagIcon) {
                        shoppingBagIcon.textContent = totalQuantity;
                    }
                } else {
                    console.error('cartItems is not an array:', items);
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }}
        }

        // Add event listener to "Add to Cart" button
        const addToCartButton = document.querySelector('.add');
        if (addToCartButton) {
            if(sessionStorage.getItem('user')!==null){
                const user1 = JSON.parse(sessionStorage.getItem('user'));
                const userMail = user1.user.Mail;
                updateShoppingBagIcon();
                console.log("Add to Cart button found");
                addToCartButton.addEventListener('click', async () => {
                    console.log("Add to Cart button clicked");
                    const url = new URL('http://localhost:3001/cart');
                    url.searchParams.append('username', userMail);
                    url.searchParams.append('PID', storedProduct.PID);
                    url.searchParams.append('Name', storedProduct.Name);
                    url.searchParams.append('Price', storedProduct.Price);
                    url.searchParams.append('Material', storedProduct.Material);
                    url.searchParams.append('Weight', storedProduct.Weight);
                    url.searchParams.append('Size', storedProduct.Size);
                    url.searchParams.append('Image', storedProduct.Image);
                    url.searchParams.append('Quantity', '1');

                    try {
                        const response = await fetch(url.toString(), {
                            method: 'GET',
                        });

                        if (response.ok) {
                            showAlert('Product added to cart successfully');
                            updateShoppingBagIcon();
                            console.log('Product added successfully:', storedProduct.Name);
                        } else {
                            showAlert('Failed to add product to cart');
                            console.log('Failed to add product to cart:', storedProduct.Name);
                        }
                    } catch (error) {
                        console.error('Error adding product to cart:', error);
                        showAlert('Error adding product to cart');
                    }
                });
            }else{
                console.log("User not logged in");
            }
        } else {
            console.error("Add to Cart button not found");
        }
        updateShoppingBagWishList();
        // UPDATE WISLIST ICON 
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

       

        // Update option buttons
        const optionButtons = document.querySelectorAll('.option-btn');
        const images = [
            `${storedProduct.Image}`,
            `${storedProduct.Image1}`,
            `${storedProduct.Image2}`,
            `${storedProduct.Image3}`
        ];

        optionButtons.forEach((button, index) => {
            button.style.backgroundImage = `url('${images[index]}')`;
            button.dataset.image = `${images[index]}`;
        });

        // Add event listeners to option buttons to change the main product image
        optionButtons.forEach((button) => {
            button.addEventListener('click', () => {
                mainImg.src = button.dataset.image;
            });
        });


        // Add event listener to "Buy Now" button
        const buyNowButton = document.querySelector('.buy a');
        if (buyNowButton) {
            if(sessionStorage.getItem('user')!==null){
                buyNowButton.addEventListener('click', () => {
                    // Redirect to the checkout page
                    window.location.href = buyNowButton.href;
                });
            }else{
                buyNowButton.addEventListener('click', () => {
                    // Redirect to the checkout page
                    window.location.href = '#';
                    console.log("User not logged in");
                });                
            }
        }
    } else {
        console.log("No product data found in local storage.");
    }
});

// Function to display alert message
function showAlert(message) {
    alert(message);
}
