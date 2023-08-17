import React from 'react';
import { TextField, Button, Grid, Box, Typography } from '@mui/material';

const historyCard = ({ occupations, handleOccupationChange, addOccupation }) => {
  return (
    <Box padding={2} bgcolor='beige' borderRadius={2} marginTop={0} paddingTop={5}>
      <Typography variant="h6" color="text.primary" gutterBottom align='center'>
        Previous Occupations
      </Typography>
      {occupations.map((occupation, index) => (
        <Box marginBottom={3} key={index}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label="Occupation" value={occupation.name} onChange={(e) => handleOccupationChange(index, 'name', e.target.value)} fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField label="From" type="date" value={occupation.from} onChange={(e) => handleOccupationChange(index, 'from', e.target.value)} fullWidth InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="To" type="date" value={occupation.to} onChange={(e) => handleOccupationChange(index, 'to', e.target.value)} fullWidth InputLabelProps={{ shrink: true }} />
            </Grid>
          </Grid>
          {index < occupation.length - 1 && <hr style={{ borderTop: '1px solid black', margin: '16px 0' }} />}
        </Box>
      ))}
      <Button variant="outlined" color="primary" onClick={addOccupation}>
        Add More Occupation
      </Button>
    </Box>
  );
};

export default historyCard;
