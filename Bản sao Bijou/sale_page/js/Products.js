// Function to fetch data from the server and update HTML
function fetchProductsAndUpdateHTML() {
  return fetch('http://localhost:3001/products')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Update HTML with fetched data
      updateHTMLWithProducts(data);
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

  // Iterate over each product and create HTML elements dynamically
  products.forEach(product => {
    const box = document.createElement('div');
    box.classList.add('box');

    // Add event listener to navigate to product detail page
    box.addEventListener('click', () => {
      // Assuming there's a function to navigate to the detail page
      navigateToProductDetailPage(product.PID);
    });

    const discount = document.createElement('span');
    discount.classList.add('discount');
    discount.textContent = '15%';

    const productDiv = document.createElement('div');
    productDiv.classList.add('product1');

    const img = document.createElement('img');
    img.classList.add('product-img');
    img.setAttribute('src', product.Image);
    img.setAttribute('alt', '');

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
    h3.textContent = product.Name;

    const priceDiv = document.createElement('div');
    priceDiv.classList.add('price');
    priceDiv.innerHTML = `$${product.Price} <span>$${product.Price-product.Price*0.15}</span>`;

    // Append elements to their respective parents
    productDiv.appendChild(img);
    productDiv.appendChild(iconsDiv);
    iconsDiv.appendChild(heartLink);
    iconsDiv.appendChild(shoppingBagLink);

    contentDiv.appendChild(h3);
    contentDiv.appendChild(priceDiv);

    box.appendChild(discount);
    box.appendChild(productDiv);
    box.appendChild(contentDiv);

    container.appendChild(box);
  });
}

// Function to navigate to product detail page
function navigateToProductDetailPage(productId) {
  // Replace this with the code to navigate to the product detail page
  console.log(`Navigating to product detail page for product with ID: ${productId}`);
}

// Call the fetchProductsAndUpdateHTML function when the script runs
fetchProductsAndUpdateHTML();
