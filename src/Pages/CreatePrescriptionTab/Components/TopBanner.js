import React from 'react';
import { Avatar, Grid } from '@mui/material';

function TopBanner({ patientInfo, prescriptionNo, avatarSrc }) {
  // Get current date and time
  const currentDate = new Date();
  const date = currentDate.toLocaleDateString();
  const time = currentDate.toLocaleTimeString();

  return (
    <Grid container className="top-banner" style={{
      border: '1px solid #ccc',
      padding: '10px',
      borderRadius: '5px',
      boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
      backgroundColor: 'azure',
      marginBottom: '20px',
    }}>
      <Grid item xs={3} style={{ paddingLeft: '10px' }}>
        <div>ID: {patientInfo.id}</div>
        <div>Name: {patientInfo.name}</div>
      </Grid>
      <Grid item xs={3}>
        <div>Prescription No: {prescriptionNo}</div>
        <div>Address: {patientInfo.address}</div>
      </Grid>
      <Grid item xs={3}>
        <div>Date: {date}</div>
        <div>Time: {time}</div>
      </Grid>
      <Grid item xs={3}>
        <Avatar src={avatarSrc} />
      </Grid>
    </Grid>
  );
}

export default TopBanner;
