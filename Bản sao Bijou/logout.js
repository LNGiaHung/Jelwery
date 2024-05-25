document.addEventListener('DOMContentLoaded', function() {
    console.log("getting user...");
    const user = JSON.parse(sessionStorage.getItem('user'));
    console.log("user: ", user);
    
    const mobileMyAccount = document.getElementById('mobileMyAccount');
    const mobileLogoutButtonPlaceholder = document.getElementById('mobileLogoutButtonPlaceholder');

    if (mobileMyAccount && mobileLogoutButtonPlaceholder) {
        console.log('Elements found:', mobileMyAccount, mobileLogoutButtonPlaceholder);
        if (user) {
            console.log("User is logged in, hiding 'My Account' and showing 'Logout' button.");
            mobileMyAccount.style.display = 'none';

            const logoutButtonHTML = `
                <div class="header__navbar-item-link user-icon header__navbar-item-mobile">
                    <a href="#" id="mobileLogoutButton" class="header__navbar-item-link">
                        <i class="fa-regular fa-user-slash"></i>
                        Logout
                    </a>
                </div>
            `;
            mobileLogoutButtonPlaceholder.innerHTML = logoutButtonHTML;

            document.getElementById('mobileLogoutButton').addEventListener('click', function() {
                console.log("Logging out...");
                sessionStorage.removeItem('user');
                location.reload();
            });
        } else {
            console.log("No user logged in.");
        }
    } else {
        console.error('One or more elements were not found in the DOM.');
    }
});
