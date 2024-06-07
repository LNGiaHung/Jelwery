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
function renderPieChart(){
    var cateName = [];
    var cateQuantity = [];
    fetch('http://localhost:3001/Products/all/byCate')
        .then(response => response.json())
        .then(data => {
            // Step 1: Parse the fetched data
            data.forEach(item => {
                cateName.push(item.category.Name);
                cateQuantity.push(item.productCount);
            });
            
            // Step 2: Update series and labels
            pieChartOptions.series = cateQuantity;
            pieChartOptions.labels = cateName;
            
            // Step 3: Render the pie chart
            var pieChart = new ApexCharts(document.querySelector("#pie-chart"), pieChartOptions);
            pieChart.render();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// Pie chart options
var pieChartOptions = {
    series: [], // Will be updated dynamically
    chart: {
        width: 550,
        type: 'pie',
    },
    labels: [], // Will be updated dynamically
    responsive: [{
        breakpoint: 700,
        options: {
            chart: {
                width: 300
            },
            legend: {
                position: 'bottom'
            }
        }
    }]
};

// Call the function to render the pie chart
renderPieChart();


  function updateAllCateData(Cate) {
    document.querySelector('.total-cate').innerText = Cate.total;
    console.log(Cate.total);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var start = 0
    var end = 15

    renderCategoryTable();
    fetchProducts(start,end)

    var popup = document.getElementById("popupForm");
    var addBtn = document.getElementById("addBtn");
    var span = document.getElementsByClassName("close")[0];

    // Open the modal and set title for adding a new category
    addBtn.onclick = function() {
        popupTitleCate.textContent = "Add a New Category";
        popup.style.display = "block";
    }

    // Close the modal when clicking on <span> (x)
    span.onclick = function() {
        popup.style.display = "none";
    }

    // Close the modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = "none";
        }
    }
    showProductAddForm();

    const prevButton = document.querySelector('.prev-page-btn');
    const nextButton = document.querySelector('.next-page-btn');

    prevButton.addEventListener('click', () => {
        console.log('Previous page button clicked');
        if(start===0)
        console.log('nomorepage');
        else{
        start -= 10;
        end -= 10;
        fetchProducts(start,end);
        }
    });
    nextButton.addEventListener('click', () => {
        console.log('Next page button clicked');
        start += 10;
        end += 10;
        fetchProducts(start,end);
    });
});

async function showCateAddForm() {
    const orderForm = document.getElementById("categoryForm");
    const categoryNameInput = document.getElementById('categoryName');

    orderForm.onsubmit = async function(event) {
        event.preventDefault();

        const newCateName = categoryNameInput.value;

        try {
            const response = await fetch("http://localhost:3001/cate/create", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: newCateName })
            });

            if (response.ok) {
                console.log('Category created successfully');
                closeOrderForm();
                window.location.reload();
            } else {
                console.error('Error creating category:', response.statusText);
            }
        } catch (error) {
            console.error('Error communicating with the server:', error);
        }
    };
}

