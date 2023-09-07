import { createContext, useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContentText, Typography } from '@mui/material';

export const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const initialPatientID = localStorage.getItem("patientID");
  const initialDoctorInfo = JSON.parse(localStorage.getItem("doctorInfo") || '{}');
  
  const [patientID, setPatientID] = useState(initialPatientID ? parseInt(initialPatientID, 10) : null);
  const [doctorInfo, setDoctorInfo] = useState(initialDoctorInfo);
  const [showInvalidIDDialog, setShowInvalidIDDialog] = useState(false);
  const [showInvalidDoctorDialog, setShowInvalidDoctorDialog] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.removeItem("patientID");
      localStorage.removeItem("doctorInfo");
    }, 15 * 60 * 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [patientID, doctorInfo]);

  useEffect(() => {
    if(patientID !== null) {
      localStorage.setItem("patientID", patientID);
    }
    if(doctorInfo) {
      localStorage.setItem("doctorInfo", JSON.stringify(doctorInfo));
    }
  }, [patientID, doctorInfo]);

  const isPatientIDValid = () => {
    const isValid = patientID !== null && !isNaN(patientID);
    
    if (!isValid) {
      setShowInvalidIDDialog(true);
    }

    return isValid;
  };

  const isDoctorInfoValid = () => {
    const isValid = doctorInfo !== null && doctorInfo !== {};

    if (!isValid) {
      setShowInvalidDoctorDialog(true);
    }

    return isValid;
  }
  
  const logoutDoctor = () => {
    setDoctorInfo(null);
    localStorage.removeItem("doctorInfo");
  };
  

  const handleCloseDialog = () => {
    setShowInvalidIDDialog(false);
  };

  return (
    <PatientContext.Provider value={{ patientID, setPatientID, isPatientIDValid, doctorInfo, setDoctorInfo,logoutDoctor }}>
      {children}
      <Dialog open={showInvalidIDDialog} onClose={handleCloseDialog}>
        <DialogTitle style={{ backgroundColor: 'red', textAlign: 'center' }}>
          <Typography variant="h6" style={{ fontWeight: 'bold', color: 'white' }}>
            Invalid Patient ID
          </Typography>
        </DialogTitle>
        <DialogContentText style={{ textAlign: 'center' }}>
          Please enter a valid patient ID to continue.
        </DialogContentText>
      </Dialog>
    </PatientContext.Provider>
  );
}
