import React from 'react';
import { TextField, Button, Grid, Box, Typography } from '@mui/material';

const AddressCard = ({ addresses, handleAddressChange, addAddress }) => {
  return (
    <Box padding={2} bgcolor="azure" borderRadius={2} marginTop={0} paddingTop={5}>
      <Typography variant="h6" color="text.primary" gutterBottom align='center'>
        Previous Addresses
      </Typography>
      {addresses.map((address, index) => (
        <Box marginBottom={3} key={index}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label="Address" value={address.name} onChange={(e) => handleAddressChange(index, 'name', e.target.value)} fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField label="From" type="date" value={address.from} onChange={(e) => handleAddressChange(index, 'from', e.target.value)} fullWidth InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="To" type="date" value={address.to} onChange={(e) => handleAddressChange(index, 'to', e.target.value)} fullWidth InputLabelProps={{ shrink: true }} />
            </Grid>
          </Grid>
          {index < addresses.length - 1 && <hr style={{ borderTop: '1px solid black', margin: '16px 0' }} />}
        </Box>
      ))}
      <Button variant="outlined" color="primary" onClick={addAddress}>
        Add More Address
      </Button>
    </Box>
  );
};

export default AddressCard;
