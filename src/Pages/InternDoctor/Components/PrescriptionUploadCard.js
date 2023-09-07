import React from 'react';
import { TextField, Button, Box, Typography, Grid } from '@mui/material';

const PrescriptionCard = ({ prescriptions, handlePrescriptionChange, addPrescription }) => {
  return (
    <Box padding={2} bgcolor="azure" borderRadius={2} marginBottom={3}>
      <Typography variant="h6" color="text.primary" gutterBottom>
        Prescription Upload
      </Typography>
      {prescriptions.map((prescription, index) => (
        <Box marginBottom={3} key={index}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.pdf"
                onChange={(e) => handlePrescriptionChange(index, 'file', e.target.files[0])}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Date"
                type="date"
                value={prescription.date}
                onChange={(e) => handlePrescriptionChange(index, 'date', e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </Box>
      ))}
      <Button variant="outlined" color="primary" onClick={addPrescription}>
        Add More Prescription
      </Button>
    </Box>
  );
};

export default PrescriptionCard;
