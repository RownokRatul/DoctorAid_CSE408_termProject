import React from 'react';
import { Card, CardContent, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';

const DateRangeCard = ({ criteria, handleCriteriaChange }) => (
  <Card>
    <CardContent>
      <h3>Date Range</h3>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="From"
          value={criteria.fromDate}
          onChange={(value) => handleCriteriaChange('fromDate', value)}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="To"
          value={criteria.toDate}
          onChange={(value) => handleCriteriaChange('toDate', value)}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </CardContent>
  </Card>
);

export default DateRangeCard;
