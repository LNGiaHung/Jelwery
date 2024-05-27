document.addEventListener('DOMContentLoaded', function () {
    const link = document.querySelector('.Appt-container-intro-h1');
    const user = JSON.parse(sessionStorage.getItem('user'));
    const verificationForm = document.getElementById('verificationForm');
    const appointmentForm = document.getElementById('appointment');
    
    let verificationCode;
    let appointmentData;

    // Scroll to form
    link.addEventListener('click', function (event) {
        event.preventDefault();
        const target = document.querySelector('#appointment');
        target.scrollIntoView({ behavior: 'smooth' });
    });

    if (user) {
        document.getElementById('first-name-container').style.display = 'none';
        document.getElementById('last-name-container').style.display = 'none';
        document.getElementById('email-container').style.display = 'none';

        document.querySelector('[name="FirstName"]').required = false;
        document.querySelector('[name="LastName"]').required = false;
        document.querySelector('[name="Mail"]').required = false;
    }

    const form = document.getElementById('appointment');
    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        if (user) {
            appointmentData = getFormData(form, user.user);
        } else {
            appointmentData = getFormData(form, user);
        }
        verificationCode = generateRandomCode(100000, 999999).toString();
        const emailResponse = await sendConfirmationEmail(
            appointmentData.Mail,
            "YOUR BIJOU APPOINTMENT HAS SCHEDULED SUCCESSFULLY ✨",
            appointmentData,
            verificationCode
        );

        if (emailResponse.success) {
            alert('Appointment created and email sent successfully!');
            // Display verification form
            appointmentForm.style.display = 'none';
            verificationForm.style.display = 'block';
            // Generate and set verification code
        } else {
            alert('Appointment created but failed to send email.');
        }
    });

    // Script for handling the email input placeholder
    var previousValue = '';
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.placeholder = 'Email';
        emailInput.addEventListener('blur', function () {
            if (this.value === '') {
                this.placeholder = 'Email';
            } else if (this.value !== previousValue) {
                previousValue = this.value;
            }
        });
    }

    const verifyButton = document.getElementById('verifyButton');
    verifyButton.addEventListener('click', async function () {
        const verificationCodeInput = document.getElementById('verificationCode').value;
        if (verificationCodeInput === verificationCode) {
            // Correct verification code entered
            alert('Verification successful. Appointment created!');
            const appointmentResponse = await createAppointment(appointmentData);
            location.reload();
        } else {
            // Incorrect verification code entered
            alert('Incorrect verification code. Please try again.');
        }
    });
});

async function createAppointment(appointmentData) {
    try {
        const url = `http://localhost:3001/Appointment/${appointmentData.FirstName}/${appointmentData.LastName}/${appointmentData.Mail}/${appointmentData.BookedDate}/${appointmentData.Interest}`;
        const response = await fetch(url, { method: 'POST' });

        if (response.ok) {
            const result = await response.json();
            return { success: true, data: result };
        } else {
            const error = await response.json();
            alert(`Failed to create appointment: ${error.message}`);
            return { success: false, error };
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to create appointment. Please try again later.');
        return { success: false, error };
    }
}

async function sendConfirmationEmail(to, subject, appointmentData, verificationCode) {
    const htmlContent = `
        <p><strong>Subject:</strong> ${subject}</p>
        <br>
        <p>Dear ${appointmentData.FirstName},</p>
        <p>Thanks for scheduling an appointment with our team! We cannot wait to see you in person.</p>
        <p>Please find again your confirmation code: <strong>${verificationCode}</strong></p>
        <p><em>*Please do not share this code with others to prevent the inconvenience that may be incurred*</em></p>
        <br>
        <p><strong>Name:</strong> ${appointmentData.FirstName} ${appointmentData.LastName}</p>
        <p><strong>Email:</strong> ${appointmentData.Mail}</p>
        <p><strong>Interest:</strong> ${appointmentData.Interest}</p>
        <p><strong>Date/Time:</strong> ${appointmentData.BookedDate}</p>
        <br>
        <p>We are so glad to have you as a member of Bijou! Do not forget to check your daily email to receive the latest of Bijou, and we are so excited to see you at our appointment.</p>
        <p>Please do not forget to bring your confirmation code for accessing and checking in.</p>
        <br>
        <p>We look forward to seeing you here ✨</p>
        <br>
        <p>Cheers,</p>
        <p>Bijou Jewelry-Bringing the Finest Jewelry to Your Fingertips ✨</p>
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

function getFormData(form, user) {
    const formData = new FormData(form);
    const formDataObj = Object.fromEntries(formData.entries());

    const dobTime = formDataObj.DOB_time || '00:00';
    const dobDay = formDataObj.DOB_day || '01';
    const dobMonth = formDataObj.DOB_month || '01';
    const dobYear = formDataObj.DOB_year || '2024';

    // Ensure month and day are two digits
    const bookedDate = `${dobYear}-${dobMonth.padStart(2, '0')}-${dobDay.padStart(2, '0')}T${dobTime}:00.000Z`;

    return {
        FirstName: user ? user.FirstName : formDataObj.FirstName,
        LastName: user ? user.LastName : formDataObj.LastName,
        Mail: user ? user.Mail : formDataObj.Mail,
        BookedDate: bookedDate,
        Interest: formDataObj.Interest
    };
}

function generateRandomCode(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
