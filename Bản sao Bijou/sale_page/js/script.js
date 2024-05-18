// Header - croll up/down
let lastScrollTop = 0;
const header = document.getElementById("header");

window.addEventListener("scroll", function() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop) {
    // Lướt xuống
    header.classList.add("header-hidden");
  } else {
    // Lướt lên
    header.classList.remove("header-hidden");
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Đảm bảo scrollTop không âm
}, false);

// Header mo thi man hinh sau mo
document.addEventListener("DOMContentLoaded", function() {
  const mainNavLinks = document.querySelectorAll('.main-nav__link');
  const bodyFooter = document.querySelectorAll('main, footer');

  mainNavLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
          // Thêm lớp hidden-body-footer vào body và footer khi hover vào main-nav__link
          bodyFooter.forEach(element => {
              element.classList.add('hidden-body-footer');
          });
      });

      link.addEventListener('mouseleave', () => {
        // Loại bỏ lớp hidden-body-footer khi không hover nữa
        bodyFooter.forEach(element => {
            element.classList.remove('hidden-body-footer');
        });
    });
  });
});

// Search bar button 
document.addEventListener("DOMContentLoaded", function() {
  const searchBar = document.getElementById('searchBar');
  const searchIcon = document.querySelector('.fa-magnifying-glass');
  const bodyFooter = document.querySelectorAll('main, footer');
  const searchInput = document.querySelector('.input-search');

  // Xử lý sự kiện khi nhấp vào biểu tượng tìm kiếm
  searchIcon.addEventListener('click', function(e) {
      e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>
      searchBar.classList.toggle('show');
      if (searchBar.classList.contains('show')) {
          // Hiển thị phần .search-bar và thêm lớp .hidden-body-footer
          bodyFooter.forEach(element => {
              element.classList.add('hidden-body-footer');
          });
          // Thêm sự kiện clickOutside khi hiển thị phần searchBar
          document.addEventListener('click', clickOutside);
      } else {
          // Ẩn phần .search-bar và loại bỏ lớp .hidden-body-footer
          bodyFooter.forEach(element => {
              element.classList.remove('hidden-body-footer');
          });
          // Loại bỏ sự kiện clickOutside khi ẩn searchBar
          document.removeEventListener('click', clickOutside);
      }
  });

// Hàm xử lý enter hoặc click vào icon tìm kiếm
document.addEventListener("DOMContentLoaded", function() {
  const searchBar = document.getElementById('searchBar');
  const searchIcon = document.querySelector('.fa-magnifying-glass');
  const searchInput = document.querySelector('.input-search');

  // Xử lý sự kiện khi nhấp vào biểu tượng tìm kiếm
  searchIcon.addEventListener('click', function(e) {
      e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>
      search();
  });

  // Xử lý sự kiện khi người dùng nhấn phím Enter trong ô input
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        console.log('Enter key pressed');
        search();
    }
});

  // Hàm thực hiện tìm kiếm và chuyển hướng trang
  function search() {
      const searchTerm = searchInput.value.trim();
      if (searchTerm !== '') {
          // Chuyển hướng trang đến trang tìm kiếm với tham số là từ khóa tìm kiếm
          window.location.href = 'search.html?keyword=' + encodeURIComponent(searchTerm);
      }
  }
});


  // Xử lý sự kiện khi click ra ngoài phần .search-bar
  function clickOutside(event) {
      if (!searchBar.contains(event.target) && !searchIcon.contains(event.target)) {
          searchBar.classList.remove('show');
          // Loại bỏ lớp .hidden-body-footer khi click ra ngoài
          bodyFooter.forEach(element => {
              element.classList.remove('hidden-body-footer');
          });
          document.removeEventListener('click', clickOutside);
      }
  }

  // Thêm sự kiện cho input khi có thay đổi giá trị
  searchInput.addEventListener('input', function() {
      // Lưu giá trị nhập vào ở đây hoặc xử lý nó theo nhu cầu
      const searchTerm = this.value.trim(); // Lấy giá trị nhập vào và loại bỏ khoảng trắng đầu và cuối
      // Xử lý tìm kiếm với giá trị searchTerm
  });
});

// Sign in / Create an account
document.addEventListener("DOMContentLoaded", function() {
  const userIcon = document.querySelector('.user-icon');
  const tooltip = document.querySelector('.tooltip');

  // Xử lý sự kiện click vào icon user
  userIcon.addEventListener('click', function(e) {
      e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>
      tooltip.classList.toggle('show'); // Thêm hoặc loại bỏ lớp 'show' khi click vào
  });

  // Xử lý sự kiện click ra ngoài để ẩn đi nội dung
  document.addEventListener('click', function(e) {
      if (!userIcon.contains(e.target) && !tooltip.contains(e.target)) {
          tooltip.classList.remove('show'); // Loại bỏ lớp 'show' khi click ra ngoài
      }
  });
});


// Giu cho phan header-main-nav duoc hien thi khi hover vao
document.addEventListener("DOMContentLoaded", function() {
  // Lấy tất cả các .main-nav__link-container
  const linkContainers = document.querySelectorAll('.main-nav__link-container');

  // Lặp qua từng .main-nav__link-container
  linkContainers.forEach(linkContainer => {
      // Thêm sự kiện mouseenter
      linkContainer.addEventListener('mouseenter', () => {
          // Thêm lớp 'active' vào .main-nav__link-container
          linkContainer.classList.add('active');
      });

      // Thêm sự kiện mouseleave
      linkContainer.addEventListener('mouseleave', () => {
          // Loại bỏ lớp 'active' khỏi .main-nav__link-container
          linkContainer.classList.remove('active');
      });
  });

  // Lấy tất cả các .subnav
  const subnavs = document.querySelectorAll('.subnav');

  // Lặp qua từng .subnav
  subnavs.forEach(subnav => {
      // Thêm sự kiện mouseover
      subnav.addEventListener('mouseover', () => {
          // Thêm lớp 'active' vào .subnav
          subnav.classList.add('active');
      });

      // Thêm sự kiện mouseout
      subnav.addEventListener('mouseout', () => {
          // Loại bỏ lớp 'active' khỏi .subnav
          subnav.classList.remove('active');
      });
  });

  // Lấy tất cả các .main-nav__link
  const mainNavLinks = document.querySelectorAll('.main-nav__link');

  // Lặp qua từng .main-nav__link
  mainNavLinks.forEach(link => {
      // Thêm sự kiện mouseenter
      link.addEventListener('mouseenter', () => {
          // Tìm .subnav trong .main-nav__link hiện tại và thêm lớp 'active'
          const subnav = link.querySelector('.subnav');
          if (subnav) {
              subnav.classList.add('active');
          }
      });

      // Thêm sự kiện mouseleave
      link.addEventListener('mouseleave', () => {
          // Tìm .subnav trong .main-nav__link hiện tại và loại bỏ lớp 'active'
          const subnav = link.querySelector('.subnav');
          if (subnav) {
              subnav.classList.remove('active');
          }
      });
  });
});


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
    document.getElementById('shopping-bag'),
    document.getElementById('shopping-bag1'),
    document.getElementById('shopping-bag2'),
    document.getElementById('shopping-bag3'),
    document.getElementById('shopping-bag4'),
    document.getElementById('shopping-bag5'),
    document.getElementById('shopping-bag6'),
    document.getElementById('shopping-bag7'),
    document.getElementById('shopping-bag8'),
    document.getElementById('shopping-bag9'),
    document.getElementById('shopping-bag10'),
    document.getElementById('shopping-bag11')
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
