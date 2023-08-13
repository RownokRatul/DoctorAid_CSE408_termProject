import { Card, CardContent, Typography, Button } from '@mui/material';
import React from 'react';

const MedicationCard = ({ medicine, showDetail }) => (
  <Card style={{ margin: '10px', backgroundColor: '#f9f9f9' }}>
    <CardContent>
      <Typography variant="h5" style={{ color: 'blue' }}>
        {medicine.medicineName}
      </Typography>
      <Typography variant="body2">Generic Name: {medicine.genericName}</Typography>
      <Typography variant="body2">Started From: {medicine.startedFrom}</Typography>
      <Typography variant="body2">Doses: {medicine.doses}</Typography>
      <Typography variant="body2">Appointment No: {medicine.appointmentNo}</Typography>
      <Button variant="contained" color="primary" onClick={() => showDetail(medicine)}>
        Show Detail
      </Button>
    </CardContent>
  </Card>
);

export default MedicationCard;
