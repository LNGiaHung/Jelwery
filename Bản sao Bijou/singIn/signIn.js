document.addEventListener('DOMContentLoaded', function () {
    const signInForm = document.getElementById('signInForm');
    const errorMessage = document.getElementById('error-message');

    signInForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = document.querySelector('.sign-in__email-input').value.trim();
        const password = document.querySelector('.sign-in__pass-input').value.trim();

        console.log("Email:", email); // Debugging log
        console.log("Password:", password); // Debugging log

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
                checkAdmin(email).then(isAdmin => {
                    console.log("isAdmin (inside checkAdmin): ", isAdmin);
                    if (isAdmin) {
                        window.location.href = '../roleAdmin/statistic.html';
                    } else {
                        console.log("isAdmin: ", isAdmin);
                        window.location.href = '../landingPage.html';
                    }
                });
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

async function checkAdmin(email) {
    try {
        const encodedEmail = encodeURIComponent(email);
        console.log("Encoded email:", encodedEmail); // Debugging log
        const response = await fetch(`http://localhost:3001/auth/check-admin/${encodedEmail}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('checkAdmin response data:', data);
        // Check if isAdmin property exists and is true
        return data.isAdmin === true;
    } catch (error) {
        console.error('Error:', error);
        return false; // Default to false if there is an error
    }
}

function showPopup(message) {
    // Implement this function to show a popup with the message
    alert(message);
}
