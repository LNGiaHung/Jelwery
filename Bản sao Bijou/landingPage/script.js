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
