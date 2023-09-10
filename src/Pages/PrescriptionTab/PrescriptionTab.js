import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, LinearProgress, Pagination, FormControlLabel, Switch } from '@mui/material';
import PrescriptionCard from './Components/PrescriptionCard';
import { PatientContext } from '../../PatientContext';
import { async } from 'q';

const PrescriptionTab = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState([]);
  const [filterMine, setFilterMine] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const itemsPerPage = 5;
  const { patientID, doctorInfo } = useContext(PatientContext);

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

  const handleSeeMore = async(prescriptionID) => {
    console.log('See more clicked for prescription ID:', prescriptionID);

    try {
      const response = await fetch('api/v0/get_prescription_by_id/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prescription_id: prescriptionID }),
      });
      const result = await response.json();
      
      console.log("prescription details:", result.data);
    } catch (error) {
      console.error('Failed to fetch prescribed drugs:', error);
    }


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
                <PrescriptionCard prescription={prescription} handleSeeMore={handleSeeMore} />
              ))}
            </Box>
          )}
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination count={Math.ceil(totalCount / itemsPerPage)} page={page} onChange={handleChange} />
          </Box>
        </>
      )}
    </div>
  );
};

export default PrescriptionTab;
