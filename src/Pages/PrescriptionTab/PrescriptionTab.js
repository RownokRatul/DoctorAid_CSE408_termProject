import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, LinearProgress, Pagination, Dialog, DialogTitle, DialogContent, Paper, Button,FormControlLabel, Switch } from '@mui/material';
// import { Box, Typography, LinearProgress, Pagination,  } from '@mui/material';
import PrescriptionCard from './Components/PrescriptionCard';
import { PatientContext } from '../../PatientContext';

const PrescriptionTab = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);
  const [filterMine, setFilterMine] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [prescriptionDetail, setPrescriptionDetail] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [allDiseases, setAllDiseases] = useState([]);
  const [allTests, setAllTests] = useState([]);
  const [allDrugs, setAllDrugs] = useState([]);

  const itemsPerPage = 5;
  const { patientID, doctorInfo } = useContext(PatientContext);

  useEffect(() => {
    fetch('api/v0/get_all_diseases')
      .then(res => res.json())
      .then(data => setAllDiseases(data.data))
      .catch(err => console.error('Failed to fetch diseases:', err));

    fetch('api/v0/get_all_tests')
      .then(res => res.json())
      .then(data => setAllTests(data.data))
      .catch(err => console.error('Failed to fetch tests:', err));

    fetch('api/v0/get_all_brand_drugs')
      .then(res => res.json())
      .then(data => setAllDrugs(data.data))
      .catch(err => console.error('Failed to fetch Drugs:', err));

  }, []);


  useEffect(() => {
    setIsLoading(true);
    fetch('/api/v0/get_prescriptions_by_patient_id', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ patient_id: patientID }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPrescriptions(data.data);
        setFilteredPrescriptions(data.data);
        setTotalCount(data.data.length);
      })
      .catch((error) => console.error('Error fetching prescriptions:', error))
      .finally(() => setIsLoading(false));
  }, [patientID]);


  useEffect(() => {
    console.log("Inside useEffect 2 of Diagnostics.js");
    const newFilteredPrescriptions = filterMine 
      ? prescriptions.filter(pres => pres.doctor_username === doctorInfo.info.username) 
      : prescriptions;
    
    setFilteredPrescriptions(newFilteredPrescriptions);
    console.log("Before Filtering ", prescriptions);
    console.log("filterMine: ",filterMine);
    console.log("Filtered Tests: ",filteredPrescriptions);
  }, [filterMine, prescriptions, doctorInfo.info.username]);


  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleSeeMore = async (prescriptionID) => {
    try {
      const response = await fetch('api/v0/get_prescription_by_id/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prescription_id: prescriptionID }),
      });
      const result = await response.json();
      setPrescriptionDetail(result.data);
      setDialogOpen(true);
    } catch (error) {
      console.error('Failed to fetch prescribed drugs:', error);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleToggleFilter = async () => {
    setFilterMine(!filterMine);
  };

  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPrescriptions.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div style={{ marginBottom: '10%' }}>
      <h1 style={{ textAlign: 'center', marginTop: '50px' }}>Prescriptions</h1>
      {isLoading ? (
        <LinearProgress color="success" />
      ) : (
        <>

          <FormControlLabel
            control={
              <Switch
                checked={filterMine}
                onChange={handleToggleFilter}
                name="filterMine"
                color="primary"
              />
            }
            label="Filter"
          />

          {currentItems.length === 0 ? (
            <Typography variant="body1" style={{ textAlign: 'center' }}>
              No prescriptions available.
            </Typography>
          ) : (
            <Box>
              {currentItems.map((prescription) => (
                <PrescriptionCard key={prescription.id} prescription={prescription} handleSeeMore={handleSeeMore} />
              ))}
            </Box>
          )}
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination count={Math.ceil(totalCount / itemsPerPage)} page={page} onChange={handleChange} />
          </Box>
        </>
      )}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>Prescription Detail</DialogTitle>
        <DialogContent>
          {prescriptionDetail && (
            <>
              <Box style={{ backgroundColor: '#f2f2f2', padding: '1rem' }}>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>General Information</Typography>
                <Typography>ID: {prescriptionDetail.id}</Typography>
                <Typography>Doctor: {prescriptionDetail.doctor_username}</Typography>
                <Typography>Date: {new Date(prescriptionDetail.date).toLocaleDateString()}</Typography>
                <Typography>Findings: {prescriptionDetail.findings}</Typography>
              </Box>
              <Box mt={2} style={{ backgroundColor: '#e6e6e6', padding: '1rem' }}>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>Queued Tests</Typography>
                {prescriptionDetail.queued_tests.map((test, index) => (
                  <Typography key={index}>Diagnostic Tests: {(allTests.find(test2 => test2.id === test.test_id)).test_name}</Typography>
                ))}
              </Box>
              <Box mt={2} style={{ backgroundColor: '#d9d9d9', padding: '1rem' }}>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>Prescribed Drugs</Typography>
                {prescriptionDetail.prescribed_drugs.map((drug, index) => (
                  <Box key={index}>
                    <Typography>Prescribed Drug : {(allDrugs.find(drug2 => drug2.id === drug.drug_id)).name}</Typography>
                    <Typography>Dosage: {drug.prescribed_dosage}</Typography>
                  </Box>
                ))}
              </Box>
              <Box mt={2} style={{ backgroundColor: '#cccccc', padding: '1rem' }}>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>Disease List</Typography>
                {prescriptionDetail.prescription_diseases.map((disease, index) => (
                  <Typography key={index}>Diagnosis : {(allDiseases.find(dis2 => dis2.id === disease.disease_id)).disease_name}</Typography>
                ))}
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PrescriptionTab;
