// pages/CreatePrescriptionPage.js

import React from 'react';
import { Button, Grid } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import LeftFlexbox from './Components/LeftFlexBox';
import MiddleFlexbox from './Components/MiddleFlexBox';
import RightFlexbox from './Components/RightFlexBox';
import TopBanner from './Components/TopBanner';
import BottomBanner from './Components/BottomBanner';
import { useState } from 'react';
import { usePatientIDValidation } from '../../PatientIDValidation';


const patientInfo = {
  id: '123',
  name: 'John Doe',
  address: '123 Main St.',
};

const prescriptionNo = 'RX456';
const avatarSrc = 'path/to/avatar.png'; // or a URL to an image


const CreatePrescriptionPage = () => {
  usePatientIDValidation();
  const navigate = useNavigate();
  const location = useLocation();

  const [diseasesList, setDiseasesList] = useState([]);
  const [testsList, setTestsList] = useState([]);

  // State from MiddleFlexbox
  const [selectedMedicines, setSelectedMedicines] = useState([]);

  const handleClearAll = () => {
    // Clear all the states
    console.log('Clearing all the states');
    setDiseasesList([]);
    setTestsList([]);
    setSelectedMedicines([]);
  };

  return (
    
    <div
      style={{
        transform: 'scale(1)',
        opacity: 1,
        position: 'fixed',
        top: '5%',
        left: '5%',
        width: '90%',
        height: '90%',
        background: '#fff',
        zIndex: 100,
        marginTop: '10px',
        marginBottom: '200px',
        borderRadius: '10px',
        borderTop: '1px solid #000',
        borderLeft: '1px solid #000',
        borderRight: '1px solid #000',
        borderBottom: '1px solid #000',
        boxShadow: '0 0 50px rgba(0, 0, 0, 0.5)',
        overflow: 'auto',
        transition: 'transform 10.5s ease, opacity 10.5s ease', // Add transition
      }}
    >
      <Button onClick={() => navigate(location.state?.from || '/')}>Close</Button>
      
      
      {/* Top Banner with 15% height */}
      <TopBanner patientInfo={patientInfo} prescriptionNo={prescriptionNo} avatarSrc={avatarSrc} />
      
      {/* Middle 70% Flexbox */}
      <Grid container style={{ height: '100%', width: '100%' }}>
        <Grid item xs={3}>
            <LeftFlexbox diseasesList={diseasesList} setDiseasesList={setDiseasesList} testsList={testsList} setTestsList={setTestsList} />
        </Grid>
        <Grid item xs={5}>
            <MiddleFlexbox selectedMedicines={selectedMedicines} setSelectedMedicines={setSelectedMedicines} />
        </Grid>
        <Grid item xs={4}>
          <RightFlexbox />
        </Grid>
      </Grid>

      {/* Bottom Banner with 15% height */}
      <BottomBanner handleClearAll={handleClearAll}/>
    </div>
  );
};

export default CreatePrescriptionPage;
