document.addEventListener('DOMContentLoaded', function () {
    console.log('signUp.js');
    const registrationForm = document.getElementById('registrationForm');
    const submitButton = document.querySelector('.signup-button--input');

    // Click event listener for the button
    submitButton.addEventListener('click', async function (event) {
        event.preventDefault();
        console.log('Button clicked');

        const formData = new FormData(registrationForm);
        const formValues = Object.fromEntries(formData.entries());

        if(!formValues.FirstName || formValues.FirstName.trim() === "" ){
            showPopup('Please Enter First Name.');
            return;
        } else if(!isAlphabetic(formValues.FirstName)){
            showPopup('First Name only include letter.');
            return;
        } else if(!formValues.LastName || formValues.LastName.trim() === "" ){
            showPopup('Please Enter Last Name.');
            return;
        }else if(!isAlphabetic(formValues.LastName)){
            showPopup('Last Name only include letter.');
            return;
        } else if(!formValues.Mail || formValues.Mail.trim() === "" ){
            showPopup('Please Enter Email.');
            return;
        } else if(!isEmail(formValues.Mail)){
            showPopup('Please Enter a valid Email.');
            return;
        }else if(!formValues.Password || formValues.Password.trim() === ""){
            showPopup('Please Enter Password.');
            return;
        }

        // Manually trigger the form submit event
        registrationForm.dispatchEvent(new Event('submit'));
    });

    // Form submit event listener for validation and submission
    registrationForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        console.log('submit');

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

        try {
            const checkEmailResponse = await fetch('http://localhost:3001/auth/check-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: formValues.Mail })
            });
            console.log(checkEmailResponse);
            if (!checkEmailResponse.ok) {
                throw new Error('Failed to check email existence');
            }

            const checkEmailData = await checkEmailResponse.json();

            console.log('checkEmailData', checkEmailData);
            if (checkEmailData.exists) {
                showPopup('Email already exists. Please use a different email.');
                return;
            } else {
                // Call createUser function passing formValues
                await createUser(formValues);
            }
        } catch (error) {
            console.error('Error checking email:', error);
            showPopup('Error checking email: ' + error.message);
        }
    });
});

function showPopup(message) {
    // Implement this function to show a popup with the message
    alert(message);
}

async function createUser(formValues){
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
}

function isAlphabetic(inputString) {
    // Tạo một biểu thức chính quy để kiểm tra chuỗi chỉ chứa chữ cái
    const regex = /^[a-zA-Z]+$/;
    
    // Kiểm tra xem chuỗi có khớp với biểu thức chính quy không
    return regex.test(inputString);
}

function isEmail(email) {
    // Regular expression pattern for validating email addresses
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    // Test if the email matches the regex pattern
    return regex.test(email);
}
