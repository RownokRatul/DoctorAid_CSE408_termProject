import React from 'react';
import { Card, CardContent, Button } from '@mui/material';

const TagsCard = ({ commonTags, criteria, handleCriteriaChange }) => (
  <Card>
    <CardContent>
      <h3>Tags</h3>
      {commonTags.map((tag) => (
        <Button
          key={tag}
          onClick={() => handleCriteriaChange('tags', [...criteria.tags, tag])}
        >
          {tag}
        </Button>
      ))}
      <div>Selected Tags: {criteria.tags.join(', ')}</div>
    </CardContent>
  </Card>
);

export default TagsCard;
