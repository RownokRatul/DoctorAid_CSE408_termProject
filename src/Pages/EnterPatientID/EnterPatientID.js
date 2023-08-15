import React, { useState, useContext } from 'react';
import { PatientContext } from '../../PatientContext'
import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const PatientIDInput = () => {
  const [inputID, setInputID] = useState('');
  const { setPatientID } = useContext(PatientContext);
  const navigate=useNavigate();

  const handleSubmit = () => {
    setPatientID(inputID);
    navigate('/general'); // Navigate to the general tab
  };

  return (
    <div>
      <TextField label="Patient ID" value={inputID} onChange={(e) => setInputID(e.target.value)} />
      <Button onClick={handleSubmit}>Enter</Button>
    </div>
  );
};

export default PatientIDInput;
