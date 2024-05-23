document.addEventListener('DOMContentLoaded', function () {
    const signInForm = document.getElementById('signInForm');

    signInForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = document.querySelector('.sign-in__email-input').value;
        const password = document.querySelector('.sign-in__pass-input').value;

        try {
            const response = await fetch('http://localhost:3001/auth/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                // localStorage.setItem('user', JSON.stringify(data));
                // Lưu thông tin đăng nhập vào Session Storage
                sessionStorage.setItem('user', JSON.stringify(data));
                // Chuyển hướng đến trang chính
                window.location.href = '../landingPage.html';
            } else {
                const errorData = await response.json();
                console.error('Error logging in:', errorData.error);
                // Hiển thị thông báo lỗi cho người dùng
            }
        } catch (error) {
            console.error('Error logging in:', error);
            // Xử lý lỗi mạng
        }
    });
});
