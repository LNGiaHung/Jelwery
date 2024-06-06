document.addEventListener("DOMContentLoaded", function() {
    const shopByCategory = document.getElementById("shopByCategory");
    const shopByStone = document.getElementById("shopByStone");

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
});
//     const shopByCategory = document.getElementById("shopByCategory");
//     const shopByStone = document.getElementById("shopByStone");

//     // Ensure shopByCategory element exists
//     if (shopByCategory) {
//         // Get all span elements with class 'cta-context' within the shopByCategory element
//         const spans = shopByCategory.querySelectorAll('.cta-context');

//         // Function to handle the click event
//         function shopByCategoryClick(event) {
//             // Prevent the default action of the anchor tag
//             event.preventDefault();
            
//             // Check if the clicked element is a span with the class 'cta-context'
//             if (event.target.classList.contains('cta-context')) {
//                 var value = event.target.innerText;
//                 console.log("value: ", value);
//                 sessionStorage.setItem('selectedCategory', JSON.stringify(value));
//                 // Navigate to the desired URL
//                 window.location.href = "http://127.0.0.1:5502/B%E1%BA%A3n%20sao%20Bijou/sale_page/index.html";
//             }
//         }

//         // Add click event listener to each span element
//         console.log("add event navigate");
//         spans.forEach(span => {
//             span.addEventListener('click', shopByCategoryClick);
//         });
//     }
// });