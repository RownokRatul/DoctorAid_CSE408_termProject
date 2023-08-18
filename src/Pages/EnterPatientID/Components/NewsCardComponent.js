import React from 'react';
import { Card, CardContent, Typography, CardMedia, CardActions, Button } from '@mui/material';

const NewsCard = ({ news }) => (
  <Card style={{ display: 'flex', marginBottom: '20px', backgroundColor: '#f5f5f5',borderTop: '0.5px solid gray' }}>
    <div style={{ flex: '1', padding: '10px' }}>
      <Typography variant="h6" style={{ fontWeight: 'bold' }}>{news.title}</Typography>
      <Typography variant="body2">{news.description.substring(0, 100)}...</Typography>
      <CardActions>
        <Button size="small" color="primary" onClick={() => window.open(news.url, '_blank')}>
          Read More
        </Button>
      </CardActions>
    </div>
    <CardMedia
      component="img"
      alt="News Thumbnail"
      height="100"
      image={news.urlToImage}
      style={{ width: '100px' }}
    />
  </Card>
);

export default NewsCard;
