function formatRevenue(totalRevenue) {
  if (totalRevenue > 1000000000)
    return (totalRevenue / 1000000000).toFixed(2) + 'B';
  else if (totalRevenue > 1000000)
    return (totalRevenue / 1000000).toFixed(2) + 'M';
  else if (totalRevenue > 1000)
    return (totalRevenue / 1000).toFixed(2) + 'K';
  else
    return totalRevenue.toFixed(2) + 'đ';
}

async function fetchRevenueDataAndUpdateChart(year) {
  const response = await fetch(`http://localhost:3001/Invoice/revenue/${year}`); // Adjust the API endpoint if needed
  const data = await response.json();

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentYearRevenue = [];
  const lastYearRevenue = [
    234560000,
    150000000,
    4156231000,
    641230000,
    3654894000,
    452100000,
    145620000,
    421003000,
    984512000,
    845120000,
    214530000,
    1871520000
  ];
  var totalRevenue = 0;
  var Sales = 0;

  data.forEach(item => {
    currentYearRevenue.push(item.currentYearRevenue);
    // lastYearRevenue.push(item.lastYearRevenue);
    totalRevenue += item.currentYearRevenue;
    Sales += item.Sales;
  });

  
  const formattedTotalRevenue = formatRevenue(totalRevenue);
  document.querySelector('.total-amount-order').innerText = formattedTotalRevenue;
  console.log(totalRevenue);

  document.querySelector('.sale-qty').innerText = Sales;
  console.log(Sales);

  var groupChartEarningOptions = {
    series: [
      {
        name: 'Last Year',
        group: 'budget',
        data: lastYearRevenue
      },
      {
        name: 'This Year',
        group: 'actual',
        data: currentYearRevenue
      }
    ],
    chart: {
      type: 'bar',
      height: 550,
      stacked: true
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    dataLabels: {
      formatter: (val) => {
        if (val > 1000000000)
          return (val / 1000000000).toFixed(2) + 'B';
        else if (val > 1000000)
          return (val / 1000000).toFixed(2) + 'M';
        else if (val > 1000)
          return (val / 1000).toFixed(2) + 'K';
        else
          return val.toFixed(2) + 'đ';
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
      categories: months
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
          if (val > 1000000000)
            return (val / 1000000000).toFixed(2) + 'B';
          else if (val > 1000000)
            return (val / 1000000).toFixed(2) + 'M';
          else if (val > 1000)
            return (val / 1000).toFixed(2) + 'K';
          else
            return val.toFixed(2) + 'đ';
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
}


document.addEventListener('DOMContentLoaded', () => {
  const currentYear = new Date().getFullYear();
  document.querySelector('.year').innerText = currentYear;
  fetchRevenueDataAndUpdateChart(currentYear);
});

