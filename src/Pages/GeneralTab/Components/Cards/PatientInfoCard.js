// components/PatientInfoCard.js

import React from 'react';
import { Card, CardContent, Avatar, Typography } from '@mui/material';

const PatientInfoCard = ({ patient }) => {
  return (
    <Card style={{ marginBottom: '20px' }}>
      <CardContent style={{ display: 'flex' }}>
        <Avatar src={patient.avatar} alt={patient.name} />
        <div style={{ marginLeft: '10px' }}>
          <Typography variant="h6">{patient.name}</Typography>
          <Typography variant="body2">Age: {patient.age}</Typography>
          <Typography variant="body2">Contact: {patient.contact}</Typography>
          {/* Add other patient details here */}
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientInfoCard;
