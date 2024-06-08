// Fetch all invoices
function fetchInvoice() {
  return fetch('http://localhost:3001/Invoice')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Update HTML with fetched data
      console.log('product fetch 1');
      updateHTMLWithInvoice(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

// Fetch invoices with status 'Done'
function fetchDoneInvoice() {
  return fetch('http://localhost:3001/Invoice/status/done')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      updateDoneInvoiceData(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function CountInvoice() {
  return fetch('http://localhost:3001/Invoice/all')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      updateAllInvoiceData(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function CountProducts() {
  return fetch('http://localhost:3001/Products/all')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      updateAllProductData(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function fetchSoldProducts() {
  return fetch('http://localhost:3001/Products/status/available')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      updateSoldProductData(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function fetchInvoiceByMonthForAreaChart(year) {
  return fetch(`http://localhost:3001/Invoice/Year/${year}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      UpdateAreaChart(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function fetchInvoiceByMonthForBarChart(year) {
  return fetch(`http://localhost:3001/Invoice/Year/${year}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      UpdateBarChart(data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

// Update HTML with the number of 'Done' invoices
function updateDoneInvoiceData(DoneInvoiceData) {
  document.querySelector('.sale-order').innerText = DoneInvoiceData.total;
  console.log(DoneInvoiceData.total);
}

function updateSoldProductData(DoneInvoiceData) {
  document.querySelector('.available-product').innerText = DoneInvoiceData.total;
  console.log(DoneInvoiceData.total);
}

function updateAllInvoiceData(DoneInvoiceData) {
  document.querySelector('.purchase-order').innerText = DoneInvoiceData.total;
  console.log(DoneInvoiceData.total);
}

function updateAllProductData(DoneInvoiceData) {
  document.querySelector('.product-qty').innerText = DoneInvoiceData.total;
  console.log(DoneInvoiceData.total);
}

// Fetch data when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('hello');
  const currentYear = new Date().getFullYear();
  fetchDoneInvoice();
  CountInvoice()
  CountProducts()
  fetchSoldProducts(); 
  fetchInvoiceByMonthForAreaChart(currentYear);
  fetchInvoiceByMonthForBarChart(currentYear-1);
  yearShow = document.getElementById('currentYear');
  yearShow.innerText = currentYear;
  document.getElementById('Logout').addEventListener('click', function() {
    console.log("Logging out...");
    sessionStorage.removeItem('user');
    location.href="../singIn/signIn.html";
  });
  document.getElementById('DashBoard').addEventListener('click', function() {
    location.href="./statistic.html";
  });
  document.getElementById('ProductPage').addEventListener('click', function() {
    location.href="./productManage.html";
  });
  document.getElementById('SaleOrderPage').addEventListener('click', function() {
    location.href="./orderManage.html";
  });
});

var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");

function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add("sidebar-responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove("sidebar-responsive");
    sidebarOpen = false;
  }
}

// ----------CHARTS-----------
function UpdateBarChart(invoiceData) {
  const months = invoiceData.map((entry) => entry.month);
  const doneCounts = invoiceData.map((entry) => entry.doneCount);
  const All = invoiceData.map((entry) => entry.All);

  var barChartOptions = {
    series: [{
      data: All,
    }],
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false
      },
    },
    colors: [
      "#246dec",
      "#cc3c43",
      "#367952",
      "#f5b74f",
      "#4f35a1"
    ],
    plotOptions: {
      bar: {
        distribute: true,
        borderRadius: 4,
        horizontal: false,
        columnWidth: '40%',
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    xaxis: {
      categories: months,
    },
    yaxis: {
      title: {
        text: "Number of Sales"
      }
    }
  };
  
  var barChart = new ApexCharts(document.querySelector("#bar-chart"), barChartOptions);
  barChart.render();
}


function UpdateAreaChart(invoiceData) {
  const months = invoiceData.map((entry) => entry.month);
  const doneCounts = invoiceData.map((entry) => entry.doneCount);
  const All = invoiceData.map((entry) => entry.All);

  const areaChartOptions = {
    series: [
      {
        name: 'Sale Orders (Done)',
        data: doneCounts,
      },
      {
        name: 'Purchase Orders (All)',
        data: All,
      },
    ],
    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        show: false,
      },
    },
    colors: ["#4f35a1", "#246dec"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    labels: months,
    markers: {
      size: 0,
    },
    yaxis: [
      {
        title: {
          text: 'Sale Orders (Done)',
        },
      },
      {
        opposite: true,
        title: {
          text: 'Purchase Orders (All)',
        },
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  const areaChart = new ApexCharts(document.querySelector("#area-chart"), areaChartOptions);
  areaChart.render();
}


// -------------------------Order Management ------------------------------


// Area chart for quantity and earning on 12 months
// const areaChartEarningOptions = {
//   series: [
//     {
//       name: 'Sale Orders (Done)',
//       data: doneCounts,
//     },
//     {
//       name: 'Purchase Orders (All)',
//       data: All,
//     },
//   ],
//   chart: {
//     height: 350,
//     type: 'area',
//     toolbar: {
//       show: false,
//     },
//   },
//   colors: ["#4f35a1", "#246dec"],
//   dataLabels: {
//     enabled: false,
//   },
//   stroke: {
//     curve: 'smooth',
//   },
//   labels: months,
//   markers: {
//     size: 0,
//   },
//   yaxis: [
//     {
//       title: {
//         text: 'Earning',
//       },
//     },
//     {
//       opposite: true,
//       title: {
//         text: 'Quantity',
//       },
//     },
//   ],
//   tooltip: {
//     shared: true,
//     intersect: false,
//   },
// };
// const areaChartEarning = new ApexCharts(document.querySelector("#area-chart_earning-quantity"), areaChartEarningOptions);
// areaChartEarning.render();