function renderCategoryTable() {
    var popup = document.getElementById("popupForm");
    var span = document.getElementsByClassName("close")[0];
    var addBtn = document.getElementById("addBtn");

    addBtn.onclick = showCateAddForm() 

    fetch('http://localhost:3001/Cate')
      .then(response => response.json())
      .then(data => {
            const tableBody = document.querySelector('tbody');
            tableBody.innerHTML = '';

            updateAllCateData(data)

            data.invoices.forEach(invoice => {
                const row = document.createElement('tr');

                const idCell = document.createElement('td');
                idCell.textContent = invoice.ID;
                row.appendChild(idCell);

                const nameCell = document.createElement('td');
                nameCell.classList.add('CateName');
                nameCell.textContent = invoice.Name;
                row.appendChild(nameCell);

                const actionCell = document.createElement('td');

                // const deleteSpan = document.createElement('span');
                // deleteSpan.classList.add('status', 'return');
                // deleteSpan.textContent = 'Delete';
                // deleteSpan.addEventListener('click', () => deleteCategory(invoice.ID));
                // actionCell.appendChild(deleteSpan);

                const editSpan = document.createElement('span');
                editSpan.classList.add('status', 'inprogress', 'cateEditBtn');
                editSpan.textContent = 'Edit';
                editSpan.addEventListener('click', (event) => {
                    popupTitleCate.textContent = `Edit Category #${invoice.ID}`;
                    const categoryNameInput = document.getElementById('categoryName');
                    categoryNameInput.value = invoice.Name; // Directly set the value
                    popup.style.display = "block";
                    showCateEditForm(invoice.ID, categoryNameInput);
                });
                actionCell.appendChild(editSpan);

                row.appendChild(actionCell);
                tableBody.appendChild(row);
            });

            span.onclick = function() {
                popup.style.display = "none";
            }

            window.onclick = function(event) {
                if (event.target == popup) {
                    popup.style.display = "none";
                }
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

async function showCateEditForm(cateId, categoryNameInput) {
    const orderForm = document.getElementById("categoryForm");

    orderForm.onsubmit = async function(event) {
        event.preventDefault();

        const newCateName = categoryNameInput.value;

        try {
            const response = await fetch("http://localhost:3001/cate/update", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: cateId, name: newCateName })
            });

            if (response.ok) {
                console.log('Category updated successfully');
                closeOrderForm();
                window.location.reload();
            } else {
                console.error('Error updating category:', response.statusText);
            }
        } catch (error) {
            console.error('Error communicating with the server:', error);
        }
    };
}

async function deleteCategory(id) {
    try {
        const response = await fetch("http://localhost:3001/cate/delete", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        });

        if (response.ok) {
            console.log('Category delete successfully');
            closeOrderForm();
            window.location.reload();
        } else {
            console.error('Error deleting category:', response.statusText);
        }
    } catch (error) {
        console.error('Error communicating with the server:', error);
    }
}

function closeOrderForm() {
    const orderForm = document.getElementById("categoryForm");
    orderForm.style.display = "none";
}


