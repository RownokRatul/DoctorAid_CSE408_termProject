import React from 'react';
import { TextField, Grid, Box, Typography } from '@mui/material';

const CurrentAddressCard = ({ currentAddress, handleChange }) => {
  return (
    <Box padding={2} bgcolor="azure" borderRadius={2}>
      <Typography variant="h6" color="text.primary" gutterBottom>
        Current Address
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField label="Current Address" value={currentAddress.name} onChange={(e) => handleChange('name', e.target.value)} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="From" type="date" value={currentAddress.from} onChange={(e) => handleChange('from', e.target.value)} fullWidth InputLabelProps={{ shrink: true }} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CurrentAddressCard;
