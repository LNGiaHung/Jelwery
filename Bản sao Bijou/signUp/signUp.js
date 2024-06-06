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
    
      const day = parseInt(formValues.DOB_day, 10);
      const month = parseInt(formValues.DOB_month, 10) - 1; // Month is zero-based in Date.UTC
      const year = parseInt(formValues.DOB_year, 10);
    
      if (day && month >= 0 && year) {
        const dob = new Date(Date.UTC(year, month, day));
        formValues.DOB = dob.toISOString().split('T')[0]; // Format to YYYY-MM-DD
      } else {
        formValues.DOB = null;
      }
    
      delete formValues.DOB_day;
      delete formValues.DOB_month;
      delete formValues.DOB_year;
    
      const relationshipStatusSelect = document.getElementById('relationship-status');
      const relationshipStatusValue = relationshipStatusSelect.value;
      formValues['RelationshipStatus'] = relationshipStatusValue;
    
      try {
        console.log(formValues.Mail);
        const checkEmailResponse = await fetch('http://localhost:3001/auth/check-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: formValues.Mail })
        });
        console.log("checkEmailResponse: ",checkEmailResponse);
        if (!checkEmailResponse.ok) {
          throw new Error('Failed to check email existence');
        }
    
        const checkEmailData = await checkEmailResponse.json();
        console.log("checkEmailData: ",checkEmailData);
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
      const firstName = new FormData(registrationForm).get('FirstName');
  
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
          sendWelcomeEmail(
            email,
            "Subject: SUCCESSFULLY SIGN UP AT BIJOU JEWELRY",
            firstName
          )
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
      console.log("response: ",response);
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
  
  // Subject: SUCCESSFULLY SIGN UP AT BIJOU JEWELRY

  async function sendWelcomeEmail(to, subject, userName) {
    const htmlContent = `
        <p><strong>Subject:</strong> ${subject}</p>
        <br>
        <p>Dear ${userName},</p>
        <p>Thanks for signing up to Bijou Jewelry!</p>
        <br>
        <p>From now on, you'll get regular product updates and vouchers to get the most out of your purchase experience.</p>
        <br>
        <p>We are so glad to have you as a visitor to Bijou, do not forget to check your daily email to receive the latest of Bijou.</p>
        <br>
        <p>We're glad you're here!</p>
        <p>Cheers,</p>
        <p>Bijou Jewelry-Bringing the Finest Jewelry to Your Fingertips✨</p>
    `;

    try {
        const encodedTo = encodeURIComponent(to);
        const encodedSubject = encodeURIComponent(subject);
        const encodedHtmlContent = encodeURIComponent(htmlContent);

        const url = `http://localhost:3001/auth/mailer/${encodedTo}/${encodedSubject}/${encodedHtmlContent}`;

        const response = await fetch(url, {
            method: 'POST'
        });

        if (response.ok) {
            const result = await response.json();
            return { success: true, data: result };
        } else {
            const error = await response.json();
            console.error('Failed to send email:', error);
            return { success: false, error };
        }
    } catch (error) {
        console.error('Error:', error);
        return { success: false, error };
    }
}