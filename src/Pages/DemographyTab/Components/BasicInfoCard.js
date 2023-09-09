import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const BasicInfoCard = ({ name, gender, age }) => {
  return (
    <Paper sx={{
      padding: 2,
      color: 'text.secondary',
      marginBottom: '1em',
      backgroundColor: 'azure',
      width: '50%',
      margin: '0 auto',
    }}>
      <Typography variant="h6" sx={{
        backgroundColor: '#2196f3',
        color: 'common.white',
        padding: '0.5em',
        borderRadius: '4px 4px 0 0',
        textAlign: 'center',
        
      }}>
        Basic Information
      </Typography>
      <Box sx={{ padding: '1em' }} textAlign={'center'}>
        <Typography variant="body1" color={'black'}>Name: {name}</Typography>
        <Typography variant="body1" color={'black'}>Gender: {gender}</Typography>
        <Typography variant="body1" color={'black'}>Age: {age}</Typography>
      </Box>
    </Paper>
  );
};

export default BasicInfoCard;
