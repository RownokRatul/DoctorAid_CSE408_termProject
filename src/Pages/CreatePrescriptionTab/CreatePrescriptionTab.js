// pages/CreatePrescriptionPage.js

import React from 'react';
import { Button } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const CreatePrescriptionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{
      transform: 'scale(1)',
      opacity: 1,
      position: 'fixed',
      top: '5%',
      left: '5%',
      width: '90%',
      height: '80%',
      background: '#fff',
      zIndex: 100,
      marginTop: '50px',
      marginBottom: '100px',
      borderRadius: '10px',
      borderTop: '1px solid #000',
      borderLeft: '1px solid #000',
      borderRight: '1px solid #000',
        borderBottom: '1px solid #000',
        boxShadow: '0 0 50px rgba(0, 0, 0, 0.5)',

      overflow: 'auto',
      transition: 'transform 10.5s ease, opacity 10.5s ease', // Add transition
    }}>
      <Button onClick={() => navigate(location.state?.from || '/')}>Close</Button>
      <h1>Create Prescription</h1>
      {/* Add form fields, text, etc. here */}
    </div>
  );
};

export default CreatePrescriptionPage;
