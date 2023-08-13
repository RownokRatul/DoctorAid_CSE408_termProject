import React from 'react';
import { Button, Grid, TextField } from '@mui/material';
import cleaningButton from './Image/cleaning.png'


function BottomBanner({ handleSave, handlePrint, handleClearAll }) {
  return (
    <Grid container className="bottom-banner" style={{ backgroundColor: '#f0f0f0', padding: '10px' }}>
      <Grid item xs={9}>
        <TextField fullWidth placeholder="Remarks" style={{ marginBottom: '10px', width: '100%' }} />
        <TextField fullWidth placeholder="Findings" style={{ width: '100%' }} />
      </Grid>
      <Grid item xs={3} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Button variant="contained" color="primary" onClick={handleSave} style={{ marginRight: '10px' }}>Save</Button>
        <Button variant="contained" color="secondary" onClick={handlePrint} style={{ marginRight: '10px' }}>Print</Button>
        <Button onClick={handleClearAll} style={{ marginRight: '10px' }}>
            <img src={cleaningButton} alt="Clear All" style={{ width: '40px', height: '40px' }} />
        </Button>
      </Grid>
    </Grid>
  );
}

export default BottomBanner;
