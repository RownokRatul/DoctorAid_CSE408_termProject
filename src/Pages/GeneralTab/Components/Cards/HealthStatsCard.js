// components/HealthStatsCard.js

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const HealthStatsCard = ({ stats }) => {

  const length1 = stats.heart_rate_data.heart_rates.length
  const length2 = stats.blood_pressure_data.taken_ats.length

  console.log(stats.heart_rate_data.heart_rates[length1-1])
  console.log(stats.blood_pressure_data.value_highs[length2-1])

  const bmi = stats.weight / ((stats.height/100)**2)
  return (
    <Card style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' ,backgroundColor:'azure'}}>
      <CardContent>
        <Typography variant="body2">Height: {stats.height} cm</Typography>
        <Typography variant="body2">Weight: {stats.weight} kg</Typography>
        <Typography variant="body2">BMI: {bmi}</Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2">Heart Rate: {stats.heart_rate_data.heart_rates[length1-1]}</Typography>
        <Typography variant="body2">Blood Pressure High: {stats.blood_pressure_data.value_highs[length2-1]}</Typography>
        <Typography variant="body2">Blood pressure Low: {stats.blood_pressure_data.value_lows[length2-1]}</Typography>
      </CardContent>
    </Card>
  );
};

export default HealthStatsCard;
