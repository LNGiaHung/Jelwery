// -------------------------Order Management ------------------------------
document.getElementById('editModeBtn').addEventListener('click', function(e) {
    e.preventDefault();
    const table = document.querySelector('.recentOrders table');
    table.classList.toggle('edit-mode');
    this.textContent = table.classList.contains('edit-mode') ? 'Save' : 'Edit Mode';
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
  
  