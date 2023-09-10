import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

const MedicationCard = ({ drug, onClickDetail }) => 





(
  
  <Card style={{ marginBottom: '20px', backgroundColor: '#f5f5f5' }}>
    <CardContent>
      <Typography variant="h6">{drug.drug_name}</Typography>
      <Typography variant="body2">Generic Name: {drug.generic_name}</Typography>
      <Typography variant="body2">Prescription ID: {drug.prescription_id}</Typography>
      <Typography variant="body2"><strong>Prescription Date:</strong> {drug?.date ? (new Date(drug?.date)).toISOString().split("T")[0] : "N/A"}</Typography>

      <Button variant="contained" color="primary" onClick={() => onClickDetail(drug.drug_id, drug.prescription_id)}>
        Details
      </Button>
    </CardContent>
  </Card>
);

export default MedicationCard;
