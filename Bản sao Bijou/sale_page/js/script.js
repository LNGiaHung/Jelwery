
//MENU
/*const menuItems = document.querySelectorAll('.menu-items');

//loop cho moi cai link drop xuong
dropdowns.forEach((dropdown) =>{
    dropdowns.addEventListener('mouseenter',() => {
        const select = dropdown.querySelector('.select');
        const caret = dropdown.querySelector('.caret');
        const menu = dropdown.querySelector('.menu');
        const options = dropdown.querySelector('.menu li');
        const selected = dropdown.querySelector('.selected');
    })

    
    //add event click cho cai menu
    select.addEventListener('click', () =>{

        //style cho click
    select.classList.toggle('select-clicked');

    //activecho cai caret xoay
    caret.classList.toggle('caret-rotate');

    //add style khi open deopdown menu
    menu.classList.toggle('menu-open');
    });
});


//loop cho tat ca options
options.forEach(option => {
    //add event click cho cai options
    option.addEventListener('click', () => {
        //change innnertext cho cai option dang chon
        selected.innerText = option.innerText;
        //add clicked style
        select.classList.remove('select-clicked');
        //addd caret
        caret.classList.remove('caret-rotate');
        menu.classList.remove('menu-open');

        options.forEach(option =>{
            option.classList.add('active');
    });
});
});*/

document.addEventListener('DOMContentLoaded', function() {
    let dropdowns = document.querySelectorAll('.menusection .select');

    dropdowns.forEach(function(drop) {
        
        drop.addEventListener('click', function(event) {
            let currentDropDown = this.nextElementSibling;
            if (currentDropDown.style.display === 'block') {
                currentDropDown.style.display = 'none';
                caret.classList.toggle('caret-rotate');
            }
            else {
                currentDropDown.style.display = 'block';
            }

            dropdowns.forEach(function(other){
                if(other.nextElementSibling !== currentDropDown) {
                    other.nextElementSibling.style.display = 'none';
                }
            })
        })
    });
    window.onclick = function (event) {
        if(!event.target.matches('.menusection .select')) {
            dropdowns.forEach(function(drop) {
                var openDropDown = drop.nextElementSibling;
                if (openDropDown.style.display === 'block') {
                    openDropDown.style.display = 'none';
                }
            })
                
        }
    }
});

//sort-by 



/*document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const select = dropdown.querySelector('.select');
        const caret = dropdown.querySelector('.caret');
        const menu = dropdown.querySelector('.menu');

        select.addEventListener('click', () => {
            select.classList.toggle('select-clicked');
            caret.classList.toggle('caret-rotate');
            menu.classList.toggle('menu-open');
        });

        const options = menu.querySelectorAll('li');
        const selected = select.querySelector('.selected');

        options.forEach(option => {
            option.addEventListener('click', () => {
                selected.innerText = option.innerText;
                select.classList.remove('select-clicked');
                caret.classList.remove('caret-rotate');
                menu.classList.remove('menu-open');

                options.forEach(opt => {
                    opt.classList.remove('active');
                });

                option.classList.add('active');
            });
        });
    });
});*/

/*document.addEventListener('DOMContentLoaded', function() {
    let dropdowns = document.querySelectorAll('.menusection .select');
    let carets = document.querySelectorAll('caret');

    dropdowns.forEach(function(drop, i) {
        drop.addEventListener('click', function(event) {
            let currentDropDown = this.nextElementSibling;
            if (currentDropDown.style.display === 'block') {
                currentDropDown.style.display = 'none';
                carets[i].classList.toggle('caret-rotate');
            }
            else {
                currentDropDown.style.display = 'block';
                carets[i].classList.toggle('caret-rotate');
            }

            dropdowns.forEach(function(other, j){
                if(j !== i) {
                    other.nextElementSibling.style.display = 'none';
                    carets[j].classList.toggle('caret-rotate');
                }
            })
        })
    });

    window.onclick = function (event) {
        if(!event.target.matches('.menusection .select')) {
            dropdowns.forEach(function(drop, i) {
                var openDropDown = drop.nextElementSibling;
                if (openDropDown.style.display === 'block') {
                    openDropDown.style.display = 'none';
                    carets[i].classList.toggle('caret-rotate');
                }
            })
        }
    }
});*/

/*document.addEventListener('DOMContentLoaded', function() {
    let dropdowns = document.querySelectorAll('.menusection .select');
  
    dropdowns.forEach(function(drop) {
      drop.addEventListener('mouseover', function(event) {
        let currentDropDown = this.nextElementSibling;
        currentDropDown.style.display = 'block';
      });
  
      drop.addEventListener('mouseout', function(event) {
        let currentDropDown = this.nextElementSibling;
        currentDropDown.style.display = 'none';
      });
    });
  
    window.onclick = function(event) {
      if (!event.target.matches('.menusection .select')) {
        dropdowns.forEach(function(drop) {
          var openDropDown = drop.nextElementSibling;
          if (openDropDown.style.display === 'block') {
            openDropDown.style.display = 'none';
          }
        })
      }
    }
  });*/

//add to cart

const shoppingBagIcons = [
    document.getElementById('shopping-bag')
    // document.getElementById('shopping-bag1'),
    // document.getElementById('shopping-bag2'),
    // document.getElementById('shopping-bag3'),
    // document.getElementById('shopping-bag4'),
    // document.getElementById('shopping-bag5'),
    // document.getElementById('shopping-bag6'),
    // document.getElementById('shopping-bag7'),
    // document.getElementById('shopping-bag8'),
    // document.getElementById('shopping-bag9'),
    // document.getElementById('shopping-bag10'),
    // document.getElementById('shopping-bag11')
  ];
const headerShoppingBag = document.querySelector('.quanity');

shoppingBagIcons.forEach(shoppingBagIcon => {
    shoppingBagIcon.addEventListener('click', () => {
      let currentQuantity = parseInt(headerShoppingBag.textContent);
      headerShoppingBag.textContent = currentQuantity + 1;
    });
});



// Đac
const addToCartButtons = document.querySelectorAll(".products .box .icons [id^='shopping-bag']");

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

