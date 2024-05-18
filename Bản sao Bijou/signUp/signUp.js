document.addEventListener('DOMContentLoaded', function () {
  const registrationForm = document.getElementById('registrationForm');

  registrationForm.addEventListener('submit', async function (event) {
      event.preventDefault();

      const formData = new FormData(registrationForm);
      const formValues = Object.fromEntries(formData.entries());

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
              // You can redirect or show a success message here
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
