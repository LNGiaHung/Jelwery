document.addEventListener('DOMContentLoaded', function() {
    // Get cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
    // Display cart items on the Cart page
    cartItems.forEach(function(productData) {
      const productName = productData.productName;
      const productPrice = productData.productPrice;
      const productImg = productData.productImg;
      const productQuantity = productData.productQuantity || 1;
  
      addCart(productPrice, productImg, productName, productQuantity);
    });
  });
  
  function addCart(productPrice, productImg, productName, productQuantity) {
    var cartItems = document.querySelectorAll("tbody tr");
  
    var tr = document.createElement("tr");
    var trContent = '<td style="display: flex; align-items: center;"><img style="width:70px" src="' + productImg + '" alt=""><span class="title">' + productName + '</span></td><td><p><span class="price">' + productPrice + '</span></p></td><td><input style="width: 30px; outline: none;" type="number" value="' + productQuantity + '" min="1"></td><td style="cursor: pointer;"><span class="cart_delete">Delete</span></td>';
    tr.innerHTML = trContent;
  
    var cartTable = document.querySelector("tbody");
    cartTable.appendChild(tr);
  
    // Lắng nghe sự kiện thay đổi số lượng
    var quantityInput = tr.querySelector("input");
    quantityInput.addEventListener("change", function(event) {
      cartTotal();
      saveCartItems();
    });
  
    cartTotal();
    deleteCart();
    saveCartItems();
  }
  
  function cartTotal() {
    var cartItems = document.querySelectorAll("tbody tr");
    var total = 0;
  
    for (var i = 0; i < cartItems.length; i++) {
      var inputValue = cartItems[i].querySelector("input").value;
      var productPrice = cartItems[i].querySelector(".price").innerText;
      productPrice = productPrice.replace("$", "");
      var subtotal = parseFloat(inputValue) * parseFloat(productPrice);
      total += subtotal;
    }
  
    var cartTotalElement = document.querySelector(".price-total span");
    cartTotalElement.innerHTML = "$" + total.toFixed(2);
  }
  
  function deleteCart() {
    var deleteButtons = document.querySelectorAll(".cart_delete");
  
    for (var i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].addEventListener("click", function(event) {
        var deleteButton = event.target;
        var cartItemRow = deleteButton.parentElement.parentElement;
        cartItemRow.remove();
  
        cartTotal();
        saveCartItems();
      });
    }
  }
  
  function saveCartItems() {
    var cartItems = document.querySelectorAll("tbody tr");
    var savedCartItems = [];
  
    for (var i = 0; i < cartItems.length; i++) {
      var productName = cartItems[i].querySelector(".title").innerText;
      var productPrice = cartItems[i].querySelector(".price").innerText;
      var productImg = cartItems[i].querySelector("img").getAttribute("src");
      var productQuantity = cartItems[i].querySelector("input").value;
  
      var productData = {
        productName: productName,
        productPrice: productPrice,
        productImg: productImg,
        productQuantity: productQuantity
      };
  
      savedCartItems.push(productData);
    }
  
    localStorage.setItem('cartItems', JSON.stringify(savedCartItems));
  }