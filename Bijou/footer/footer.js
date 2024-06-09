// Hieu ung cho phan dky
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