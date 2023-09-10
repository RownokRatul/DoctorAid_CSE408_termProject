import React, { useState, useContext, useEffect } from 'react';
import { Typography, Button, Dialog, DialogContent, DialogTitle, Paper, Box,Grid, LinearProgress } from '@mui/material';
import MedicationCard from './Components/MedicationCard';
import { usePatientIDValidation } from '../../PatientIDValidation';
import { PatientContext } from '../../PatientContext';


const MedicationTab = () => {

  usePatientIDValidation();
  const [detail, setDetail] = useState(null);

  const { patientID } = useContext(PatientContext);
  //convert to int
  const [prescribedDrugs, setPrescribedDrugs] = useState([]);
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log("Patient ID:", patientID);

  useEffect(() => {
    if(patientID === null) return;
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch('api/v0/get_prescribed_drugs_by_patient_id/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ patient_id: patientID }),
        });
        const result = await response.json();
        setPrescribedDrugs(result.data);
        console.log("Prescribed drugs:", result.data);
      } catch (error) {
        console.error('Failed to fetch prescribed drugs:', error);
      }
      finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [patientID]);

const handleClickDetail = async (drugId, prescriptionId) => {
  try {
    // First, fetch the drug metadata.
    // const metadataResponse = await fetch('api/v0/get_drug_metadata/', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ drug_id: drugId }),
    // });

    const valuesResponse = await fetch('api/v0/get_prescribed_drug_by_drug_id/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prescription_id: prescriptionId, drug_id: drugId }),
    });
    const drugDetails = await valuesResponse.json();

    console.log("Drug details:", drugDetails.data);
    setSelectedDrug(drugDetails.data);
    setDialogOpen(true);

  }catch (error) {
    console.error('Failed to fetch drug details:', error);
  }
};

const handleCloseDialog = () => {
  setDialogOpen(false);
};return (


  <div style={{ backgroundColor: '#eaeaea', padding: '20px' }}>

    <h1 style={{ textAlign: "center", marginTop: "50px" }}>Prescribed Drugs</h1>

    {isLoading ? (
      <LinearProgress color="success" />
    ) : (
      <>
        
        {prescribedDrugs.length === 0 ? (
          <Typography variant="body1" style={{ textAlign: 'center' }}>
            No drugs prescribed.
          </Typography>
        ) : (
          <Box>
            {prescribedDrugs.map((drug) => (
    
              <MedicationCard key={drug.drug_id} drug={drug} onClickDetail={handleClickDetail} />
            ))}
          </Box>
        )}
    
        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
          <DialogTitle>{selectedDrug?.brandName}</DialogTitle>
          <DialogContent>
            <Paper style={{ padding: '20px' }}>
              <Typography variant="h6" gutterBottom>Drug Details</Typography>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Typography variant="body2"><strong>Generic Name:</strong> {selectedDrug?.genericName}</Typography>
                  <Typography variant="body2"><strong>Prescription ID:</strong> {selectedDrug?.prescriptionId}</Typography>
                  <Typography variant="body2"><strong>Dosage:</strong> {selectedDrug?.prescribedDosage}</Typography>
                  <Typography variant="body2"><strong>Prescription Date:</strong> {selectedDrug?.prescriptionDate ? (new Date(selectedDrug?.prescriptionDate)).toISOString().split("T")[0] : "N/A"}</Typography>
                  <Typography variant="body2"><strong>Doctor:</strong> {selectedDrug?.doctor_username}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2"><strong>Adult Dosage:</strong> {selectedDrug?.adultDosage}</Typography>
                  <Typography variant="body2"><strong>Child Dosage:</strong> {selectedDrug?.childDosage}</Typography>
                  <Typography variant="body2"><strong>Brand:</strong> {selectedDrug?.brand}</Typography>
                  <Typography variant="body2"><strong>Uses:</strong> {selectedDrug?.usecases.join(', ')}</Typography>
                  <Typography variant="body2"><strong>Adverse Effects:</strong> {selectedDrug?.adverseEffects.join(', ')}</Typography>
                </Grid>
              </Grid>
              <Button variant="contained" color="primary" onClick={handleCloseDialog} style={{ marginTop: '20px' }}>Close</Button>
            </Paper>
          </DialogContent>
        </Dialog>
        
      </>
    )}

  </div>
);

};

export default MedicationTab;