function fetchProducts(start, end) {
    fetch('http://localhost:3001/Products/all')
        .then(response => response.json())
        .then(data => {
            console.log('product nek: ',data);
            const topProducts = data.Products.slice(start, end);
            const productTableBody = document.getElementById('productTableBody');
            productTableBody.innerHTML = ''; // Clear existing rows
            topProducts.forEach(product => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td>${product.PID}</td>
                    <td>${product.Name}</td>
                    <td>${product.category.Name}</td>
                    <td>${product.Quantity || 'N/A'}</td>
                    <td>
                        <span class="status return" onclick="deleteProduct(${product.id})">Delete</span>
                        <span class="status inprogress editProductBtn" onclick="editProduct(${product.id},'${product.PID}')">Edit</span>
                    </td>
                `;
                productTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching products:', error));
}


function fetchCategories() {
    fetch('http://localhost:3001/Cate')
        .then(response => response.json())
        .then(data => {
            const categorySelect = document.getElementById('productCategoryName');
            categorySelect.innerHTML = '<option value="0">Select Category:</option>'; // Reset options

            data.invoices.forEach(category => {
                const option = document.createElement('option');
                option.value = category.ID;
                option.textContent = category.Name;
                categorySelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching categories:', error));
}

function fetchCategories() {
    fetch('http://localhost:3001/Cate')
        .then(response => response.json())
        .then(data => {
            const categorySelect = document.getElementById('productCategoryName');
            categorySelect.innerHTML = '<option value="0">Select Category:</option>'; // Reset options

            data.invoices.forEach(category => {
                const option = document.createElement('option');
                option.value = category.ID;
                option.textContent = category.Name;
                categorySelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching categories:', error));
}

async function deleteProduct(productId) {
    try {
        const response = await fetch("http://localhost:3001/Products/delete", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: productId })
        });

        if (response.ok) {
            console.log('Category delete successfully');
            closeOrderForm();
            window.location.reload();
        } else {
            console.error('Error deleting category:', response.statusText);
        }
    } catch (error) {
        console.error('Error communicating with the server:', error);
    }
}

async function editProduct(productId, PID) {
    const productPopup = document.getElementById("popupProductForm");
    const productForm = document.getElementById("productForm");
    const closeProductPopupBtn = document.getElementsByClassName("productAddClose")[0];

    fetchCategories();

    document.getElementById("productPopupTitle").textContent = `Edit Product with ID: ${PID}`;
    productPopup.style.display = "block";

    productForm.onsubmit = async function (event) {
        event.preventDefault();

        const productName = document.getElementById('productName').value;
        const productCategoryName = document.getElementById('productCategoryName').value;
        const productQuantity = document.getElementById('productQuantity').value;
        console.log(productCategoryName)

        try {
            const response = await fetch("http://localhost:3001/Products/update", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: productId,
                    Name: productName,
                    CategoryId: productCategoryName,
                    Quantity: productQuantity
                })
            });

            if (response.ok) {
                console.log('Product updated successfully');
                productPopup.style.display = "none";
                console.log(response)
                window.location.reload();
            } else {
                console.error('Error updating product:', response.statusText);
            }
        } catch (error) {
            console.error('Error communicating with the server:', error);
        }
    };

    closeProductPopupBtn.onclick = function () {
        productPopup.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == productPopup) {
            productPopup.style.display = "none";
        }
    }
}

async function showProductAddForm() {
    const popup = document.getElementById('popupProductFormAdd');
    const openPopupButton = document.getElementById('addProductBtn');
    const closePopupButton = document.querySelector('.productAddClose');
    const categorySelect = document.getElementById('productCategoryNameAdd');
    const productFormAdd = document.getElementById('productFormAdd');

    async function fetchCategories() {
        try {
            const response = await fetch("http://localhost:3001/Cate");
            const data = await response.json();

            if (response.ok) {
                const categories = data.invoices;
                categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category.ID;
                    option.textContent = category.Name;
                    categorySelect.appendChild(option);
                });
            } else {
                console.error('Error fetching categories:', response.statusText);
            }
        } catch (error) {
            console.error('Error communicating with the server:', error);
        }
    }

    openPopupButton.addEventListener('click', () => {
        popup.style.display = 'block';
        fetchCategories(); // Fetch categories when the popup is opened
        console.log('open');
    });

    closePopupButton.addEventListener('click', () => {
        popup.style.display = 'none';
        console.log('close');
    });

    window.addEventListener('click', (event) => {
        if (event.target === popup) {
            popup.style.display = 'none';
            console.log('close');
        }
    });

    function nameToId(name) {
        // Convert to lowercase
        let idStr = name.toLowerCase();
        // Split the string into words
        let words = idStr.split(/\s+/);
        // Take the first two characters of each word
        let initials = words.map(word => {
          if (word.length >= 2) {
            return word.substring(0, 2).toUpperCase();
          } else {
            return word.toUpperCase();
          }
        }).join('');
        // Remove any non-alphanumeric characters
        initials = initials.replace(/[^A-Z0-9]/g, '');
        return initials;
    }

    productFormAdd.onsubmit = async function(event) {
        event.preventDefault();

        const newProductName = document.getElementById('productNameAdd').value;
        const newProductPrice = document.getElementById('productPriceAdd').value;
        const newProductMaterial = document.getElementById('productMaterialAdd').value;
        const newProductWeight = document.getElementById('productWeightAdd').value;
        const newProductStone = document.getElementById('productStoneAdd').value;
        const newProductSize = document.getElementById('productSizeAdd').value;
        const newProductCategory = document.getElementById('productCategoryNameAdd').value;
        const newProductQuantity = document.getElementById('productQuantityAdd').value;
        const newProductImage = document.getElementById('productImageAdd').value;
        const newProductImage1 = document.getElementById('productImage1').value;
        const newProductImage2 = document.getElementById('productImage2').value;
        const newProductImage3 = document.getElementById('productImage3').value;
        const newProductPID = nameToId(newProductName) + nameToId(newProductMaterial) + nameToId(newProductStone) + nameToId(newProductSize);

        const productData = {
            pid: newProductPID,
            name: newProductName,
            price: newProductPrice,
            material: newProductMaterial,
            weight: newProductWeight,
            stone: newProductStone,
            size: newProductSize,
            category: newProductCategory,
            quantity: newProductQuantity,
            image: newProductImage,
            image1: newProductImage1,
            image2: newProductImage2,
            image3: newProductImage3
        };

        try {
            const response = await fetch("http://localhost:3001/Products/create", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });

            if (response.ok) {
                console.log('Product created successfully');
                popup.style.display = 'none';
                window.location.reload();
            } else {
                console.error('Error creating product:', response.statusText);
            }
        } catch (error) {
            console.error('Error communicating with the server:', error);
        }
    };
}
