document.addEventListener("DOMContentLoaded", function() {
    const shopByCategory = document.getElementById("shopByCategory");

    // Ensure shopByCategory element exists
    if (shopByCategory) {
        // Get all span elements with class 'cta-context' within the shopByCategory element
        const spans = shopByCategory.querySelectorAll('.cta-context');

        // Function to handle the click event
        function handleClick(event) {
            // Prevent the default action of the anchor tag
            event.preventDefault();
            
            // Check if the clicked element is a span with the class 'cta-context'
            if (event.target.classList.contains('cta-context')) {
                var value = event.target.innerText;
                console.log("value: ", value);
                sessionStorage.setItem('selectedCategory', JSON.stringify(value));
                // Navigate to the desired URL
                window.location.href = "http://127.0.0.1:5502/B%E1%BA%A3n%20sao%20Bijou/sale_page/index.html";
            }
        }

        // Add click event listener to each span element
        console.log("add event navigate");
        spans.forEach(span => {
            span.addEventListener('click', handleClick);
        });
    }
});
