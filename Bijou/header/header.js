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

//han wishlist + shoppingbag 
const shoppingBagIcons = [document.getElementById('shopping-bag')];
const headerShoppingBag = document.querySelector('.quanity');

shoppingBagIcons.forEach(shoppingBagIcon => {
  shoppingBagIcon.addEventListener('click', () => {
    let currentQuantity = parseInt(headerShoppingBag.textContent);
    if (currentQuantity < 9) {
      headerShoppingBag.textContent = currentQuantity + 1;
    } else {
      headerShoppingBag.textContent = '9+';
    }
  });
});

const wishlistIcons = [document.getElementById('wish-list')];
const headerWishlist = document.querySelector('.quanityheart');

wishlistIcons.forEach(wishlistIcon => {
  wishlistIcon.addEventListener('click', () => {
    let currentQuantity = parseInt(headerWishlist.textContent);
    if (currentQuantity < 9) {
      headerWishlist.textContent = currentQuantity + 1;
    } else {
      headerWishlist.textContent = '9+';
    }
  });
});