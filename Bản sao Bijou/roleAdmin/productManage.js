// ===================product management==================
// stack column chart

var stackColChartOptions = {
    series: [{
        name: 'Product A',
        data: [44, 55, 41, 67, 22, 43]
    }, {
        name: 'Product B',
        data: [13, 23, 20, 8, 13, 27]
    }, {
        name: 'Product C',
        data: [11, 17, 15, 15, 21, 14]
    }, {
        name: 'Product D',
        data: [21, 7, 25, 13, 22, 8]
    }],
    chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
            show: true
        },
        zoom: {
            enabled: true
        }
    },
    responsive: [{
        breakpoint: 480,
        options: {
            legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
            }
        }
    }],
    plotOptions: {
        bar: {
            horizontal: false,
            borderRadius: 10,
            dataLabels: {
                total: {
                    enabled: true,
                    style: {
                        fontSize: '13px',
                        fontWeight: 900
                    }
                }
            }
        }
    },
    xaxis: {
        type: 'category',
        categories: ['Category A', 'Category B', 'Category C', 'Category D', 'Category E', 'Category F'],
    },
    legend: {
        position: 'right',
        offsetY: 40
    },
    fill: {
        opacity: 1
    }
  };
  
  var stackColChart = new ApexCharts(document.querySelector("#stackedCol-chart"), stackColChartOptions);
  stackColChart.render();
  

//   Polar chart

var pieChartOptions = {
    series: [44, 55, 13, 43, 22],
    chart: {
    width: 380,
    type: 'pie',
  },
  labels: ['Cate A', 'Cate B', 'Cate C', 'Cate D', 'Cate E'],
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
  };

  var pieChart = new ApexCharts(document.querySelector("#pie-chart"), pieChartOptions);
  pieChart.render();

// ========== Add new category ===========
// //   Pop up
// // Get the modal
// var popup = document.getElementById("popupForm");

// // Get the button that opens the modal
// var btn = document.getElementById("addBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks the button, open the modal 
// btn.onclick = function() {
//     popup.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//     popup.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == popup) {
//         popup.style.display = "none";
//     }
// }

// // Handle form submission
// document.getElementById("categoryForm").onsubmit = function(event) {
//     event.preventDefault();
//     var categoryName = document.getElementById("categoryName").value;
//     console.log("Category Name:", categoryName);
//     // Here you can add code to save the category
//     popup.style.display = "none"; // Close the pop-up after saving
// }

document.addEventListener('DOMContentLoaded', function () {
    var popup = document.getElementById("popupForm");
    var addBtn = document.getElementById("addBtn");
    var editBtns = document.getElementsByClassName("cateEditBtn");
    var popupTitleCate = document.getElementById("popupTitleCate");
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the add button, open the modal and set title
    addBtn.onclick = function() {
        popupTitleCate.textContent = "Add a New Category";
        popup.style.display = "block";
    }

    // When the user clicks on any edit button, open the modal and set title
    for (var i = 0; i < editBtns.length; i++) {
        editBtns[i].onclick = function() {
            popupTitleCate.textContent = "Edit Category";
            popup.style.display = "block";
        };
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        popup.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = "none";
        }
    }

    // Handle form submission
    document.getElementById("categoryForm").onsubmit = function(event) {
        event.preventDefault();
        var categoryName = document.getElementById("categoryName").value;
        console.log("Category Name:", categoryName);
        // Here you can add code to save the category
        popup.style.display = "none"; // Close the pop-up after saving
    }
});



// =======Pop up to add product========
// // Get the modal

document.addEventListener('DOMContentLoaded', function () {
    var productPopup = document.getElementById("popupProductForm");
    var addProductBtn = document.getElementById("addProductBtn");
    var editProductBtns = document.getElementsByClassName("editProductBtn");
    var productPopupTitle = document.getElementById("productPopupTitle");
    var closeProductPopupBtn = document.getElementsByClassName("productAddClose")[0];

    // When the user clicks the button, open the modal 
    function openModal(title) {
        productPopupTitle.textContent = title;
        productPopup.style.display = "block";
    }
    
    addProductBtn.onclick = function() {
        openModal("Add a New Product");
    };

    for (var i = 0; i < editProductBtns.length; i++) {
        editProductBtns[i].onclick = function() {
            openModal("Edit a Product");
        };
    }

    // When the user clicks on <span> (x), close the modal
    closeProductPopupBtn.onclick = function() {
        productPopup.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == productPopup) {
            productPopup.style.display = "none";
        }
    }

    // Handle form submission
    document.getElementById("productForm").onsubmit = function(event) {
        event.preventDefault();
        var productName = document.getElementById("productName").value;
        var categoryNames = Array.from(document.getElementById("productCategoryName").selectedOptions).map(option => option.value);
        var productQuantity = document.getElementById("productQuantity").value;

        console.log("Product Name:", productName);
        console.log("Category Names:", categoryNames);
        console.log("Product Quantity:", productQuantity);

        // Add code to save the product here (GIA HUNG)
        productPopup.style.display = "none"; // Close the pop-up after saving
    }

    // Show hidden options when the select is clicked
    var categorySelect = document.getElementById('productCategoryName');
    categorySelect.addEventListener('mousedown', function () {
        var options = categorySelect.getElementsByClassName('categoryOption');
        for (var i = 0; i < options.length; i++) {
            options[i].style.display = 'block';
        }
    });
});

