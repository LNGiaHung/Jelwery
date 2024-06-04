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
    const totalRevenue = data.reduce((sum, item) => sum + item.currentYearRevenue, 0);
    const sales = data.reduce((sum, item) => sum + item.Sales, 0);

    groupChartEarningOptions.series[0].data = [
      234560000, 150000000, 4156231000, 641230000, 3654894000, 452100000, 145620000, 421003000, 984512000, 845120000, 214530000, 1871520000
    ];
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

function ShowInvoices(number = null) {
  fetch(`${API_BASE_URL}`)
    .then(response => response.json())
    .then(data => {
      const invoices = data;
      const topInvoices = number ? invoices.slice(0, number) : invoices;
      const invoiceTableBody = document.querySelector('.InvoiceTable tbody');
      invoiceTableBody.innerHTML = topInvoices.map(invoice => `
        <tr>
          <td>${invoice.ID}</td>
          <td>${invoice.customer.FirstName} ${invoice.customer.LastName}</td>
          <td>${formatRevenue(invoice.Price)}</td>
          <td>${invoice.Payment}</td>
          <td><span class="status ${invoice.Status.toLowerCase()} editStatus">${invoice.Status}</span></td>
        </tr>
      `).join('');

      addEditModeListeners();
    })
    .catch(error => {
      console.error('Error fetching invoices:', error);
    });
}

function ShowRecentCustomers(number = null) {
  fetch(`${API_BASE_URL}`)
    .then(response => response.json())
    .then(data => {
      const customers = data;
      const topCustomers = number ? customers.slice(0, number) : customers;
      const customerTableBody = document.querySelector('.recentCustomers table tbody');
      customerTableBody.innerHTML = topCustomers.map(customer => `
        <tr>
          <td width="60px">
            <div class="imgBox"> <img src="../assets/img/avt_girl.png" alt=""></div>
          </td>
          <td>
            <h4>${customer.customer.LastName}<br><span>${customer.customer.Address}</span></h4>
          </td>
        </tr>
      `).join('');
    })
    .catch(error => {
      console.error('Error fetching recent customers:', error);
    });
}

function addEditModeListeners() {
  const editModeBtn = document.getElementById('editModeBtn');
  const orderCloseBtn = document.querySelector('.orderClose');
  const orderForm = document.getElementById('orderForm');

  editModeBtn.addEventListener('click', toggleEditMode);
  orderCloseBtn.addEventListener('click', closeOrderForm);
  orderForm.addEventListener('submit', updateOrderStatus);

  const editStatusBtns = document.querySelectorAll('.editStatus');
  editStatusBtns.forEach(statusElement => {
    statusElement.classList.add('editable');
    statusElement.addEventListener('click', (event) => {
      if (localStorage.getItem('editMode')==='on') {
        showOrderForm(event);
      }
    });
  });
}

function toggleEditMode() {
  const table = document.querySelector('table');
  table.classList.toggle('edit-mode');
  if(table.classList.contains('edit-mode'))
    localStorage.setItem('editMode','on')
  else
    localStorage.setItem('editMode','off')
  this.textContent = table.classList.contains('edit-mode') ? 'Save' : 'Edit Mode';
}

function showOrderForm(event) {
  const statusElement = event.target;
  const orderId = statusElement.parentElement.parentElement.firstElementChild.textContent;
  const orderStatus = statusElement.textContent.toLowerCase();

  const statusSelect = document.getElementById('orderForm').querySelector('select');
  statusSelect.value = getStatusValueFromText(orderStatus);

  document.getElementById('popupOrderForm').style.display = 'flex';
  document.getElementById('popupTitleOrder').textContent = `Edit Order #${orderId}`;
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

function updateOrderStatus(event) {
  event.preventDefault();
  console.log('Updating order status...');
  closeOrderForm();
}


document.addEventListener('DOMContentLoaded', function () {
  const currentYear = new Date().getFullYear();
  localStorage.setItem('editMode','off')

  const popupOrderForm = document.getElementById("popupOrderForm");
  const editModeBtn = document.getElementById("editModeBtn");
  const popupTitleOrder = document.getElementById("popupTitleOrder");
  const closeOrderPopupBtn = document.querySelector(".orderClose");
  const showAllBtn = document.getElementById("showAllBtn");

  editModeBtn.addEventListener('click', toggleEditMode);
  showAllBtn.addEventListener('click', () => {ShowInvoices(null);ShowRecentCustomers(null);});

  const editStatusBtns = document.getElementsByClassName("editStatus");
  for (let i = 0; i < editStatusBtns.length; i++) {
    editStatusBtns[i].onclick = showOrderForm;
  }

  closeOrderPopupBtn.onclick = closeOrderForm;

  window.onclick = function(event) {
    if (event.target == popupOrderForm) {
      closeOrderForm();
    }
  }

  fetchGraph(currentYear);
  ShowInvoices(10);
  ShowRecentCustomers(5)
});