// Header - croll up/down
updateShoppingBagIcon();
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
// document.addEventListener("DOMContentLoaded", function() {
//   const userIcon = document.querySelector('.user-icon');
//   const tooltip = document.querySelector('.tooltip');

//   // Xử lý sự kiện click vào icon user
//   userIcon.addEventListener('click', function(e) {
//       e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ <a>
//       tooltip.classList.toggle('show'); // Thêm hoặc loại bỏ lớp 'show' khi click vào
//   });

//   // Xử lý sự kiện click ra ngoài để ẩn đi nội dung
//   document.addEventListener('click', function(e) {
//       if (!userIcon.contains(e.target) && !tooltip.contains(e.target)) {
//           tooltip.classList.remove('show'); // Loại bỏ lớp 'show' khi click ra ngoài
//       }
//   });
// });


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


// video auto replay va an thanh thoi luong
const videos = document.querySelectorAll('.video');

videos.forEach(function(video) {
    video.controls = false; // Ẩn thanh điều khiển ngay từ đầu

    video.addEventListener('loadedmetadata', function() {
        // Ẩn thanh điều khiển khi video tải xong
        video.controls = false;
    });

    video.addEventListener("ended", function() {
        // Phát lại video từ đầu
        this.currentTime = 0;
        this.play();

        // Ẩn thanh điều khiển sau khi video kết thúc
        this.controls = false;
    }, false);
});

// Read more/less on OUR STORY
function showMore() {
    var moreText = document.getElementById("story__text--full");
    var readMoreLink = document.getElementById("readMore");
    var readLessLink = document.getElementById("readLess");
  
    if (moreText.style.display === "none") {
      moreText.style.display = "block";
      readMoreLink.style.display = "none";
      readLessLink.style.display = "inline";
    }
  }
  

function showLess() {
    var moreText = document.getElementById("story__text--full");
    var readMoreLink = document.getElementById("readMore");
    var readLessLink = document.getElementById("readLess");
  
    if (moreText.style.display === "block") {
      moreText.style.display = "none";
      readMoreLink.style.display = "inline";
      readLessLink.style.display = "none";
    }
  }

// Read more/less Inspiring
function inspire_showMore(element) {
    var parent = element.parentNode;
    if (parent) {
        var moreText = parent.nextElementSibling;
        var readMoreLink = element;
        var readLessLink = moreText.querySelector('.inspire_readLess');

        // Ẩn nội dung được mở rộng và đường liên kết "read less" tương ứng của tất cả các phần tử khác
        var allTextFull = parent.parentNode.querySelectorAll('.text--full'); // Sử dụng parentNode để tránh lặp lại phần tử này
        var allReadLess = parent.parentNode.querySelectorAll('.inspire_readLess'); // Sử dụng parentNode để tránh lặp lại phần tử này
        allTextFull.forEach(function(item) {
            item.style.display = "none";
        });
        allReadLess.forEach(function(item) {
            item.style.display = "none";
        });

        // Hiển thị nội dung được mở rộng và đường liên kết "read less" tương ứng
        moreText.style.display = "block";
        readMoreLink.style.display = "none";
        readLessLink.style.display = "inline";

        // Cuộn đến vị trí của phần tử đó với tốc độ chậm hơn
        moreText.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest", duration: 1000 });
    }
}


function inspire_showLess(element) {
    var parent = element.parentNode.parentNode; // Lấy cha của cha của đối tượng được kích hoạt (parent của image-caption)
    var lessText = parent.querySelector('.text--full');
    var readMoreLink = lessText.parentNode.querySelector('.inspire_readMore');
    var readLessLink = element;

    lessText.style.display = "none";
    readMoreLink.style.display = "inline";
    readLessLink.style.display = "none";
}

// // Hieu ung cho phan dang ky cua email

var previousValue = '';
const emailInput = document.getElementById('email');
emailInput.placeholder = 'Email';

document.getElementById('email').addEventListener('blur', function() {
  if (this.value === '') {
    this.placeholder = 'Email';
  } else if (this.value !== previousValue) { // So sánh giá trị mới với giá trị cũ
    previousValue = this.value; // Cập nhật giá trị mới
  }
});

