import React, { useContext, useEffect, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom'; // If using react-router v6
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Avatar } from '@mui/material';
import axios from 'axios';

import { PatientContext } from '../../PatientContext'
import internAvatar from './Components/images/intern.png';

import { red } from '@mui/material/colors';
// import { use } from 'passport';

const SearchPatient = () => {

  console.log("Intern Doctor Search Page");

  const { role } = useContext(PatientContext);
  const { logout } = useContext(PatientContext);
  console.log("Role: ", role);

  const [phone, setPhone] = useState('');
  const [open, setOpen] = useState(false);
  const {setPhoneNumber}=useContext(PatientContext);
  const navigate = useNavigate();

  // access control
  useEffect(() => {
    if(role !== 'intern') {
      navigate('/');
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post('api/v0/search_patient/', {
        phone: phone,
      });

      // If patient is found, print a console message.
      console.log('Patient found:', response.data);
      setPhoneNumber(phone);
      navigate('/internPage');

    } catch (error) {
      // If status is 404, open the dialog box.
      if (error.response && error.response.status === 404) {
        setOpen(true);
      } else {
        console.error('An error occurred:', error);
      }
    }
  };

  // access control
  if(role !== 'intern') {
    // navigate('/');
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        position: 'fixed',
        bottom: '100px',
        right: '40px',
      }}>
          <Avatar src={internAvatar} alt="Intern" sx={{ width: 100, height: 100 }} />
          <Button variant="contained" color="primary" style={{ marginTop: '10px' }} onClick={handleLogout}>Logout</Button>
      </div>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '100px',
      }}>

            <div>
            <TextField
              label="Search Patient" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
            />
            <Button variant="contained" color="primary" onClick={handleSearch}>
              Search
            </Button>
          </div>
          {/* Dialog box for "Patient not found" */}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{"Patient not found"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                The patient with the given ID could not be found.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>

      </div>


    </div>
  );
};

export default SearchPatient;
