

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
    const colDiv = document.createElement('div');
    colDiv.classList.add('grid__col-3');

    const box = document.createElement('div');
    box.classList.add('box');
    box.addEventListener('click', () => {
      navigateToProductDetailPage(product);
    });

    const discount = document.createElement('span');
    discount.classList.add('discount');
    discount.textContent = '10%';

    const productDiv = document.createElement('div');
    productDiv.classList.add('product1');

    const productImgDiv = document.createElement('div');
    productImgDiv.classList.add('product1__img');
    productImgDiv.style.backgroundImage = `url(${product.Image})`;

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
