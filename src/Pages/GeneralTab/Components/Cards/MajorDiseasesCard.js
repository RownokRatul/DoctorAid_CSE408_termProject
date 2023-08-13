// components/MajorDiseasesCard.js

import React from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableRow, TableCell } from '@mui/material';

const MajorDiseasesCard = ({ diseases }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Major Chronic Diseases</Typography>
        <Table>
          <TableBody>
            {diseases.map((disease, index) => (
              <TableRow key={index}>
                <TableCell>{disease}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MajorDiseasesCard;
