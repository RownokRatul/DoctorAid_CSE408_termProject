import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, LinearProgress, Pagination } from '@mui/material';
import PrescriptionCard from './Components/PrescriptionCard';
import { PatientContext } from '../../PatientContext';

const PrescriptionTab = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const itemsPerPage = 5;
  const { patientID } = useContext(PatientContext);

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
        setTotalCount(data.data.length);
      })
      .catch((error) => console.error('Error fetching prescriptions:', error))
      .finally(() => setIsLoading(false));
  }, [patientID]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleSeeMore = (prescriptionID) => {
    console.log('See more clicked for prescription ID:', prescriptionID);
  };

  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = prescriptions.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div style={{ marginBottom: '10%' }}>
      <h1 style={{ textAlign: 'center', marginTop: '50px' }}>Prescriptions</h1>
      {isLoading ? (
        <LinearProgress color="success" />
      ) : (
        <>
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
