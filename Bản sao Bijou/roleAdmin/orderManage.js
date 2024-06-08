const API_BASE_URL = 'http://localhost:3001/Invoice';

function formatRevenue(totalRevenue) {
  if (totalRevenue > 1_000_000_000) return (totalRevenue / 1_000_000_000).toFixed(2) + 'B';
  if (totalRevenue > 1_000_000) return (totalRevenue / 1_000_000).toFixed(2) + 'M';
  if (totalRevenue > 1_000) return (totalRevenue / 1_000).toFixed(2) + 'K';
  return totalRevenue.toFixed(2) + 'đ';
}

let groupChartEarning;
const groupChartEarningOptions = {
  series: [
    { name: 'Last Year', group: 'budget', data: [] },
    { name: 'This Year', group: 'actual', data: [] }
  ],
  chart: { type: 'bar', height: 550, stacked: true },
  stroke: { width: 1, colors: ['#fff'] },
  dataLabels: { formatter: (value) => formatRevenue(value) },
  plotOptions: { bar: { horizontal: false } },
  xaxis: { title: { text: 'Month' }, categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
  fill: { opacity: 1 },
  colors: ['#80c7fd', '#00E396'],
  yaxis: { title: { text: 'Revenue' }, labels: { formatter: (value) => formatRevenue(value) } },
  legend: { position: 'top', horizontalAlign: 'left' }
};

async function fetchGraph(year) {
  try {
    const response = await fetch(`${API_BASE_URL}/revenue/${year}`);
    const data = await response.json();

    const currentYearRevenue = data.map(item => item.currentYearRevenue);
    const lastYearRevenue = data.map(item => item.lastYearRevenue);
    const totalRevenue = data.reduce((sum, item) => sum + item.currentYearRevenue, 0);
    const sales = data.reduce((sum, item) => sum + item.Sales, 0);

    groupChartEarningOptions.series[0].data = lastYearRevenue;
    groupChartEarningOptions.series[1].data = currentYearRevenue;

    document.querySelector('.total-amount-order').innerText = formatRevenue(totalRevenue);
    document.querySelector('.sale-qty').innerText = sales;

    if (!groupChartEarning) {
      groupChartEarning = new ApexCharts(document.querySelector("#group-chart_earning-quantity"), groupChartEarningOptions);
      groupChartEarning.render();
    } else {
      groupChartEarning.updateOptions(groupChartEarningOptions);
    }
  } catch (error) {
    console.error('Error fetching revenue data:', error);
  }
}

async function ShowInvoices(start, end) {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    const data = await response.json();
    console.log("Fetched data:", data); // Log fetched data for debugging
    const topInvoices = data.slice(start, end);
    localStorage.setItem('InvLength', data.length);

    const invoiceTableBody = document.querySelector('.InvoiceTable tbody');
    invoiceTableBody.innerHTML = topInvoices.map(invoice => `
      <tr data-id="${invoice.ID}" class="InvoiceLine">
        <td>${invoice.ID}</td>
        <td>${invoice.customer.FirstName} ${invoice.customer.LastName}</td>
        <td>${formatRevenue(invoice.Price)}</td>
        <td>${invoice.Payment}</td>
        <td><span class="status ${invoice.Status.toLowerCase().replace(/\s+/g, '')} editStatus">${invoice.Status}</span></td>
      </tr>
    `).join('');

    document.querySelectorAll('.InvoiceLine').forEach(row => {
      row.addEventListener('click', (event) => {
        if (localStorage.getItem('editMode') === 'off') {
          const invoiceId = row.getAttribute('data-id');
          showDetailForm(invoiceId);
        }
      });
    });

    addEditModeListeners();
  } catch (error) {
    console.error('Error fetching invoices:', error);
  }
}


function formatPrice(price) {
  // Convert the price to a string
  let priceString = price.toString();

  // Split the string into parts before and after the decimal point
  let parts = priceString.split('.');

  // Format the part before the decimal point
  let formattedPrice = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // If there is a part after the decimal point, add it back
  if (parts.length > 1) {
    formattedPrice += ',' + parts[1];
  }

  return formattedPrice;
}

async function showDetailForm(invoice) {
  try {
    const response = await fetch(`${API_BASE_URL}/detail/${invoice}`);
    const data = await response.json();
    
    // Get the popup element
    const popup = document.getElementById('popupViewOrder');
    
    // Set the title
    document.getElementById('popupTitleOrderDetails').innerText = 'View Order Details';

    // Initialize a counter for row numbers
    let i = 1;

    // Generate the table rows for each product in the invoice
    const rows = data.flatMap(item => item.details.map(detail => {
      const row = `
        <tr>
          <td>${i}</td>
          <td>${detail.Products}</td>
          <td>${detail.Quantity}</td>
          <td>${formatPrice(detail.UnitPrice)}</td>
          <td>${formatPrice(detail.Total)}</td>
          <td><span class="status ${item.Status.toLowerCase().replace(/\s+/g, '')} editStatus">${item.Status}</span></td>
        </tr>`;
      i++;
      return row;
    })).join('');

    // Set the table body content
    const tableBody = popup.querySelector('tbody');
    tableBody.innerHTML = rows;

    // Calculate the total amount
    const totalAmount = data.reduce((sum, item) => {
      const detailsTotal = item.details.reduce((acc, detail) => acc + detail.Total, 0);
      return sum + detailsTotal;
    }, 0);

    // Set the total amount
    document.getElementById('totalAmount').innerText = `${formatPrice(totalAmount)} VND`;

    // Show the popup
    popup.style.display = 'block';

    // Add event listener to close button
    popup.querySelector('.orderDetailsClose').addEventListener('click', () => {
      popup.style.display = 'none';
    });

    // Close popup when clicking outside of it
    window.addEventListener('click', (event) => {
      if (event.target === popup) {
        popup.style.display = 'none';
      }
    });
  } catch (error) {
    console.error('Error fetching invoices:', error);
  }
}




