import React, { useState, useContext, useEffect } from 'react';
// import { Box, Dialog, DialogContent, DialogTitle, Typography, Button } from '@mui/material';
import MedicationCard from './Components/MedicationCard'
import RestrictedCard from './Components/RestrictedCard'
import { Card, CardContent, Typography, Button, Box, Dialog, DialogContent, DialogTitle, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { usePatientIDValidation } from '../../PatientIDValidation';
import { PatientContext } from '../../PatientContext'



// // Mock data with additional details
// const medicationList = [
//   {
//     medicineName: 'Aspirin',
//     genericName: 'Acetylsalicylic Acid',
//     startedFrom: '01/01/2021',
//     doses: '100mg',
//     appointmentNo: '12345',
//     uses: 'Pain relief, fever reduction',
//     sideEffects: 'Nausea, vomiting',
//   },
 
//   // Add more as needed
// ];

// const restrictedList = [
//   {
//     medicineName: 'Ibuprofen',
//     genericName: 'Ibuprofen',
//     sideEffects: 'Stomach pain, nausea',
//   },
 
//   // Add more as needed
// ];

const MedicationTab = () => {


  usePatientIDValidation();
  const [detail, setDetail] = useState(null);

  const { patientID } = useContext(PatientContext);
  const [prescribedDrugs, setPrescribedDrugs] = useState([]);
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);


  useEffect(() => {
    if(patientID === null) return;

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
      } catch (error) {
        console.error('Failed to fetch prescribed drugs:', error);
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
    setSelectedDrug(drugDetails.data);
    setDialogOpen(true);

  }catch (error) {
    console.error('Failed to fetch drug details:', error);
  }
};

const handleCloseDialog = () => {
  setDialogOpen(false);
};

return (
  <div>
  <h1 style={{textAlign:"center",marginTop:"50px"}}>Prescribed Drugs</h1>
  {prescribedDrugs.length === 0 ? (
    <Typography variant="body1" style={{ textAlign: 'center' }}>
      No drugs prescribed.
    </Typography>
  ) : (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Drug Name</TableCell>
          <TableCell>Generic Name</TableCell>
          <TableCell>Started From</TableCell>
          <TableCell>Appointment No.</TableCell>
          <TableCell>Details</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {prescribedDrugs.map((drug) => (
          <TableRow key={drug.drug_id}>
            <TableCell>{drug.drug_name}</TableCell>
            <TableCell>{drug.generic_name}</TableCell>
            <TableCell>{(new Date(drug.date)).toISOString().split("T")[0]}</TableCell>
            {/* <TableCell>{drug.date}</TableCell> */}
            <TableCell>{drug.prescription_id}</TableCell>
            <TableCell>
              <Button onClick={() => handleClickDetail(drug.drug_id, drug.prescription_id)}>Details</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )}

  <Dialog open={dialogOpen} onClose={handleCloseDialog}>
    <Paper style={{ padding: '20px' }}>
      <Typography variant="h6">{selectedDrug?.brandName}</Typography>
      <Typography variant="body2">Generic Name: {selectedDrug?.genericName}</Typography>
      <Typography variant="body2">Prescription ID: {selectedDrug?.prescription_id}</Typography>
      <Typography variant="body2">Dosage: {selectedDrug?.prescribedDosage}</Typography>
      <Typography variant="body2">Prescription Date: {(new Date(selectedDrug?.prescriptionDate)).toISOString().split("T")[0]}</Typography>
      {/* <Typography  variant="body2">Prescription Date: {selectedDrug?.prescriptionDate}</Typography> */}
      <Button onClick={handleCloseDialog}>Close</Button>
    </Paper>
  </Dialog>
  
  </div>
)



  // const showDetail = (medicine) => {
  //   setDetail(medicine); // Set the detailed medicine information to display in the dialog
  // };

  // const handleClose = () => {
  //   setDetail(null); // Close the dialog by setting the detail to null
  // };

  // return (
  //   <Box display="flex" width="100%">
  //     {/* Left Flexbox */}
  //     <Box width="70%" overflow="auto">
  //       {/* Add a heading here , and keep the heading at center, add little top margin*/}
  //       <Typography variant="h4" style={{ textAlign: 'center', marginTop: '20px' }}>Medication List</Typography>
        
        
  //       {medicationList.map((med, index) => (
  //         <MedicationCard key={index} medicine={med} showDetail={showDetail} />
  //       ))}
  //     </Box>

  //     {/* Right Flexbox */}
  //     <Box width="30%" overflow="auto">
  //       {/* Add a heading here , and keep the heading at center, add little top margin*/}
  //       <Typography variant="h4" style={{ textAlign: 'center', marginTop: '20px' }}>Restrictions</Typography>
  //       {restrictedList.map((med, index) => (
  //         <RestrictedCard key={index} medicine={med} />
  //       ))}
  //     </Box>

  //     <Dialog onClose={handleClose} open={detail !== null}>
  //       <DialogTitle>{detail?.medicineName}</DialogTitle>
  //       <DialogContent>
  //         <Typography variant="body1">Generic Name: {detail?.genericName}</Typography>
  //         <Typography variant="body1">Uses: {detail?.uses}</Typography>
  //         <Typography variant="body1">Side Effects: {detail?.sideEffects}</Typography>
  //         <Button onClick={handleClose}>Close</Button>
  //       </DialogContent>
  //     </Dialog>
  //   </Box>
  // );
};

export default MedicationTab;
