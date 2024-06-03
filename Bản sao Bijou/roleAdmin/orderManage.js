// -------------------------Order Management ------------------------------
// document.getElementById('editModeBtn').addEventListener('click', function(e) {
//     e.preventDefault();
//     const table = document.querySelector('.recentOrders table');
//     table.classList.toggle('edit-mode');
//     this.textContent = table.classList.contains('edit-mode') ? 'Save' : 'Edit Mode';
//   });

document.addEventListener('DOMContentLoaded', function () {
    var popupOrderForm = document.getElementById("popupOrderForm");
    var editModeBtn = document.getElementById("editModeBtn");
    var editStatusBtns = document.getElementsByClassName("editStatus");
    var popupTitleOrder = document.getElementById("popupTitleOrder");
    var closeOrderPopupBtn = document.getElementsByClassName("orderClose")[0];

    // Toggle edit mode and button text
    editModeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const table = document.querySelector('table');
        table.classList.toggle('edit-mode');
        this.textContent = table.classList.contains('edit-mode') ? 'Save' : 'Edit Mode';
    });

    // Open modal when any editStatus button is clicked
    for (var i = 0; i < editStatusBtns.length; i++) {
        editStatusBtns[i].onclick = function() {
            if (document.querySelector('table').classList.contains('edit-mode')) {
                popupTitleOrder.textContent = "Edit Order Status";
                popupOrderForm.style.display = "block";
            }
        };
    }

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

    // Handle form submission
    document.getElementById("orderForm").onsubmit = function(event) {
        event.preventDefault();
        var orderStatus = document.querySelector("#orderForm select").value;
        console.log("Order Status:", orderStatus);
        // Here you can add code to save the order status
        popupOrderForm.style.display = "none"; // Close the pop-up after saving
    }
});

  
  var groupChartEarningOptions = {
    series: [
    {
      name: 'Last Year',
      group: 'budget',
      data: [44000, 55000, 41000, 67000, 22000, 43000]
    },
    {
      name: 'This Year',
      group: 'actual',
      data: [64000, 35000, 46000, 60000, 62000, 40000]
    }
  ],
    chart: {
    type: 'bar',
    height: 550,
    stacked: true,
  },
  stroke: {
    width: 1,
    colors: ['#fff']
  },
  dataLabels: {
    formatter: (val) => {
      return val / 1000 + 'K'
    }
  },
  plotOptions: {
    bar: {
      horizontal: false
    }
  },
  xaxis: {
    title: {
      text: 'Month'
    },
    categories: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      // 'July'
      // 'August',
      // 'September',
      // 'October',
      // 'November',
      // 'December'
    ]
  },
  fill: {
    opacity: 1
  },
  colors: ['#80c7fd', '#00E396'],
  yaxis: {
    title: {
      text: 'Revenue'
    },
    labels: {
      formatter: (val) => {
        return val / 1000 + 'K'
      }
    }
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left'
  }
  };
  
  var groupChartEarning = new ApexCharts(document.querySelector("#group-chart_earning-quantity"), groupChartEarningOptions);
  groupChartEarning.render();
  
  