import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const OccupationCard = ({ occupations,title }) => {
  
  return (
    <Paper sx={{
      padding: 2,
      color: 'text.secondary',
      marginBottom: '1em',
      backgroundColor: '#f9f9f9'
    }}>
      <Typography variant="h6" sx={{
        backgroundColor: '#4caf50', // Green header
        color: 'common.white',
        padding: '0.5em',
        borderRadius: '4px 4px 0 0',
      }}>
        {title}
      </Typography>
      {occupations.map((occupation, index) => (
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0.5em 0',
          borderBottom: '1px solid #ddd',
        }} key={index}>
          <Typography variant="body1">{occupation.name}</Typography>
          <Box>
            <Typography variant="body2" sx={{ color: '#4caf50' }}>
              From: {occupation.from}
            </Typography>
            {' '}
            <Typography variant="body2" sx={{ color: '#f44336' }}>
              To: {occupation.to===undefined?"Present":occupation.to}
            </Typography>
          </Box>
        </Box>
      ))}
    </Paper>
  );
};

export default OccupationCard;
