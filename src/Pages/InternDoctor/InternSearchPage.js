import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // If using react-router v6
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import axios from 'axios';

import { PatientContext } from '../../PatientContext'

const SearchPatient = () => {
  const [phone, setPhone] = useState('');
  const [open, setOpen] = useState(false);
  const {setPhoneNumber}=useContext(PatientContext);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
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

  return (
    <div>
      <TextField 
        label="Search Patient" 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)} 
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>

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
  );
};

export default SearchPatient;
