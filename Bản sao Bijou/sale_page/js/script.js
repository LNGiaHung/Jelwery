
//MENU

//HAN dropdown caret
document.addEventListener('DOMContentLoaded', function() {
    let dropdowns = document.querySelectorAll('.menusection .select');

    dropdowns.forEach(function(drop) {
        drop.addEventListener('click', function(event) {
            let currentDropDown = this.nextElementSibling;
            
            if (currentDropDown) {
                if (currentDropDown.style.display === 'block') {
                    currentDropDown.style.display = 'none';
                    caret.classList.toggle('caret-rotate');
                } else {
                    currentDropDown.style.display = 'block';
                }
                
                dropdowns.forEach(function(other) {
                    if (other.nextElementSibling !== currentDropDown && other.nextElementSibling) {
                        other.nextElementSibling.style.display = 'none';
                    }
                });
            }
        });
    });

    window.onclick = function(event) {
        if (!event.target.matches('.menusection .select')) {
            dropdowns.forEach(function(drop) {
                let openDropDown = drop.nextElementSibling;
                
                if (openDropDown && openDropDown.style.display === 'block') {
                    openDropDown.style.display = 'none';
                }
            });
        }
    };
});

// Đac
const addToCartButtons = document.getElementById("shopping-bag");

addToCartButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
  
      var btnItem = event.target;
      var product = btnItem.closest(".box");
      var productImg = product.querySelector("img").src;
      var productName = product.querySelector(".content h3").innerText;
      var priceElement = product.querySelector(".price");
      var productPrice = priceElement.firstChild.textContent.trim();
      console.log(productPrice, productImg, productName);
  
      // Lấy danh sách sản phẩm từ localStorage (nếu đã tồn tại)
      var cartItems = localStorage.getItem('cartItems');
      if (cartItems) {
        cartItems = JSON.parse(cartItems);
      } else {
        cartItems = [];
      }
  
      // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
      var productExists = cartItems.some(function (item) {
        return item.productName === productName && item.productPrice === productPrice;
      });
  
      if (productExists) {
        showAlert("The product is already in the cart");
        return;
      }
  
      // Thêm sản phẩm hiện tại vào danh sách
      var productData = {
        productName: productName,
        productPrice: productPrice,
        productImg: productImg
      };
      cartItems.push(productData);
  
      // Lưu trữ danh sách sản phẩm vào localStorage
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
  
    //   // Chuyển hướng đến trang cart/index.html
    //   window.location.href = "cart/index.html";
    });
  });
  
  function showAlert(message) {
    // Hiển thị thông báo bằng cách sử dụng các phương thức hoặc thư viện thông báo hợp lệ
    // Ví dụ:
    alert(message);
  }

