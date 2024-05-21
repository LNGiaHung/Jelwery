// Function to fetch data from the server and update HTML
function fetchProductsAndUpdateHTML() {
  return fetch('http://localhost:3001/Products')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Update HTML with fetched data
      updateHTMLWithProducts(data);
        // Add event listeners to the new elements
        addEventListenersToIcons();
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

// Function to update HTML with products data
function updateHTMLWithProducts(products) {
  const container = document.querySelector('.box-container');

  // Clear existing HTML content
  container.innerHTML = '';

  if (products.length === 0) {
    const noProductsMessage = document.createElement('p');
    noProductsMessage.textContent = "There's nothing here.";
    container.appendChild(noProductsMessage);
  } else {
    // Iterate over each product and create HTML elements dynamically
    products.forEach(product => {
      const colDiv = document.createElement('div');
      colDiv.classList.add('grid__col-3');

    const box = document.createElement('div');
    box.classList.add('box');
    

      const discount = document.createElement('span');
      discount.classList.add('discount');
      discount.textContent = '10%';

      const productDiv = document.createElement('div');
      productDiv.classList.add('product1');

      const productImgDiv = document.createElement('div');
      productImgDiv.classList.add('product1__img');
      productImgDiv.style.backgroundImage = `url(${product.Image})`;
      productImgDiv.addEventListener('click', () => {
        navigateToProductDetailPage(product);
      });

      const iconsDiv = document.createElement('div');
      iconsDiv.classList.add('icons');

      const heartLink = document.createElement('a');
      heartLink.setAttribute('href', '#');
      heartLink.setAttribute('id', 'wish-list');
      heartLink.classList.add('fa-solid', 'fa-heart');

      const shoppingBagLink = document.createElement('a');
      shoppingBagLink.setAttribute('href', '#');
      shoppingBagLink.setAttribute('id', 'shopping-bag');
      shoppingBagLink.classList.add('fa-solid', 'fa-shopping-bag');

      const contentDiv = document.createElement('div');
      contentDiv.classList.add('content');

      const h3 = document.createElement('h3');
      h3.innerHTML = `<a href="#">${product.Name}</a>`;
      h3.addEventListener('click', () => {
        navigateToProductDetailPage(product);
      });

      const priceDiv = document.createElement('div');
      priceDiv.classList.add('price');
      priceDiv.innerHTML = `$${product.Price} <span>$${product.Price - product.Price * 0.1}</span>`;

      // Append elements to their respective parents
      productDiv.appendChild(productImgDiv);
      productDiv.appendChild(iconsDiv);
      iconsDiv.appendChild(heartLink);
      iconsDiv.appendChild(shoppingBagLink);

      contentDiv.appendChild(h3);
      contentDiv.appendChild(priceDiv);

      box.appendChild(discount);
      box.appendChild(productDiv);
      box.appendChild(contentDiv);

      colDiv.appendChild(box);
      container.appendChild(colDiv);
    });
  }
}


// ------ DAC ------
 // Function to add event listeners to the icons
 function addEventListenersToIcons() {
    const icons = document.querySelectorAll('.grid__col-3 .box .product1 .icons a');
    icons.forEach(icon => {
      icon.addEventListener('click', async (event) => {
        if (event.target.id === 'shopping-bag') {
          console.log('Shopping bag button clicked');
          event.preventDefault();
  
          const button = event.target;
          const product = button.closest('.box');
          const productImgElement = product.querySelector('.product1__img');
          const productName = product.querySelector('.content h3').innerText;
          // Select only the first price
          const priceElement = product.querySelector('.price');
          const priceText = priceElement.firstChild.textContent.trim();
          const productPrice = priceText.split(' ')[0];
  
          console.log('Adding product to cart:', productName, 'with price', productPrice);
  
          const backgroundImage = getComputedStyle(productImgElement).backgroundImage;
          const productImg = backgroundImage.slice(5, -2);
  
          console.log('Product image URL:', productImg);
  
          const url = new URL('http://localhost:3001/cart');
          url.searchParams.append('username', 'user123');
          url.searchParams.append('Name', productName);
          url.searchParams.append('Price', productPrice);
          url.searchParams.append('Image', productImg);
          url.searchParams.append('Quantity', '1');
  
          try {
            const response = await fetch(url.toString(), {
              method: 'GET',
            });
  
            if (response.ok) {
              showAlert('Product added to cart successfully');
              console.log('Product added successfully:', productName);
            } else {
              showAlert('Failed to add product to cart');
              console.log('Failed to add product to cart:', productName);
            }
          } catch (error) {
            console.error('Error adding product to cart:', error);
            showAlert('Error adding product to cart');
          }
        }
      });
    });
  }
  
  // Function to display alert message
  function showAlert(message) {
    alert(message);
  }
  
  // Call the fetchProductsAndUpdateHTML function when the DOM is loaded
  document.addEventListener('DOMContentLoaded', fetchProductsAndUpdateHTML);

  // -------- DAC-------

// Function to navigate to product detail page
function navigateToProductDetailPage(product) {
  // Store the product information in local storage
  localStorage.setItem('selectedProduct', JSON.stringify(product));
  // Redirect to the product detail page
  window.location.href = 'http://127.0.0.1:5501/B%E1%BA%A3n%20sao%20Bijou/productdetails/productdetails.html'; // Replace 'product_detail_page.html' with your actual product detail page URL
}


document.addEventListener('DOMContentLoaded', (event) => {
  fetchProductsAndUpdateHTML();
});
