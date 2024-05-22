//scroll xuong toi cai form appt
const link = document.querySelector('.Appt-container-intro-h1');

link.addEventListener('click', function (event) {
    event.preventDefault();
    const target = document.querySelector('#appointment1');

    target.scrollIntoView({ behavior: 'smooth' });
});