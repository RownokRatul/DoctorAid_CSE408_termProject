import React, { useState } from 'react';
import { Box, Dialog, DialogContent, DialogTitle, Typography, Button } from '@mui/material';
import MedicationCard from './Components/MedicationCard'
import RestrictedCard from './Components/RestrictedCard'

// Mock data with additional details
const medicationList = [
  {
    medicineName: 'Aspirin',
    genericName: 'Acetylsalicylic Acid',
    startedFrom: '01/01/2021',
    doses: '100mg',
    appointmentNo: '12345',
    uses: 'Pain relief, fever reduction',
    sideEffects: 'Nausea, vomiting',
  },
  {
    medicineName: 'Aspirin',
    genericName: 'Acetylsalicylic Acid',
    startedFrom: '01/01/2021',
    doses: '100mg',
    appointmentNo: '12345',
    uses: 'Pain relief, fever reduction',
    sideEffects: 'Nausea, vomiting',
  },
  {
    medicineName: 'Aspirin',
    genericName: 'Acetylsalicylic Acid',
    startedFrom: '01/01/2021',
    doses: '100mg',
    appointmentNo: '12345',
    uses: 'Pain relief, fever reduction',
    sideEffects: 'Nausea, vomiting',
  },
  {
    medicineName: 'Aspirin',
    genericName: 'Acetylsalicylic Acid',
    startedFrom: '01/01/2021',
    doses: '100mg',
    appointmentNo: '12345',
    uses: 'Pain relief, fever reduction',
    sideEffects: 'Nausea, vomiting',
  },
  {
    medicineName: 'Aspirin',
    genericName: 'Acetylsalicylic Acid',
    startedFrom: '01/01/2021',
    doses: '100mg',
    appointmentNo: '12345',
    uses: 'Pain relief, fever reduction',
    sideEffects: 'Nausea, vomiting',
  },
  // Add more as needed
];

const restrictedList = [
  {
    medicineName: 'Ibuprofen',
    genericName: 'Ibuprofen',
    sideEffects: 'Stomach pain, nausea',
  },
  {
    medicineName: 'Ibuprofen',
    genericName: 'Ibuprofen',
    sideEffects: 'Stomach pain, nausea',
  },
  {
    medicineName: 'Ibuprofen',
    genericName: 'Ibuprofen',
    sideEffects: 'Stomach pain, nausea',
  },
  {
    medicineName: 'Ibuprofen',
    genericName: 'Ibuprofen',
    sideEffects: 'Stomach pain, nausea',
  },
  {
    medicineName: 'Ibuprofen',
    genericName: 'Ibuprofen',
    sideEffects: 'Stomach pain, nausea',
  },
  {
    medicineName: 'Ibuprofen',
    genericName: 'Ibuprofen',
    sideEffects: 'Stomach pain, nausea',
  },
  // Add more as needed
];

const MedicationTab = () => {
  const [detail, setDetail] = useState(null);

  const showDetail = (medicine) => {
    setDetail(medicine); // Set the detailed medicine information to display in the dialog
  };

  const handleClose = () => {
    setDetail(null); // Close the dialog by setting the detail to null
  };

  return (
    <Box display="flex" width="100%">
      {/* Left Flexbox */}
      <Box width="70%" overflow="auto">
        {/* Add a heading here , and keep the heading at center, add little top margin*/}
        <Typography variant="h4" style={{ textAlign: 'center', marginTop: '20px' }}>Medication List</Typography>
        
        
        {medicationList.map((med, index) => (
          <MedicationCard key={index} medicine={med} showDetail={showDetail} />
        ))}
      </Box>

      {/* Right Flexbox */}
      <Box width="30%" overflow="auto">
        {/* Add a heading here , and keep the heading at center, add little top margin*/}
        <Typography variant="h4" style={{ textAlign: 'center', marginTop: '20px' }}>Restrictions</Typography>
        {restrictedList.map((med, index) => (
          <RestrictedCard key={index} medicine={med} />
        ))}
      </Box>

      <Dialog onClose={handleClose} open={detail !== null}>
        <DialogTitle>{detail?.medicineName}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Generic Name: {detail?.genericName}</Typography>
          <Typography variant="body1">Uses: {detail?.uses}</Typography>
          <Typography variant="body1">Side Effects: {detail?.sideEffects}</Typography>
          <Button onClick={handleClose}>Close</Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MedicationTab;
