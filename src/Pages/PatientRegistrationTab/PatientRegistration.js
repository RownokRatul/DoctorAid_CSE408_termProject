import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Container, Box, Avatar } from '@mui/material';
import BasicInfoCard from './Components/Cards/PateintInfoCard';
import RecepAvatar from './Components/images/recep.png';
import { PatientContext } from '../../PatientContext'

import axios from 'axios';

const PatientRegistration = () => {

  const { role } = useContext(PatientContext);
  const { logout } = useContext(PatientContext);

  const navigate = useNavigate();

  useEffect(() => {
    if(role !== 'receptionist') {
      navigate('/');
    }
  }, []);

  const [info, setInfo] = useState({
    name: '', phone: '', nid: '', dob: '', gender: '', hometown: '',
    currentAddress: { name: '', from: '' },
    addresses: []
  });

  const handleChange = (field, value) => {
    setInfo({ ...info, [field]: value });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
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

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        position: 'fixed',
        bottom: '100px',
        right: '40px',
      }}>
          <Avatar src={RecepAvatar} alt="Intern" sx={{ width: 100, height: 100 }} />
          <Button variant="contained" color="primary" style={{ marginTop: '10px' }} onClick={handleLogout}>Logout</Button>
      </div>

      <Box bgcolor="background.paper" p={3} boxShadow={20} borderRadius={2} marginTop={5} marginBottom={10}>
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