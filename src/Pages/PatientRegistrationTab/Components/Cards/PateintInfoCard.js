import React from 'react';
import { TextField, MenuItem, Grid, Box,Typography } from '@mui/material';

const BasicInfoCard = ({ info, handleChange }) => {
  return (
    <Box padding={2} bgcolor="azure" p={5} boxShadow={20} borderRadius={2} marginTop={0}>
      <Typography variant="h6" color="text.primary" gutterBottom>
        Basic Information
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField label="Name" value={info.name} onChange={(e) => handleChange('name', e.target.value)} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Phone" value={info.phone} onChange={(e) => handleChange('phone', e.target.value)} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="NID" value={info.nid} onChange={(e) => handleChange('nid', e.target.value)} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="DOB" type="date" value={info.dob} onChange={(e) => handleChange('dob', e.target.value)} fullWidth InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid item xs={12}>
          <TextField select label="Gender" value={info.gender} onChange={(e) => handleChange('gender', e.target.value)} fullWidth>
            <MenuItem value="F">Female</MenuItem>
            <MenuItem value="M">Male</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField label="Hometown" value={info.hometown} onChange={(e) => handleChange('hometown', e.target.value)} fullWidth />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BasicInfoCard;
