import React, { useState } from 'react';
import { Button, Card, Container, Box } from '@mui/material';
import BasicInfoCard from './Components/Cards/PateintInfoCard';
const PatientRegistration = () => {
  const [info, setInfo] = useState({
    name: '', phone: '', nid: '', dob: '', gender: '', hometown: '',
    currentAddress: { name: '', from: '' },
    addresses: []
  });

  const handleChange = (field, value) => {
    setInfo({ ...info, [field]: value });
  };

  

  const handleSubmit = () => {
    const result = {
      name: info.name,
      phone: info.phone,
      nid: info.nid,
      dob: info.dob,
      gender: info.gender,
      hometown: info.hometown,
    };

    console.log(JSON.stringify(result));
  };

  return (
    <Container maxWidth="md">
      <Box bgcolor="background.paper" p={3} boxShadow={20} borderRadius={2} marginTop={10}>
        <Box mb={2}>
          <h1 align="center"
          >Patient Registration</h1>
          <Card>
            <BasicInfoCard info={info} handleChange={handleChange} />
          </Card>
        </Box>
        {/* Put button at middle of the box */}
        <Box display="flex" justifyContent="center" mb={2}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>Register</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default PatientRegistration;