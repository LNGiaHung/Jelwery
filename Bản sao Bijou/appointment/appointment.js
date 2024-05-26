document.addEventListener('DOMContentLoaded', function () {
    const link = document.querySelector('.Appt-container-intro-h1');
    const user = JSON.parse(sessionStorage.getItem('user'));

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
        
        const appointmentData = getFormData(form, user);
        const appointmentResponse = await createAppointment(appointmentData);

        if (appointmentResponse.success) {
            const emailResponse = await sendConfirmationEmail(
                appointmentData.Mail,
                "Appointment Confirmation",
                `<p>Dear ${appointmentData.FirstName},</p><p>Your appointment has been booked successfully for ${appointmentData.BookedDate.toLocaleString()}.</p>`
            );

            if (emailResponse.success) {
                alert('Appointment created and email sent successfully!');
            } else {
                alert('Appointment created but failed to send email.');
            }
        }
    });
});

async function createAppointment(appointmentData) {
    try {
        console.log("appointmentData: ", appointmentData);
        const response = await fetch('http://localhost:3001/Appointments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(appointmentData)
        });

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

async function sendConfirmationEmail(to, subject, htmlContent) {
    try {
        console.log("to: ", to);
        console.log("subject: ", subject);
        console.log("htmlContent: ", htmlContent);
        const response = await fetch(`http://localhost:3001/mailer/${encodeURIComponent(to)}/${encodeURIComponent(subject)}/${encodeURIComponent(htmlContent)}`, {
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
    const dobDay = formDataObj.DOB_day || '1';
    const dobMonth = formDataObj.DOB_month || '1';
    const dobYear = formDataObj.DOB_year || '2024';

    const bookedDate = new Date(`${dobYear}-${dobMonth}-${dobDay}T${dobTime}:00`);
    
    console.log("user.FirstName: ", user ? user.FirstName : formDataObj.FirstName);
    console.log("user.LastName: ", user ? user.LastName : formDataObj.LastName);
    console.log("user.Mail: ", user ? user.Mail : formDataObj.Mail);
    console.log("bookedDate: ", bookedDate);
    console.log("formDataObj.Interest:", formDataObj.Interest);

    return {
        FirstName: user ? user.FirstName : formDataObj.FirstName,
        LastName: user ? user.LastName : formDataObj.LastName,
        Mail: user ? user.Mail : formDataObj.Mail,
        BookedDate: bookedDate,
        Interest: formDataObj.Interest
    };
}
