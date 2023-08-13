// components/RightFlexbox.js

import React from 'react';
import { Card, List, ListItem } from '@mui/material';

function RightFlexbox() {
  const prescriptions = [
    { id: 1, date: '2023-08-12', info: 'Prescription 1' },
    { id: 2, date: '2023-08-11', info: 'Prescription 2' },
  ]; // Dummy data for prescriptions

  return (
    <div className="right-flexbox">
      <List>
        {prescriptions.map((prescription) => (
          <Card key={prescription.id}>
            <ListItem>{prescription.date}</ListItem>
            <ListItem>{prescription.info}</ListItem>
          </Card>
        ))}
      </List>
    </div>
  );
}

export default RightFlexbox;
