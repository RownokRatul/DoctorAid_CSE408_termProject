import React from 'react';
import { Line } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js'; 
import Chart from 'chart.js/auto'; 

Chart.register(CategoryScale);

const HeartRate = ({ heartRates }) => {
  const { heart_rates,  taken_ats } = heartRates;

  const data = {
    labels: taken_ats.map((date) => new Date(date).toLocaleDateString()),
    datasets: [
      {
        label: 'Heart Rate',
        data: heart_rates,
        borderColor: 'green',
        fill: true,
      }
    ],
  };

  return <Line data={data} />;
};

export default HeartRate;
