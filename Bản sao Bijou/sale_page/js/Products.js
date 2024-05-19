// // Function to fetch data from the server and update HTML
// function fetchProductsAndUpdateHTML() {
//   return fetch('http://localhost:3001/products')
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then(data => {
//       // Update HTML with fetched data
//       updateHTMLWithProducts(data);
//     })
//     .catch(error => {
//       console.error('Error fetching data:', error);
//     });
// }

// // Function to update HTML with products data
// function updateHTMLWithProducts(products) {
//   const container = document.querySelector('.box-container');

//   // Clear existing HTML content
//   container.innerHTML = '';

//   // Iterate over each product and create HTML elements dynamically
//   products.forEach(product => {
//     const box = document.createElement('div');
//     box.classList.add('box');

//     // Add event listener to navigate to product detail page
//     box.addEventListener('click', () => {
//       // Assuming there's a function to navigate to the detail page
//       navigateToProductDetailPage(product.PID);
//     });

//     const discount = document.createElement('span');
//     discount.classList.add('discount');
//     discount.textContent = '15%';

//     const productDiv = document.createElement('div');
//     productDiv.classList.add('product1');

//     const img = document.createElement('img');
//     img.classList.add('product-img');
//     img.setAttribute('src', product.Image);
//     img.setAttribute('alt', '');

//     const iconsDiv = document.createElement('div');
//     iconsDiv.classList.add('icons');

//     const heartLink = document.createElement('a');
//     heartLink.setAttribute('href', '#');
//     heartLink.setAttribute('id', 'wish-list');
//     heartLink.classList.add('fa-solid', 'fa-heart');

//     const shoppingBagLink = document.createElement('a');
//     shoppingBagLink.setAttribute('href', '#');
//     shoppingBagLink.setAttribute('id', 'shopping-bag');
//     shoppingBagLink.classList.add('fa-solid', 'fa-shopping-bag');

//     const contentDiv = document.createElement('div');
//     contentDiv.classList.add('content');

//     const h3 = document.createElement('h3');
//     h3.textContent = product.Name;

//     const priceDiv = document.createElement('div');
//     priceDiv.classList.add('price');
//     priceDiv.innerHTML = `$${product.Price} <span>$${product.Price-product.Price*0.15}</span>`;

//     // Append elements to their respective parents
//     productDiv.appendChild(img);
//     productDiv.appendChild(iconsDiv);
//     iconsDiv.appendChild(heartLink);
//     iconsDiv.appendChild(shoppingBagLink);

//     contentDiv.appendChild(h3);
//     contentDiv.appendChild(priceDiv);

//     box.appendChild(discount);
//     box.appendChild(productDiv);
//     box.appendChild(contentDiv);

//     container.appendChild(box);
//   });
// }

// // Function to navigate to product detail page
// function navigateToProductDetailPage(productId) {
//   // Replace this with the code to navigate to the product detail page
//   console.log(`Navigating to product detail page for product with ID: ${productId}`);
// }

// // Call the fetchProductsAndUpdateHTML function when the script runs
// fetchProductsAndUpdateHTML();


////////////////
let selectedCategory = '';
let selectedMaterialType = '';

// Function to initialize dropdown event listeners and set selected values
const initializeDropdowns = () => {
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(dropdown => {
    dropdown.querySelectorAll('.menu li').forEach(item => {
      item.addEventListener('click', () => {
        const categoryText = dropdown.querySelector('.select .selected').innerText.toLowerCase();

        if (['rings', 'earrings', 'bracelets', 'necklaces'].includes(categoryText)) {
          selectedCategory = categoryText;
          console.log(selectedCategory); 
        }

        const materialMatch = item.innerText.match(/\d+k/i);
        if (materialMatch) {
          selectedMaterialType = materialMatch[0].toUpperCase();
          console.log(selectedMaterialType); 
        }

        // Determine which function to call based on the selected category
        const { category } = getCategoryAndMaterialType();
        if (!category) {
          fetchProductsAndUpdateHTML();
        } else {
          fetchProductsAndUpdateHTMLWithCategory();
        }
      });
    });
  });
};

// Function to get the selected category and material type
const getCategoryAndMaterialType = () => {
  return { category: selectedCategory, materialType: selectedMaterialType };
};

// Function to fetch products from the API and update HTML
const fetchProductsAndUpdateHTMLWithCategory = async () => {
  const { category, materialType } = getCategoryAndMaterialType();

  if (!category || !materialType) {
    console.error('Invalid category or material type');
    return;
  }

  try {
    console.log("fetch"); 
    const response = await fetch(`http://localhost:3001/Products/byCategory/${category}/${materialType}`);
    const products = await response.json();
    console.log("product"); 
    console.log(products); 

    if (response.ok) {
      updateHTMLWithProducts(products); 
    } else {
      console.error('Error:', products.error);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

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
}


// Function to navigate to product detail page
function navigateToProductDetailPage(productId) {
  // Replace this with the code to navigate to the product detail page
  console.log(`Navigating to product detail page for product with ID: ${productId}`);
}

// Initialize dropdowns when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeDropdowns);

fetchProductsAndUpdateHTML();