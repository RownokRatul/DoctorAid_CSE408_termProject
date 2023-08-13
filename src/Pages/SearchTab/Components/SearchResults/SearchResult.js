import React from 'react';
import { Card, CardContent, Button, Typography } from '@mui/material';

const SearchResult = ({ result, onSeeMore }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{result.type}</Typography>
        <Typography variant="body1">Date: {result.date}</Typography>
        <Typography variant="body1">
          Tags: <strong>{result.tags.join(', ')}</strong>
        </Typography>
        <Button onClick={() => onSeeMore(result)}>See More</Button>
      </CardContent>
    </Card>
  );
};

export default SearchResult;
