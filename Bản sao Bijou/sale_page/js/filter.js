// import updateHTMLWithProducts from './Products.js'
// import fetchProductsAndUpdateHTML from './Products.js'

// let selectedCategory = '';
// let selectedMaterialType = '';

// // Function to fetch products from the API and update HTML with category and material type
// const fetchProductsAndUpdateHTMLWithCategory = async () => {
//     const { category, materialType } = getCategoryAndMaterialType();
  
//     if (!category || !materialType) {
//       console.error('Invalid category or material type');
//       return;
//     }
  
//     try {
//       console.log('Fetching products...'); // Debugging log
//       const response = await fetch(`http://localhost:3001/Products/byCategory/${category}/${materialType}`);
//       const products = await response.json();
//       console.log('Fetched Products:', products); // Debugging log
  
//       if (response.ok) {
//         console.log('product fetch 2');
//         updateHTMLWithProducts(products);
//         addEventListenersToIcons();
//       } else {
//         console.error('Error:', products.error);
//       }
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };


//   export const initializeDropdowns = () => {
//     const dropdowns = document.querySelectorAll('.dropdown');
  
//     dropdowns.forEach(dropdown => {
//       dropdown.querySelector('.select').addEventListener('click', () => {
//         dropdown.querySelector('.menu').classList.toggle('show');
//       });
  
//       dropdown.querySelectorAll('.menu li').forEach(item => {
//         item.addEventListener('click', () => {
//           dropdown.querySelector('.selected').innerText = item.innerText;
//           dropdown.querySelector('.menu').classList.remove('show');
  
//           const categoryText = dropdown.querySelector('.select .selected').innerText.toLowerCase();
  
//           if (['new-in', 'rings', 'earrings', 'bracelets', 'necklaces'].includes(categoryText)) {
//             selectedCategory = categoryText;
//             console.log('Selected Category:', selectedCategory); // Debugging log
//           }
  
//           const materialMatch = item.innerText.match(/\d+k/i);
//           if (materialMatch) {
//             selectedMaterialType = materialMatch[0].toUpperCase();
//             console.log('Selected Material Type:', selectedMaterialType); // Debugging log
//           }
  
//           // Determine which function to call based on the selected category
//           if (!selectedCategory) {
//             fetchProductsAndUpdateHTML();
//           } else {
//             fetchProductsAndUpdateHTMLWithCategory();
//           }
//         });
//       });
//     });
//   };
  
  // document.addEventListener('DOMContentLoaded', (event) => {
  //   console.log('add even initializeDropdowns');
  //   initializeDropdowns();
  // });

  // export {initializeDropdowns};