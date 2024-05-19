document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');

    registrationForm.addEventListener('submit', async function (event) {
        event.preventDefault();

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

        // Check if the password is empty, null, or an empty string
        if (!formValues.Password || formValues.Password.trim() === "") {
            console.error('Password cannot be empty');
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
                // Handle error, show error message to user
            }
        } catch (error) {
            console.error('Error creating user:', error);
            // Handle network errors
        }
    });
});
