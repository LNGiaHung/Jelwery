document.addEventListener("DOMContentLoaded", function() {
    const shopByCategory = document.getElementById("shopByCategory");
    const shopByStone = document.getElementById("shopByStone");
    const engagementAndWedding = document.getElementById("engagementAndWedding");

    // Function to handle category click event
    function handleCategoryClick(event) {
        // Prevent the default action of the anchor tag
        event.preventDefault();

        // Check if the clicked element is a span with the class 'cta-context'
        if (event.target.classList.contains('cta-context')) {
            var value = event.target.innerText;
            console.log("Category value: ", value);

            // Store the selected category in sessionStorage
            sessionStorage.setItem('selectedCategory', JSON.stringify(value));

            // Navigate to the desired URL
            window.location.href = "http://127.0.0.1:5502/B%E1%BA%A3n%20sao%20Bijou/sale_page/index.html";
        }
    }

    // Function to handle stone click event
    function handleStoneClick(event) {
        // Prevent the default action of the anchor tag
        event.preventDefault();

        // Check if the clicked element is a span with the class 'cta-context'
        if (event.target.classList.contains('cta-context')) {
            var value = event.target.innerText;
            console.log("Stone value: ", value);

            // Store the selected stone in sessionStorage
            sessionStorage.setItem('selectedStone', JSON.stringify(value));

            // Navigate to the desired URL
            window.location.href = "http://127.0.0.1:5502/B%E1%BA%A3n%20sao%20Bijou/sale_page/index.html";
        }
    }

    // Function to handle engagement and wedding click event
    function handleEngagementAndWeddingClick(event) {
        // Prevent the default action of the anchor tag
        event.preventDefault();

        // Check if the clicked element is a span with the class 'cta-context'
        if (event.target.classList.contains('cta-context')) {
            var value = event.target.innerText.toLowerCase();
            if (value.endsWith('s')) {
                value = value.slice(0, -1);
            }
            console.log("Engagement & Wedding value: ", value);

            // Store the selected value in sessionStorage
            sessionStorage.setItem('selectedEngagementAndWedding', JSON.stringify(value));

            // Navigate to the desired URL
            window.location.href = "http://127.0.0.1:5502/B%E1%BA%A3n%20sao%20Bijou/sale_page/index.html";
        }
    }

    // Ensure shopByCategory element exists and add event listener
    if (shopByCategory) {
        const categorySpans = shopByCategory.querySelectorAll('.cta-context');
        categorySpans.forEach(span => {
            span.addEventListener('click', handleCategoryClick);
        });
    }

    // Ensure shopByStone element exists and add event listener
    if (shopByStone) {
        const stoneSpans = shopByStone.querySelectorAll('.cta-context');
        stoneSpans.forEach(span => {
            span.addEventListener('click', handleStoneClick);
        });
    }

    // Ensure engagementAndWedding element exists and add event listener
    if (engagementAndWedding) {
        const engagementAndWeddingSpans = engagementAndWedding.querySelectorAll('.cta-context');
        engagementAndWeddingSpans.forEach(span => {
            span.addEventListener('click', handleEngagementAndWeddingClick);
        });
    }
});
