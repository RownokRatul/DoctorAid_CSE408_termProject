import React from 'react';
import { TextField, Grid, Box, Typography } from '@mui/material';

const CurrentOccupationCard = ({ currentOccupation, handleChange }) => {
  return (
    <Box padding={2} bgcolor='beige' borderRadius={2}>
      <Typography variant="h6" color="text.primary" gutterBottom align='center'>
        Current Occupation
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField label="Current Occupation" value={currentOccupation.name} onChange={(e) => handleChange('name', e.target.value)} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="From" type="date" value={currentOccupation.from} onChange={(e) => handleChange('from', e.target.value)} fullWidth InputLabelProps={{ shrink: true }} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CurrentOccupationCard;
