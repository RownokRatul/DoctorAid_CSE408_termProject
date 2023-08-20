import React from 'react';
import { Card, CardContent, Button, Typography } from '@mui/material';

const SearchResult = ({ result, onSeeMore }) => {
  const handleSeeMore = () => {
    if (result.type === 'tests') {
      fetch(`api/v0/test_details/${result.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => onSeeMore(data))
        .catch((err) => console.error('Failed to fetch test details:', err));
    } else {
      onSeeMore(result);
    }
  };
}

export default SearchResult;
