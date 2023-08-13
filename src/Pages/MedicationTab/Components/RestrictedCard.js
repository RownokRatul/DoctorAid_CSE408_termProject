import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

const RestrictedCard = ({ medicine }) => (
  <Card style={{ margin: '10px', backgroundColor: '#f9f9f9' }}>
    <CardContent>
      <Typography variant="h5" style={{ color: 'red' }}>
        {medicine.medicineName}
      </Typography>
      <Typography variant="body2">Generic Name: {medicine.genericName}</Typography>
      <Typography variant="body2">Probable Side Effects: {medicine.sideEffects}</Typography>
    </CardContent>
  </Card>
);

export default RestrictedCard;
