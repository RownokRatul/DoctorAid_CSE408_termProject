import React from 'react';
import { Card, CardContent, TextField, Button } from '@mui/material';

const SearchKeyCard = ({ criteria, handleCriteriaChange, handleSearch }) => (
  <Card>
    <CardContent>
      <h3>Search Key</h3>
      <TextField
        label="Search Key"
        value={criteria.searchKey}
        onChange={(e) => handleCriteriaChange('searchKey', e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
    </CardContent>
  </Card>
);

export default SearchKeyCard;
