import {React,useState,useContext,useEffect} from 'react';
import { Avatar, Grid } from '@mui/material';
import { PatientContext } from '../../../PatientContext'
import axios from 'axios';

function TopBanner ({ prescriptionNo, avatarSrc ,data}) {
  // Get current date and time
  const currentDate = new Date();
  const date = currentDate.toLocaleDateString();
  const time = currentDate.toLocaleTimeString();



  const dummy = {
    id: 1,
    name: 'Jon Doe',
    address: '123 Nguyen Van Cu, P.1, Q.5, TP.HCM',
    avatarSrc: 'https://material-ui.com/static/images/avatar/1.jpg',
  };


  

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
        <div>ID: {dummy.id}</div>
        <div>Name: {dummy.name}</div>
      </Grid>
      <Grid item xs={3}>
        <div>Address: {dummy.address}</div>
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
