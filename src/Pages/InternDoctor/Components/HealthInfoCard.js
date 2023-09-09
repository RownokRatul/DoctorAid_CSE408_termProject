// Components/HealthInfoCard.js
import React from 'react';
import { CardContent, TextField, Typography } from '@mui/material';

const HealthInfoCard = ({ healthInfo, handleHealthInfoChange }) => {
  return (
    <CardContent>
      <Typography variant="h5">Health Information</Typography>
      <TextField
        label="Height"
        onChange={(e) => handleHealthInfoChange('height', e.target.value)}
      />
      <TextField
        label="Weight"
        onChange={(e) => handleHealthInfoChange('weight', e.target.value)}
      />
      <TextField
        label="Heart Rate"
        onChange={(e) => handleHealthInfoChange('heartRate', e.target.value)}
      />
      <TextField
        label="Blood Pressure Low"
        onChange={(e) => handleHealthInfoChange('bpLow', e.target.value)}
      />
      <TextField
        label="Blood Pressure High"
        onChange={(e) => handleHealthInfoChange('bpHigh', e.target.value)}
      />
    </CardContent>
  );
};

export default HealthInfoCard;
