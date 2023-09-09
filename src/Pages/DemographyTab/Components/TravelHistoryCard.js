// import { Card, CardContent, Typography } from '@mui/material';

// const TravelHistoryCard = ({ histories }) => (
//   <Card>
//     <CardContent>
//       <Typography variant="h6">Travel Histories</Typography>
//       {histories.map((travel, i) => (
//         <Typography key={i} variant="body2">
//           {travel.name} (From: {travel.from} - To: {travel.to})
//         </Typography>
//       ))}
//     </CardContent>
//   </Card>
// );

// export default TravelHistoryCard;





import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const TravelHistoryCard = ({ histories }) => {
  return (
    <Paper sx={{
      padding: 2,
      color: 'text.secondary',
      marginBottom: '1em',
      backgroundColor: '#f9f9f9',
      width: '50%',
      margin: '0 auto',
    }}>
      <Typography variant="h6" sx={{
        backgroundColor: '#ff9800',
        color: 'common.white',
        padding: '0.5em',
        borderRadius: '4px 4px 0 0',
      }}>
        Travel History
      </Typography>
      {histories.map((history, index) => (
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0.5em 0',
          borderBottom: '1px solid #ddd',
        }} key={index}>
          <Typography variant="body1">{history.name}</Typography>
          <Box>
            <Typography variant="body2" sx={{ color: '#ff9800' }}>
              From: {history.from}
            </Typography>
            <Typography variant="body2" sx={{ color: '#f44336' }}>
              To: {history.to}
            </Typography>
          </Box>
        </Box>
      ))}
    </Paper>
  );
};

export default TravelHistoryCard;

