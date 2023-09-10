// components/PatientInfoCard.js

import React from 'react';
import { Card, CardContent, Avatar, Typography } from '@mui/material';
import avatar from "../Images/avatar.png"

const PatientInfoCard = ({ patient }) => {
  return (
    <Card style={{ marginBottom: '20px',backgroundColor:'azure' }}>
      <CardContent style={{ display: 'flex' }}>
         <Avatar src={avatar} alt={patient.name} sx={{ width: 100, height: 100 }}/> 
        <div style={{ marginTop:"20px"}}>
          <Typography variant="h6">{patient.name}</Typography>
          <Typography variant="body2">Age: {patient.age}</Typography>
          <Typography variant="body2">Contact: {patient.phone}</Typography>
          {/* Add other patient details here */}
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientInfoCard;
