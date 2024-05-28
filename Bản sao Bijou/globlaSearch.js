document.addEventListener('DOMContentLoaded', (event) => {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');

    searchButton.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent the default link behavior

        const keyword = searchInput.value.trim();
        if (keyword) {
            // Store the search keyword in sessionStorage
            sessionStorage.setItem('searchKeyword', JSON.stringify(keyword));

            // Navigate to index.html in the sale_page directory
            const pathSegments = window.location.pathname.split('/');
            pathSegments.pop(); // Remove the current file name
            const newPath = pathSegments.join('/') + '/sale_page/index.html';
            window.location.href = newPath;
        }
    });
});