// dinh dang email
// function validateEmail(input) {
//   const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)@(([\w-.]+)\.([a-zA-Z]{2,})))$/;
//   const email = input.value.trim();

//   if (!emailRegex.test(email)) {
//     document.getElementById('email-error').textContent = 'Email không hợp lệ';
//     input.classList.add('error'); // Thêm class error cho input (nếu cần)
//   } else {
//     document.getElementById('email-error').textContent = '';
//     input.classList.remove('error'); // Xóa class error cho input (nếu cần)
//   }
// }

// Responsive-menu
let mobileClose = document.querySelector('.nav_mobile-close');
let navMobile = document.querySelector('.nav__mobile')
let navOverlay = document.querySelector('.nav_overlay')
let navBarBtn = document.querySelector('.nav__bars-btn')

navBarBtn.onclick = function() {
    navMobile.classList.add('active');
    navOverlay.classList.add('active');
    // mobileClose.classList.add('active');
}

mobileClose.onclick = function () {
    navMobile.classList.remove('active');
    navOverlay.classList.remove('active');
}

// Navigate-to-page
// document.querySelector('.navigate-to-page').addEventListener('click', function(event) {
//     // Make sure you are not preventing the default action
//     // event.preventDefault();  // This line should not be present if you want the default link behavior
// });

/*Hieu ung cho phan dky
var previousValue = '';
const emailInput = document.getElementById('email');
emailInput.placeholder = 'Email';

document.getElementById('email').addEventListener('blur', function() {
  if (this.value === '') {
    this.placeholder = 'Email';
  } else if (this.value !== previousValue) { // So sánh giá trị mới với giá trị cũ
    previousValue = this.value; // Cập nhật giá trị mới
  }
});*/

// Hiệu ứng email nhảy lên
const emailSpan = document.getElementById('email').querySelector('span'); // Chọn span chứa text email (nếu có)

if (emailSpan) { // Kiểm tra nếu span tồn tại
  emailSpan.addEventListener('click', () => {
    emailSpan.classList.add('focused');
    setTimeout(() => {
      emailSpan.classList.remove('focused');
    }, 300); // Thời gian hiệu ứng (ms)
  });
}

//----------------------------------
const mainImg = document.getElementById("main-img");
const optionBtns = document.querySelectorAll(".option-btn");
let selectedBtn = optionBtns[0]; 

optionBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    selectedBtn = btn;
    mainImg.src = btn.dataset.image;
  });
});

document.querySelectorAll(".option-btn").forEach(btn => {
  btn.addEventListener("mouseover", () => {
    mainImg.src = btn.dataset.image;
  });
});

//-----WISHLIST RECENT
const wishlistItems = document.querySelectorAll('.wishlist');
let currentIndex = 0;

function selectItem(index) {
  deselectAll();
  wishlistItems[index].classList.add('selected');
}

function deselectAll() {
  wishlistItems.forEach((item) => {
    item.classList.remove('selected');
  });
}

function moveToNextItem() {
  currentIndex = (currentIndex + 1) % wishlistItems.length;
  selectItem(currentIndex);
}

function moveToPrevItem() {
  currentIndex = (currentIndex - 1 + wishlistItems.length) % wishlistItems.length;
  selectItem(currentIndex);
}

selectItem(currentIndex);

document.querySelector('.wishlist-next').addEventListener('click', moveToNextItem);
document.querySelector('.wishlist-prev').addEventListener('click', moveToPrevItem);

// //----------ADD TO CART---------
// // Get the shopping bag icon element
// const shoppingBagIcon = document.querySelector('.header__navbar-item .bag-quanity');

// // Get the 'Add to Cart' button element
// const addToCartButton = document.querySelector('.button-ne .add');

// // Add a click event listener to the 'Add to Cart' button
// addToCartButton.addEventListener('click', () => {
//   // Increment the quantity by 1
//   let quantity = parseInt(shoppingBagIcon.textContent) + 1;
  
//   // Update the shopping bag icon with the new quantity
//   shoppingBagIcon.textContent = quantity;
// });


