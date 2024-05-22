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
                const responseData = await response.json();
                // Store the user in localStorage
                localStorage.setItem('signedInUser', JSON.stringify(responseData.user));
                // Redirect to the home page
                window.location.href = '../landingPage.html'; // Change 'home.html' to the actual home page URL
            } else {
                const errorData = await response.json();
                console.error('Error logging in:', errorData.error);
                // Handle error, show error message to user
            }
        } catch (error) {
            console.error('Error logging in:', error);
            // Handle network errors
        }
    });
});
