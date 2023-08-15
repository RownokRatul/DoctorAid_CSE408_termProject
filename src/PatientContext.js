import { createContext, useState } from 'react';
import { Dialog, DialogTitle, DialogContentText, Typography } from '@mui/material';


export const PatientContext = createContext();

export const PatientProvider = ({ children }) => {
  const [patientID, setPatientID] = useState(null);
  const [showInvalidIDDialog, setShowInvalidIDDialog] = useState(false);

  const isPatientIDValid = () => {
    // Add your validation logic here
    const isValid = patientID !== null && !isNaN(patientID);

    if (!isValid) {
      setShowInvalidIDDialog(true);
    }

    return isValid;
  };

  const handleCloseDialog = () => {
    setShowInvalidIDDialog(false);
  };

  return (
    <PatientContext.Provider value={{ patientID, setPatientID, isPatientIDValid }}>
      {children}
      <Dialog open={showInvalidIDDialog} onClose={handleCloseDialog}>
        <DialogTitle style={{ backgroundColor: 'red', textAlign: 'center' }}>
          <Typography variant="h6" style={{ fontWeight: 'bold', color: 'white' }}>
            Invalid Patient ID
          </Typography>
        </DialogTitle>
        <DialogContentText style={{ textAlign: 'center' }}>
          Please enter a valid patient ID to continue
        </DialogContentText>
      </Dialog>
    </PatientContext.Provider>
  );
}