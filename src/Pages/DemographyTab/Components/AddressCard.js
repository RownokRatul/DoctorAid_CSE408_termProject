import React from 'react';
import { Paper, Typography, Grid, Box } from '@mui/material';

const AddressCard = ({ addresses,title }) => {
  
  return (
    <Paper sx={{
      padding: 2,
      color: 'text.secondary',
      marginBottom: '1em',
      backgroundColor: '#f9f9f9'  // Light grey background
    }}>
      <Typography variant="h6" sx={{
        backgroundColor: '#3f51b5', // Dark blue header
        color: 'common.white',
        padding: '0.5em',
        borderRadius: '4px 4px 0 0',
      }}>
        {title}
      </Typography>
      {addresses.map((address, index) => (
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0.5em 0',
          borderBottom: '1px solid #ddd',
        }} key={index}>
          <Typography variant="body1">{address.name}</Typography>
          <Box>
            <Typography variant="body2" sx={{ color: '#3f51b5' }}>
              From: {address.from}
            </Typography>
            {' '}
            <Typography variant="body2" sx={{ color: '#f44336' }}>
              To: {address.to===undefined?"Present":address.to}
            </Typography>
          </Box>
        </Box>
      ))}
    </Paper>
  );
};

export default AddressCard;
