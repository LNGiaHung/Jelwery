document.addEventListener('DOMContentLoaded', function () {
    const signInForm = document.getElementById('signInForm');
    const errorMessage = document.getElementById('error-message');

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
                sessionStorage.setItem('user', JSON.stringify(data));
                window.location.href = '../landingPage.html';
            } else {
                const errorData = await response.json();
                showPopup("Invalid email or password");
                console.error('Error logging in:', errorData.error);
                errorMessage.textContent = 'Invalid email or password';
                errorMessage.style.display = 'block';
            }
        } catch (error) {
            console.error('Error logging in:', error);
            errorMessage.textContent = 'Network error. Please try again later.';
            errorMessage.style.display = 'block';
        }
    });
});

function showPopup(message) {
    // Implement this function to show a popup with the message
    alert(message);
}