// components/HeartRateChart.js

import React from 'react';
import { Line } from 'react-chartjs-2';



import { CategoryScale } from 'chart.js'; 
import Chart from 'chart.js/auto'; 

Chart.register(CategoryScale);



const HeartRateChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Heart Rate',
        data: [70, 72, 75, 73, 74],
        borderColor: 'blue',
        fill: false,
      },
    ],
  };

  return <Line data={data} />;
};

export default HeartRateChart;
