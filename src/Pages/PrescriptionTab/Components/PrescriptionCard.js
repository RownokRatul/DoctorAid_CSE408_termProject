import { Card, CardContent, Typography, Button, Box } from '@mui/material';

const PrescriptionCard = ({ prescription, handleSeeMore }) => (
  <Card style={{ marginBottom: '20px', backgroundColor: '#f5f5f5' }}>
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography variant="h6">Prescription ID: {prescription.id}</Typography>
          <Typography variant="body2">Patient ID: {prescription.patient_id}</Typography>
          <Typography variant="body2">Date: {new Date(prescription.date).toISOString().split('T')[0]}</Typography>
          <Typography variant="body2">Findings: {prescription.findings}</Typography>
          <Typography variant="body2">Doctor: {prescription.doctor_username}</Typography>
        </Box>
        <Box>
          <Button variant="contained" color="primary" onClick={() => handleSeeMore(prescription.id)}>
            See More
          </Button>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default PrescriptionCard;
