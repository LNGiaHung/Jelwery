let selectedCategory = "";
let selectedMaterialType = "";
// -------Category - Kim Long ---------

const fetchProductsAndUpdateHTMLWithCategory = async () => {
  if (!selectedCategory || !selectedMaterialType) {
    console.error("Invalid category or material type");
    return;
  }

  try {
    console.log("Fetching products..."); // Debugging log
    const response = await fetch(
      `http://localhost:3001/Products/byCategory/${selectedCategory}/${selectedMaterialType}`
    );
    const products = await response.json();
    console.log("Fetched Products:", products); // Debugging log

    if (response.ok) {
      updateHTMLWithProducts(products);
    } else {
      console.error("Error:", products.error);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// const initializeDropdowns = () => {
//   const dropdowns = document.querySelectorAll(".dropdown");

//   dropdowns.forEach((dropdown) => {
//     const select = dropdown.querySelector(".select");
//     const menu = dropdown.querySelector(".menu");
//     const selected = dropdown.querySelector(".selected");

//     select.addEventListener("click", () => {
//       menu.classList.toggle("show");
//     });

//     menu.querySelectorAll("li").forEach((item) => {
//       item.addEventListener("click", () => {
//         selected.innerText = item.innerText;
//         menu.classList.remove("show");

//         const parentCategoryText = dropdown
//           .querySelector(".select .selected")
//           .innerText.toLowerCase();
//         const selectedText = item.innerText.toLowerCase();
//         console.log("Selected parentCategoryText:", parentCategoryText);
//         // Check if the selected item is a parent category
//         const possibleCategories = [
//           "collections",
//           "rings",
//           "earrings",
//           "bracelets",
//           "necklaces",
//         ];
//         for (const a of possibleCategories) {
//           console.log("Selected possibleCategories:", a);
//           if (parentCategoryText.includes(a)) {
//             if (a === "collections") {
//               selectedCategory = "new-in";
//             } else {
//               selectedCategory = a;
//             }
//           }
//         }
//         console.log("Selected Category:", selectedCategory);
//         // Check if the selected item is a material type
//         const possibleMaterial = ["10k", "14k", "18k", "24k"];
//         const possibleCollection = [
//           "outstanding collections",
//           "new collections",
//           "wedding collections",
//         ];
//         if (selectedCategory != "new-in") {
//           for (const a of possibleMaterial) {
//             console.log("Selected possibleMaterial:", a);
//             if (parentCategoryText.includes(a)) {
//               selectedMaterialType = a;
//             }
//           }
//         } else {
//           for (const a of possibleCollection) {
//             console.log("Selected possibleCollection:", a);
//             if (parentCategoryText.includes(a)) {
//               selectedMaterialType = a;
//             }
//           }
//         }

//         // Debugging logs to check the selected values
//         console.log("Selected Category:", selectedCategory);
//         console.log("Selected Material Type:", selectedMaterialType);

//         // Call the API with the selected values
//         if (!selectedCategory) {
//           fetchProductsAndUpdateHTML();
//         } else {
//           fetchProductsAndUpdateHTMLWithCategory();
//         }
//       });
//     });
//   });
// };

const initializeDropdowns = () => {
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    const select = dropdown.querySelector(".select");
    const menu = dropdown.querySelector(".menu");
    const selected = dropdown.querySelector(".selected");

    select.addEventListener("click", () => {
      menu.classList.toggle("show");
    });

    menu.querySelectorAll("li").forEach((item) => {
      item.addEventListener("click", () => {
        selected.innerText = item.innerText;
        menu.classList.remove("show");

        const parentCategoryText = dropdown.querySelector(".select .selected").innerText.toLowerCase();
        const selectedText = item.innerText.toLowerCase();

        // Check if the selected item is a parent category
        const possibleCategories = ["collections", "rings", "earrings", "bracelets", "necklaces"];
        if (parentCategoryText.includes("collections")) {
          selectedCategory = "new-in";
        } else {
          for (const category of possibleCategories) {
            if (parentCategoryText.includes(category)) {
              selectedCategory = category;
              break;
            }
          }
        }

        // Check if the selected item is a material type or a collection type
        if (selectedCategory === "new-in") {
          const possibleCollection = ["outstanding collections", "new collections", "wedding collections"];
          for (const collection of possibleCollection) {
            if (selectedText.includes(collection)) {
              selectedMaterialType = collection;
              break;
            }
          }
        } else {
          const possibleMaterial = ["10k", "14k", "18k", "24k"];
          for (const material of possibleMaterial) {
            if (selectedText.includes(material)) {
              selectedMaterialType = material;
              break;
            }
          }
        }

        // Debugging logs to check the selected values
        console.log("Selected Category:", selectedCategory);
        console.log("Selected Material Type:", selectedMaterialType);

        // Call the appropriate API function
        if (!selectedCategory) {
          fetchProductsAndUpdateHTML();
        } else {
          fetchProductsAndUpdateHTMLWithCategory(selectedCategory, selectedMaterialType);
        }
      });
    });
  });
};

document.addEventListener("DOMContentLoaded", (event) => {
  const loveEngagementLink = document.getElementById("love-engagement-link");

  loveEngagementLink.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent the default link behavior
    console.log("add addEventListener");
    fetchProductsWithWInPid();
  });

  function fetchProductsWithWInPid() {
    console.log("fetchProductsWithWInPid...");
    fetch("http://localhost:3001/Products/inPid/W")
      .then((response) => response.json())
      .then((products) => {
        updateHTMLWithProducts(products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }
});

// -------END: Category - Kim Long ---------

// Function to fetch data from the server and update HTML
function fetchProductsAndUpdateHTML() {
  // console.log("add even keyWord");
  // Get the search keyword from sessionStorage
  const keyWord = JSON.parse(sessionStorage.getItem("searchKeyword"));
  const selectedCategory = JSON.parse(sessionStorage.getItem("selectedCategory"));
  const selectedStone = JSON.parse(sessionStorage.getItem("selectedStone"));
  const selectedEngagementAndWedding = JSON.parse(sessionStorage.getItem("selectedEngagementAndWedding"));
  const selectedCollection = JSON.parse(sessionStorage.getItem("collection"));
  const selectedMetal = JSON.parse(sessionStorage.getItem("selectedMetal"));
  // console.log("keyWord.searchKeyword: ", keyWord);
  // console.log("selectedNavigate: ", selectedCategory);
  // console.log("selectedEngagementAndWedding: ", selectedEngagementAndWedding);
  console.log("selectedCollection: ", selectedCollection);
  // console.log("selectedMetal: ", selectedMetal);
  if (keyWord !== null) {
    // Fetch products by name
    fetch(
      `http://localhost:3001/Products/inName/${encodeURIComponent(keyWord)}`
    )
      .then((response) => response.json())
      .then((products) => {
        updateHTMLWithProducts(products);
        sessionStorage.setItem("searchKeyword", null);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  } else if(selectedCategory !== null){
// Fetch products by category
  const category = encodeURIComponent(selectedCategory); // Ensure category is URL-safe
  const materialType = "all"; // Replace with actual material type or logic to determine it

  fetch(`http://localhost:3001/Products/byCategory/${category}/${materialType}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((products) => {
      updateHTMLWithProducts(products);
      sessionStorage.setItem("selectedCategory", null);
    })
    .catch((error) => {
      console.error("Error fetching products by category:", error);
    });
  }else if(selectedMetal !== null){
    const metal =encodeURIComponent(selectedMetal);

    fetch(`http://localhost:3001/Products/byCategoryName/${metal}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((products) => {
        updateHTMLWithProducts(products);
        sessionStorage.setItem("selectedMetal",null);
      })
      .catch((error) => {
        console.error("Error fetching products by metal:", error);
      });
  }else if(selectedStone !== null){
    const stone =encodeURIComponent(selectedStone); // Ensure category is URL-safe

    fetch(`http://localhost:3001/Products/byStone/${stone}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((products) => {
        updateHTMLWithProducts(products);
        sessionStorage.setItem("selectedStone",null);
      })
      .catch((error) => {
        console.error("Error fetching products by stone:", error);
      });
  }else if(selectedEngagementAndWedding!==null){
    const engagementAndWedding=encodeURIComponent(selectedEngagementAndWedding);

    fetch(`http://localhost:3001/Products/inName/${engagementAndWedding}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((products) => {
        updateHTMLWithProducts(products);
        sessionStorage.setItem("selectedEngagementAndWedding",null);
      })
      .catch((error) => {
        console.error("Error fetching products by Engagement And Wedding:", error);
      });
  }else if(selectedCollection!==null){
    const collection=encodeURIComponent(selectedCollection);

    fetch(`http://localhost:3001/Products/byCollection/${collection}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((products) => {
        updateHTMLWithProducts(products);
        sessionStorage.setItem("collection",null);
      })
      .catch((error) => {
        console.error("Error fetching products by collection:", error);
      });
  }else {
    return fetch("http://localhost:3001/Products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Update HTML with fetched data
        console.log("product fetch 1");
        updateHTMLWithProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  // sessionStorage.setItem("selectedMetal",null);
}

// Function to update HTML with products data
function updateHTMLWithProducts(products) {
  console.log("product display");
  const container = document.querySelector(".box-container");

  // Clear existing HTML content
  container.innerHTML = "";

  if (products.length === 0) {
    const noProductsMessage = document.createElement("p");
    noProductsMessage.textContent = "There's nothing here.";
    container.appendChild(noProductsMessage);
  } else {
    // Iterate over each product and create HTML elements dynamically
    products.forEach((product) => {
      const colDiv = document.createElement("div");
      colDiv.classList.add("grid__col-3");

      const box = document.createElement("div");
      box.classList.add("box");

      const discount = document.createElement("span");
      discount.classList.add("discount");
      discount.textContent = "10%";

      const productDiv = document.createElement("div");
      productDiv.classList.add("product1");

      const productImgDiv = document.createElement("div");
      productImgDiv.classList.add("product1__img");
      productImgDiv.style.backgroundImage = `url(${product.Image})`;
      productImgDiv.addEventListener("click", () => {
        navigateToProductDetailPage(product);
      });

      const iconsDiv = document.createElement("div");
      iconsDiv.classList.add("icons");

      const heartLink = document.createElement("a");
      heartLink.setAttribute("href", "#");
      heartLink.setAttribute("id", "wish-list");
      heartLink.classList.add("fa-solid", "fa-heart");
      // Dac
      heartLink.addEventListener("click", () => {
        addEventListenersToWishList(product);
      });
      // Dac
      const shoppingBagLink = document.createElement("a");
      shoppingBagLink.setAttribute("href", "#");
      shoppingBagLink.setAttribute("id", "shopping-bag");
      shoppingBagLink.classList.add("fa-solid", "fa-shopping-bag");
      // Dac
      shoppingBagLink.addEventListener("click", () => {
        addEventListenersToIcons(product);
      });
      // Dac
      const contentDiv = document.createElement("div");
      contentDiv.classList.add("content");

      const h3 = document.createElement("h3");
      h3.innerHTML = `<a href="#">${product.Name}</a>`;
      h3.addEventListener("click", () => {
        navigateToProductDetailPage(product);
      });

      const priceDiv = document.createElement("div");
      priceDiv.classList.add("price");
      priceDiv.innerHTML = `${product.Price} vnđ <span>${
        product.Price - product.Price * 0.1
      } vnđ</span>`;

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
// <<<<<<< Giang
//  function addEventListenersToIcons() {
//     const icons = document.querySelectorAll('.grid__col-3 .box .product1 .icons a');
//     icons.forEach(icon => {
//       icon.addEventListener('click', async (event) => {
//         if (event.target.id === 'shopping-bag') {
//           console.log('Shopping bag button clicked');
//           event.preventDefault();

//           const button = event.target;
//           const product = button.closest('.box');
//           const productImgElement = product.querySelector('.product1__img');
//           const productName = product.querySelector('.content h3').innerText;
//           // Select only the first price
//           const priceElement = product.querySelector('.price');
//           const priceText = priceElement.firstChild.textContent.trim();
//           const productPrice = priceText.split(' ')[0];

//           console.log('Adding product to cart:', productName, 'with price', productPrice);

//           const backgroundImage = getComputedStyle(productImgElement).backgroundImage;
//           const productImg = backgroundImage.slice(5, -2);

//           console.log('Product image URL:', productImg);

//           const url = new URL('http://localhost:3001/cart');
//           url.searchParams.append('username', 'user123');
//           url.searchParams.append('Name', productName);
//           url.searchParams.append('Price', productPrice);
//           url.searchParams.append('Image', productImg);
//           url.searchParams.append('Quantity', '1');

//           try {
//             const response = await fetch(url.toString(), {
//               method: 'GET',
//             });

//             if (response.ok) {
//               showAlert('Product added to cart successfully');
//               console.log('Product added successfully:', productName);
// =======
// -------------------_CART (DAC)----------------------------------------
updateShoppingBagIcon();
// Function to add event listeners and handle adding product to cart
async function addEventListenersToIcons(product) {
  const user1 = JSON.parse(sessionStorage.getItem("user"));
  if (!user1 || !user1.user || !user1.user.Mail) {
    console.error("User data not found");
    showAlert("User not logged in");
    return;
  }

  const userMail = user1.user.Mail;
  console.log("User mail:", userMail);

  const url = new URL("http://localhost:3001/cart");
  url.searchParams.append("username", userMail);
  url.searchParams.append("PID", product.PID);
  url.searchParams.append("Name", product.Name);
  url.searchParams.append("Price", product.Price);
  url.searchParams.append("Material", product.Material);
  url.searchParams.append("Weight", product.Weight);
  url.searchParams.append("Size", product.Size);
  url.searchParams.append("Image", product.Image);
  url.searchParams.append("Quantity", "1");

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
    });

    if (response.ok) {
      showAlert("Product added to cart successfully");
      console.log("Product added successfully:", product.Name);
      updateShoppingBagIcon();
    } else {
      showAlert("Failed to add product to cart");
      console.log("Failed to add product to cart:", product.Name);
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
    showAlert("Error adding product to cart");
  }
}

// Dummy functions to mimic actual functionality
function showAlert(message) {
  console.log("Alert:", message);
}

function updateShoppingBagIcon() {
  console.log("Updating shopping bag icon");
}

async function updateShoppingBagIcon() {
  const user1 = JSON.parse(sessionStorage.getItem("user"));
  const userMail = user1.user.Mail;
  console.log("user mail:", userMail);
  try {
    const response = await fetch("http://localhost:3001/cart-items");
    const data = await response.json();

    // Debugging step to inspect data structure
    console.log("Fetched data:", data);

    // Access the cartItems array within the fetched data
    const items = data.cartItems;

    if (Array.isArray(items)) {
      // Filter the items based on the allowed username
      const userItems = items.filter((item) => item.username === userMail);

      // Calculate the total quantity of the filtered items
      let totalQuantity = 0;
      for (const item of userItems) {
        totalQuantity += item.Quantity;
      }

      // Debugging step to check total quantity
      console.log("Total quantity for user:", totalQuantity);

      // Update the shopping bag icon with the total quantity
      const headerShoppingBag = document.querySelector(".quanity");
      if (headerShoppingBag) {
        headerShoppingBag.textContent = totalQuantity;
      }
    } else {
      showAlert("Failed to add product to cart");
      console.log("Failed to add product to cart:", productName);
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
    showAlert("Error adding product to cart");
  }
}

// Function to display alert message
function showAlert(message) {
  alert(message);
}

// Call the fetchProductsAndUpdateHTML function when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  fetchProductsAndUpdateHTML();
});
// -----------------------_CART DAC ------------------------

// -----------------------_WISHLIST DAC------------------------
updateShoppingBagWishList();
// Function to add event listeners and handle adding product to wishlist
async function addEventListenersToWishList(product) {
  const user1 = JSON.parse(sessionStorage.getItem("user"));
  if (!user1 || !user1.user || !user1.user.Mail) {
    console.error("User data not found");
    showAlert("User not logged in");
    return;
  }

  const userMail = user1.user.Mail;
  console.log("User mail:", userMail);

  const url = new URL("http://localhost:3001/wishlist");
  url.searchParams.append("username", userMail);
  url.searchParams.append("PID", product.PID);
  url.searchParams.append("Name", product.Name);
  url.searchParams.append("Price", product.Price);
  url.searchParams.append("Material", product.Material);
  url.searchParams.append("Weight", product.Weight);
  url.searchParams.append("Size", product.Size);
  url.searchParams.append("Image", product.Image);
  url.searchParams.append("Quantity", "1");

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
    });

    if (response.ok) {
      // showAlert('Product added to wishlist successfully');
      console.log("Product added successfully:", product.Name);
      updateShoppingBagWishList();
    } else {
      // showAlert('Failed to add product to wishlist');
      console.log("Failed to add product to wishlist:", product.Name);
    }
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
    //   showAlert('Error adding product to wishlist');
  }
}

async function updateShoppingBagWishList() {
  const user1 = JSON.parse(sessionStorage.getItem("user"));
  const userMail = user1.user.Mail;
  console.log("user mail:", userMail);
  try {
    const response = await fetch("http://localhost:3001/wishlist-items");
    const data = await response.json();

    // Debugging step to inspect data structure
    console.log("Fetched data:", data);

    // Access the WishListItems array within the fetched data
    const items = data.WishListItems;

    if (Array.isArray(items)) {
      // Filter the items based on the allowed username
      const userItems = items.filter((item) => item.username === userMail);

      // Calculate the total quantity of the filtered items
      let totalQuantity = 0;
      for (const item of userItems) {
        totalQuantity += item.Quantity;
      }

      // Debugging step to check total quantity
      console.log("Total quantity for user:", totalQuantity);

      // Update the shopping bag icon with the total quantity
      const headerShoppingBag = document.querySelector(".quanityheart");
      if (headerShoppingBag) {
        headerShoppingBag.textContent = totalQuantity;
      }
    } else {
      showAlert("Failed to add product to wishlist");
      console.log("Failed to add product to wishlist:", productName);
    }
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
    showAlert("Error adding product to wishlist");
  }
}

// Function to display alert message
function showAlert(message) {
  alert(message);
}

// Call the fetchProductsAndUpdateHTML function when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  fetchProductsAndUpdateHTML();
});
// --------------------------_WISHLIST DAC -------------------------
// -------- End DAC----------------------------_END---------------------------

// Function to navigate to product detail page
function navigateToProductDetailPage(product) {
  // Store the product information in local storage
  localStorage.setItem("selectedProduct", JSON.stringify(product));
  // Redirect to the product detail page
  window.location.href = "../productdetails/productdetails.html"; // Replace 'product_detail_page.html' with your actual product detail page URL
}

document.addEventListener("DOMContentLoaded", (event) => {
  console.log("add even fetchProductsAndUpdateHTML");
  fetchProductsAndUpdateHTML();
});

document.addEventListener("DOMContentLoaded", (event) => {
  console.log("add even initializeDropdowns");
  initializeDropdowns();
});
