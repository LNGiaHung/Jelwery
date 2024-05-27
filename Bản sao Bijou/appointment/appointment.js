//scroll xuong toi cai form appt
const link = document.querySelector('.Appt-container-intro-h1');

link.addEventListener('click', function (event) {
    event.preventDefault();
    const target = document.querySelector('#appointment1');

    target.scrollIntoView({ behavior: 'smooth' });
});

const handleAppointmentSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3001/Appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      console.log("Booked success");
    } catch (error) {
      console.error("Booked Error:", error);
    }
  };
  
  const formatDate = (day, month, year) => {
    // Ensure day and month are two digits
    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(month).padStart(2, '0');
    return `${year}-${formattedMonth}-${formattedDay}`;
};

document.getElementById('appointment').addEventListener('submit', function(event) {
    event.preventDefault();

    var userID = '0'
    if(sessionStorage.getItem('user')!==null) {
        const user1 = JSON.parse(sessionStorage.getItem('user'));
        console.log(user1.user.id);
        userID = user1.user.id;
    }
    const firstName = document.querySelector('input[name="FirstName"]').value;
    const lastName = document.querySelector('input[name="LastName"]').value;
    const email = document.querySelector('input[name="Mail"]').value;
    const interest = document.querySelector('input[name="Interest"]:checked').value;
    const day = document.querySelector('input[name="DOB_day"]').value;
    const month = document.querySelector('input[name="DOB_month"]').value;
    const year = document.querySelector('input[name="DOB_year"]').value;

    const formData = {
        User: userID,
        FirstName: firstName,
        LastName: lastName,
        Mail: email,
        Interest: interest,
        BookedDate: formatDate(day, month, year)
    };
    const formDataJson = JSON.stringify(formData);

    console.log(formDataJson);

    handleAppointmentSubmit(formData);

    window.location.href = '../landingPage.html';
});