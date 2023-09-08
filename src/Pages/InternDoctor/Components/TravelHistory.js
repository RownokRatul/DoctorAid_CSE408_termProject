import React from 'react';
import { TextField, Button, Grid, Box, Typography } from '@mui/material';

const HistoryCard = ({ histories, handlehistoryChange, addhistory }) => {
  return (
    <Box padding={2} bgcolor='beige' borderRadius={2} marginTop={0} paddingTop={5}>
      <Typography variant="h6" color="text.primary" gutterBottom align='center'>
        Previous Travel Histories
      </Typography>
      {histories.map((history, index) => (
        <Box marginBottom={3} key={index}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label="Travel Place" value={history.name} onChange={(e) => handlehistoryChange(index, 'name', e.target.value)} fullWidth />
            </Grid>
            <Grid item xs={6}>
              <TextField label="From" type="date" value={history.from} onChange={(e) => handlehistoryChange(index, 'from', e.target.value)} fullWidth InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={6}>
              <TextField label="To" type="date" value={history.to} onChange={(e) => handlehistoryChange(index, 'to', e.target.value)} fullWidth InputLabelProps={{ shrink: true }} />
            </Grid>
          </Grid>
          {index < history.length - 1 && <hr style={{ borderTop: '1px solid black', margin: '16px 0' }} />}
        </Box>
      ))}
      <Button variant="outlined" color="primary" onClick={addhistory}>
        Add More history
      </Button>
    </Box>
  );
};

export default HistoryCard;
