// components/HealthStatsCard.js

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const HealthStatsCard = ({ stats }) => {
  return (
    <Card style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' ,backgroundColor:'azure'}}>
      <CardContent>
        <Typography variant="body2">Height: {stats.height} cm</Typography>
        <Typography variant="body2">Weight: {stats.weight} kg</Typography>
        <Typography variant="body2">BMI: {stats.bmi}</Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2">Heart Rate: {stats.heartRate}</Typography>
        <Typography variant="body2">Blood Pressure: {stats.bloodPressure}</Typography>
        <Typography variant="body2">Glucose: {stats.glucose}</Typography>
      </CardContent>
    </Card>
  );
};

export default HealthStatsCard;
