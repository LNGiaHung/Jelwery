document.addEventListener('DOMContentLoaded', () => {
  // Retrieve the stored product data from local storage
  const storedProduct = JSON.parse(localStorage.getItem('selectedProduct'));

  // Check if there is stored product data
  if (storedProduct) {
      // Update main product image
      const mainImg = document.getElementById('main-img');
      mainImg.src = storedProduct.Image;

      // Update product information in the right column
      document.querySelector('.column-right h2').innerText = storedProduct.Name;
      document.querySelector('.column-right h3:first-of-type').innerText = `ID: ${storedProduct.PID}`;
      document.querySelector('.column-right h3:last-of-type').innerText = `VND ${storedProduct.Price} (Reference)`;
      document.querySelectorAll('.column-right h4')[0].innerText = `Weight: ${storedProduct.Weight}`;
      document.querySelectorAll('.column-right h4')[1].innerText = `Stone: ${storedProduct.Stone}`;
      document.querySelectorAll('.column-right h4')[2].innerText = `Material: ${storedProduct.Material}`;
      document.querySelectorAll('.column-right h4')[3].innerText = `Size: ${storedProduct.Size}`;

      // Update option buttons
      const optionButtons = document.querySelectorAll('.option-btn');
      storedProduct.optionImages.forEach((image, index) => {
          optionButtons[index].dataset.image = image;
          optionButtons[index].style.backgroundImage = `url(${image})`;
      });

      // Example of adding event listeners to buttons
      optionButtons.forEach((button) => {
          button.addEventListener('click', () => {
              // Handle click event for option buttons
              // For example, change the main product image to the clicked option
              mainImg.src = button.dataset.image;
          });
      });

      // Example of adding event listener to "Add to Cart" button
      const addToCartButton = document.querySelector('.add');
      addToCartButton.addEventListener('click', () => {
          // Handle click event for "Add to Cart" button
          // For example, add the product to the shopping cart
      });

      // Example of adding event listener to "Buy Now" button
      const buyNowButton = document.querySelector('.buy');
      buyNowButton.addEventListener('click', () => {
          // Handle click event for "Buy Now" button
          // For example, redirect to the checkout page
      });
  } else {
      console.log("No product data found in local storage.");
  }
});
