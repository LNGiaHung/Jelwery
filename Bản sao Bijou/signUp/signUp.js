document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');
    const verificationForm = document.getElementById('verificationForm');
    const submitButton = document.querySelector('.signup-button--input');
    const verifyButton = document.getElementById('verifyButton');
  
    submitButton.addEventListener('click', async function (event) {
      event.preventDefault();
  
      const formData = new FormData(registrationForm);
      const formValues = Object.fromEntries(formData.entries());
  
      if (!formValues.FirstName || formValues.FirstName.trim() === "") {
        showPopup('Please Enter First Name.');
        return;
      } else if (!isAlphabetic(formValues.FirstName)) {
        showPopup('First Name only include letter.');
        return;
      } else if (!formValues.LastName || formValues.LastName.trim() === "") {
        showPopup('Please Enter Last Name.');
        return;
      } else if (!isAlphabetic(formValues.LastName)) {
        showPopup('Last Name only include letter.');
        return;
      } else if (!formValues.Mail || formValues.Mail.trim() === "") {
        showPopup('Please Enter Email.');
        return;
      } else if (!isEmail(formValues.Mail)) {
        showPopup('Please Enter a valid Email.');
        return;
      } else if (!formValues.Password || formValues.Password.trim() === "") {
        showPopup('Please Enter Password.');
        return;
      }
  
      registrationForm.dispatchEvent(new Event('submit'));
    });
  
    registrationForm.addEventListener('submit', async function (event) {
      event.preventDefault();
  
      const formData = new FormData(registrationForm);
      const formValues = Object.fromEntries(formData.entries());
  
      const day = formValues.DOB_day;
      const month = formValues.DOB_month;
      const year = formValues.DOB_year;
      formValues.DOB = (year && month && day) ? `${month}/${day}/${year}` : null;
      delete formValues.DOB_day;
      delete formValues.DOB_month;
      delete formValues.DOB_year;
  
      const relationshipStatusSelect = document.getElementById('relationship-status');
      const relationshipStatusValue = relationshipStatusSelect.value;
      formValues['RelationshipStatus'] = relationshipStatusValue;
  
      try {
        const checkEmailResponse = await fetch('http://localhost:3001/auth/check-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: formValues.Mail })
        });
  
        if (!checkEmailResponse.ok) {
          throw new Error('Failed to check email existence');
        }
  
        const checkEmailData = await checkEmailResponse.json();
  
        if (checkEmailData.exists) {
          showPopup('Email already exists. Please use a different email.');
          return;
        } else {
          await createUser(formValues);
        }
      } catch (error) {
        console.error('Error checking email:', error);
        showPopup('Error checking email: ' + error.message);
      }
    });
  
    verifyButton.addEventListener('click', async function () {
      const verificationCode = document.getElementById('verificationCode').value;
      const email = new FormData(registrationForm).get('Mail');
  
      if (!verificationCode) {
        showPopup('Please enter the verification code.');
        return;
      }
  
      try {
        const response = await fetch('http://localhost:3001/auth/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, code: verificationCode })
        });
  
        if (response.ok) {
          showPopup('Email verified successfully. You can now log in.');
          window.location.href = '../singIn/signIn.html';
        } else {
          const errorData = await response.json();
          showPopup('Error verifying email: ' + errorData.message);
        }
      } catch (error) {
        showPopup('Error verifying email: ' + error.message);
      }
    });
  });
  
  function showPopup(message) {
    alert(message);
  }
  
  async function createUser(formValues) {
    try {
      const response = await fetch('http://localhost:3001/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      });
  
      if (response.ok) {
        showPopup('Verification code sent. Please check your email.');
        registrationForm.style.display = 'none';
        verificationForm.style.display = 'block';
  
        const user = await response.json();
        console.log('User created:', user);
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
    const regex = /^[a-zA-Z]+$/;
    return regex.test(inputString);
  }
  
  function isEmail(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }
  