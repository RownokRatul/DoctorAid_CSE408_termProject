import React from 'react';
import { Line } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js'; 
import Chart from 'chart.js/auto'; 

Chart.register(CategoryScale);

const BloodPressure = ({ bloodPressure }) => {
  const { value_highs, value_lows, taken_ats } = bloodPressure;

  const data = {
    labels: taken_ats.map((date) => new Date(date).toLocaleDateString()),
    datasets: [
      {
        label: 'Blood Pressure High',
        data: value_highs,
        borderColor: 'red',
        fill: true,
      },
      {
        label: 'Blood Pressure Low',
        data: value_lows,
        borderColor: 'blue',
        fill: true,
      },
    ],
  };

  return <Line data={data} />;
};

export default BloodPressure;
