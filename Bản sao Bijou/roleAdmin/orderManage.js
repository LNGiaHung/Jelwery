const API_BASE_URL = 'http://localhost:3001/Invoice';

function formatRevenue(totalRevenue) {
  if (totalRevenue > 1_000_000_000) return (totalRevenue / 1_000_000_000).toFixed(2) + 'B';
  if (totalRevenue > 1_000_000) return (totalRevenue / 1_000_000).toFixed(2) + 'M';
  if (totalRevenue > 1_000) return (totalRevenue / 1_000).toFixed(2) + 'K';
  return totalRevenue.toFixed(2) + 'đ';
}

async function fetchRevenueDataAndUpdateChart(year) {
  try {
    const response = await fetch(`${API_BASE_URL}/revenue/${year}`);
    const data = await response.json();

    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const currentYearRevenue = [];
    const lastYearRevenue = [
      234560000, 150000000, 4156231000, 641230000, 3654894000,
      452100000, 145620000, 421003000, 984512000, 845120000,
      214530000, 1871520000
    ];
    let totalRevenue = 0;
    let sales = 0;

    data.forEach(item => {
      currentYearRevenue.push(item.currentYearRevenue);
      totalRevenue += item.currentYearRevenue;
      sales += item.Sales;
    });

    document.querySelector('.total-amount-order').innerText = formatRevenue(totalRevenue);
    document.querySelector('.sale-qty').innerText = sales;

    const groupChartEarningOptions = {
      series: [
        { name: 'Last Year', group: 'budget', data: lastYearRevenue },
        { name: 'This Year', group: 'actual', data: currentYearRevenue }
      ],
      chart: { type: 'bar', height: 550, stacked: true },
      stroke: { width: 1, colors: ['#fff'] },
      dataLabels: { formatter: formatRevenue },
      plotOptions: { bar: { horizontal: false } },
      xaxis: { title: { text: 'Month' }, categories: months },
      fill: { opacity: 1 },
      colors: ['#80c7fd', '#00E396'],
      yaxis: {
        title: { text: 'Revenue' },
        labels: { formatter: formatRevenue }
      },
      legend: { position: 'top', horizontalAlign: 'left' }
    };

    const groupChartEarning = new ApexCharts(
      document.querySelector("#group-chart_earning-quantity"),
      groupChartEarningOptions
    );
    groupChartEarning.render();
  } catch (error) {
    console.error('Error fetching revenue data:', error);
  }
}

async function fetchAndDisplayInvoices(apiUrl, limit = null) {
  const tableBody = document.getElementById('invoice-table-body');
  tableBody.innerHTML = ''; // Clear existing table rows

  var editModeBtn = document.getElementById("editModeBtn");
  var popupOrderForm = document.getElementById("popupOrderForm");
  // var editStatusBtns = document.getElementsByClassName("editStatus");
  var popupTitleOrder = document.getElementById("popupTitleOrder");
  var closeOrderPopupBtn = document.getElementsByClassName("orderClose")[0];

  // Toggle edit mode and button text
  editModeBtn.addEventListener('click', function(e) {
    console.log("edit mode")
      e.preventDefault();
      const table = document.querySelector('table');
      table.classList.toggle('edit-mode');
      this.textContent = table.classList.contains('edit-mode') ? 'Save' : 'Edit Mode';
  });


  // Close the modal when the user clicks on <span> (x)
  closeOrderPopupBtn.onclick = function() {
      popupOrderForm.style.display = "none";
  }

  // Close the modal when the user clicks anywhere outside of the modal
  window.onclick = function(event) {
      if (event.target == popupOrderForm) {
          popupOrderForm.style.display = "none";
      }
  }


  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Network response was not ok');
    console.log(response)
    const data = await response.json();
    const invoices = limit ? data.slice(0, limit) : data;

    invoices.forEach(invoice => {
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${invoice.ID}</td>
        <td>${invoice.customer.FirstName + " " + invoice.customer.LastName}</td>
        <td>${invoice.Price.toLocaleString('vi-VN')}</td>
        <td>${invoice.Payment}</td>
        <td><span class="status ${invoice.Status.toLowerCase()}">${invoice.Status}</span></td>
      `;
      row.onclick = function() {
        console.log("click")
        if (document.querySelector('table').classList.contains('edit-mode')) {
          popupTitleOrder.textContent = "Edit Order Status";
          popupOrderForm.style.display = "block";
        }
      };

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error fetching invoices:', error);
  }
}

// Get the buttons by their IDs
const viewAllBtn = document.getElementById('viewAllBtn');
// Add onclick event to viewAllBtn
viewAllBtn.addEventListener('click', function() {
  fetchAndDisplayInvoices(`${API_BASE_URL}`);
    console.log('View All button clicked');
});

// Handle form submission
document.getElementById("orderForm").onsubmit = function(event) {
    event.preventDefault();
    var orderStatus = document.querySelector("#orderForm select").value;
    console.log("Order Status:", orderStatus);
    // Here you can add code to save the order status
    popupOrderForm.style.display = "none"; // Close the pop-up after saving
}

document.addEventListener('DOMContentLoaded', () => {
  const currentYear = new Date().getFullYear();
  document.querySelector('.year').innerText = currentYear;
  fetchRevenueDataAndUpdateChart(currentYear);
  fetchAndDisplayInvoices(`${API_BASE_URL}`, 10);
});

// Optional: Function to show all invoices if needed
async function showAllInvoices() {
  await fetchAndDisplayInvoices(`${API_BASE_URL}`);
}
