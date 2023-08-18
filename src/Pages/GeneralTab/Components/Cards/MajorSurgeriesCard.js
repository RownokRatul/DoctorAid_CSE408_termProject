// components/MajorSurgeriesCard.js

import React from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableRow, TableCell } from '@mui/material';

const MajorSurgeriesCard = ({ surgeries }) => {
  return (
    <Card style={{ marginBottom: '20px' , backgroundColor:"azure"}}>
      <CardContent>
        <Typography variant="h6">Major Surgeries</Typography>
        <Table>
          <TableBody>
            {surgeries.map((surgery, index) => (
              <TableRow key={index}>
                <TableCell>{surgery}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MajorSurgeriesCard;
