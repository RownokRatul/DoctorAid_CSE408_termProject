import React, { useState } from 'react';
import { Button, Card, Container, Box } from '@mui/material';
import BasicInfoCard from './Components/Cards/PateintInfoCard';
import axios from 'axios';
const PatientRegistration = () => {
  const [info, setInfo] = useState({
    name: '', phone: '', nid: '', dob: '', gender: '', hometown: '',
    currentAddress: { name: '', from: '' },
    addresses: []
  });

  const handleChange = (field, value) => {
    setInfo({ ...info, [field]: value });
  };

  

  const handleSubmit =  async () => {
    const result = {
      name: info.name,
      phone: info.phone,
      nid: info.nid,
      dob: info.dob,
      gender: info.gender,
      hometown: info.hometown,
    };


    const dateObj = new Date(info.dob);
    dateObj.setUTCHours(0, 0, 0, 0);
    const modified_string= dateObj.toISOString();


    console.log(JSON.stringify(result));

    try {
      const response = await axios.post("api/v0/register_patient/", 
      {
        name: info.name,
        phone: info.phone,
        nid: info.nid,
        dob: modified_string,
        gender: info.gender,
        hometown: info.hometown
      }
      );
      console.log("response", response.data);
      // Assuming the API response contains the search result data
      if (response.status === 200 ) {
          console.log("response", response.data);
      } else {
         console.log("response", response.data);
      }
    } catch (error) {
      console.error("Error registering:", error);
      
    }
  }
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