async function ShowRecentCustomers(number = null) {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    const data = await response.json();
    const topCustomers = number ? data.slice(0, number) : data;
    const customerTableBody = document.querySelector('.recentCustomers table tbody');
    customerTableBody.innerHTML = topCustomers.map(customer => `
      <tr>
        <td width="60px">
          <div class="imgBox"><img src="../assets/img/avt_girl.png" alt=""></div>
        </td>
        <td>
          <h4>${customer.customer.LastName}<br><span>${customer.customer.Address}</span></h4>
        </td>
      </tr>
    `).join('');
  } catch (error) {
    console.error('Error fetching recent customers:', error);
  }
}

function addEditModeListeners() {
  const editModeBtn = document.getElementById('editModeBtn');
  const orderCloseBtn = document.querySelector('.orderClose');

  editModeBtn.addEventListener('click', toggleEditMode);
  orderCloseBtn.addEventListener('click', closeOrderForm);

  const editableRows = document.querySelectorAll('.InvoiceTable tbody tr');
  editableRows.forEach(row => {
    row.addEventListener('click', (event) => {
      if (localStorage.getItem('editMode') === 'on') {
        showOrderForm(event);
      }
    });
  });
}

function showOrderForm(event) {
  const row = event.currentTarget;
  const orderId = row.dataset.id;
  const orderStatus = row.querySelector('.status').textContent.toLowerCase();
  const orderForm = document.getElementById('orderForm');
  const statusSelect = orderForm.querySelector('select');

  statusSelect.value = getStatusValueFromText(orderStatus);

  document.getElementById('popupOrderForm').style.display = 'flex';
  document.getElementById('popupTitleOrder').textContent = `Edit Order #${orderId}`;

  orderForm.onsubmit = async function(event) {
    event.preventDefault();
    const selectedOption = statusSelect.options[statusSelect.selectedIndex];
    const newStatus = selectedOption.text;

    try {
      const response = await fetch(`${API_BASE_URL}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: orderId, status: newStatus })
      });

      if (response.ok) {
        console.log('Order status updated successfully');
        closeOrderForm();
        window.location.reload(); // Reload the page after successful update
      } else {
        console.error('Error updating order status');
      }
    } catch (error) {
      console.error('Error communicating with the server:', error);
    }
  };
}

function toggleEditMode() {
  const table = document.querySelector('table');
  table.classList.toggle('edit-mode');
  localStorage.setItem('editMode', table.classList.contains('edit-mode') ? 'on' : 'off');
  this.textContent = table.classList.contains('edit-mode') ? 'Save' : 'Edit Mode';
}

function closeOrderForm() {
  document.getElementById('popupOrderForm').style.display = 'none';
}

function getStatusValueFromText(statusText) {
  const statusMap = {
    delivered: '1',
    pending: '2',
    return: '3',
    'in progress': '4'
  };
  return statusMap[statusText] || '0';
}

async function searchInvoices(id) {
  id = parseInt(id, 10);
  try {
    const response = await fetch(`${API_BASE_URL}/search/${id}`);
    const data = await response.json();
    if(data){
      const invoiceTableBody = document.querySelector('.InvoiceTable tbody');
      invoiceTableBody.innerHTML = `
        <tr data-id="${data.ID}">
          <td>${data.ID}</td>
          <td>${data.customer.FirstName} ${data.customer.LastName}</td>
          <td>${formatRevenue(data.Price)}</td>
          <td>${data.Payment}</td>
          <td><span class="status ${data.Status.toLowerCase().replace(/\s+/g, '')} editStatus">${data.Status}</span></td>
        </tr>
      `;

      addEditModeListeners();
    }else{
      ShowInvoices(0,10);
    }
  } catch (error) {
    console.error('Error fetching invoices:', error);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const currentYear = new Date().getFullYear();

  yearShow = document.getElementById('currentYear');
  yearShow.innerText = currentYear;

  localStorage.setItem('editMode', 'off');

  document.getElementById('editModeBtn').addEventListener('click', toggleEditMode);

  document.querySelector('.orderClose').onclick = closeOrderForm;

  window.onclick = function(event) {
    if (event.target == document.getElementById('popupOrderForm')) {
      closeOrderForm();
    }
  };

  const searchInput = document.getElementById('searchInput');
  const searchIcon = document.getElementById('searchIcon');

  // Event listener for Enter key press
  searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
          searchInvoices(searchInput.value);
      }
  });

  // Event listener for magnifying glass icon click
  searchIcon.addEventListener('click', searchInvoices(searchInput.value));

  const prevButton = document.querySelector('.prev-page-btn');
  const nextButton = document.querySelector('.next-page-btn');

  prevButton.addEventListener('click', () => {
    console.log('Previous page button clicked');
    if(start===0)
      console.log('nomorepage');
    else{
      start -= 10;
      end -= 10;
      ShowInvoices(start,end);
    }
  });
  nextButton.addEventListener('click', () => {
    console.log('Next page button clicked');
    start += 10;
    end += 10;
    if(start > localStorage.getItem('InvLength')){
      start = 0;
      end = 10;
  }
    ShowInvoices(start,end);
  });

  var start = 0
  var end = 10

  fetchGraph(currentYear);
  ShowInvoices(start,end);
  ShowRecentCustomers(7);
});


