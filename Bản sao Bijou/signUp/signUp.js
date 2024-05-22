document.addEventListener('DOMContentLoaded', function () {
    console.log('signUp.js');
    const registrationForm = document.getElementById('registrationForm');

    registrationForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        console.log('sumit');

        const formData = new FormData(registrationForm);
        const formValues = Object.fromEntries(formData.entries());

        // Handle date of birth
        const day = formValues.DOB_day;
        const month = formValues.DOB_month;
        const year = formValues.DOB_year;
        formValues.DOB = (year && month && day) ? `${month}/${day}/${year}` : null;
        delete formValues.DOB_day;
        delete formValues.DOB_month;
        delete formValues.DOB_year;

        // Get the value of the relationship status select element
        const relationshipStatusSelect = document.getElementById('relationship-status');
        const relationshipStatusValue = relationshipStatusSelect.value;

        // Add the relationship status value to the formValues object
        formValues['RelationshipStatus'] = relationshipStatusValue;

        // Check for empty fields
        if (!formValues.FirstName || formValues.FirstName.trim() === "" ||
            !formValues.LastName || formValues.LastName.trim() === "" ||
            !formValues.Mail || formValues.Mail.trim() === "" ||
            !formValues.Password || formValues.Password.trim() === "") {
                console.log('hey');
            showPopup('Please fill in all the required fields.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formValues)
            });

            if (response.ok) {
                const user = await response.json();
                console.log('User created:', user);
                // Redirect to sign-in page upon successful registration
                window.location.href = '../singIn/signIn.html';
            } else {
                const errorData = await response.json();
                console.error('Error creating user:', errorData.message);
                showPopup('Error creating user: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error creating user:', error);
            showPopup('Network error: ' + error.message);
        }
    });

    // Function to show the pop-up
    function showPopup(message) {
        console.log('pop up');
        const popup = document.getElementById('myPopup');
        const popupMessage = document.getElementById('popupMessage');
        popupMessage.textContent = message;
        popup.style.display = "block";

        // Get the <span> element that closes the pop-up
        const span = document.getElementsByClassName("close")[0];

        // When the user clicks on <span> (x), close the pop-up
        span.onclick = function () {
            popup.style.display = "none";
        }

        // When the user clicks anywhere outside of the pop-up, close it
        window.onclick = function (event) {
            if (event.target == popup) {
                popup.style.display = "none";
            }
        }
    }
});
