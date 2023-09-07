import { createContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'; // If using react-router v6
import { Dialog, DialogTitle, DialogContentText, Typography } from '@mui/material';

export const PatientContext = createContext();

export const PatientProvider = ({ children }) => {

  const SUPABASE_URL = 'https://kbvpvcrgrguscjhrleyg.supabase.co'
  const SUPABASE_ANN_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtidnB2Y3Jncmd1c2NqaHJsZXlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQwODQxODgsImV4cCI6MjAwOTY2MDE4OH0.8ZnACrblxO8M1gbqKqTvdjr8rM3b-EIN2azupW2GtWs'


  const initialPatientID = localStorage.getItem("patientID");
  const initialDoctorInfo = JSON.parse(localStorage.getItem("doctorInfo") || null);
  
  const [patientID, setPatientID] = useState(initialPatientID ? parseInt(initialPatientID, 10) : null);
  const [doctorInfo, setDoctorInfo] = useState(initialDoctorInfo);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [showInvalidIDDialog, setShowInvalidIDDialog] = useState(false);

  const navigate = useNavigate();


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

    console.log("Doctor Info----------------: ", doctorInfo);
    const isValid = doctorInfo !== null;
    console.log("isValid: ", isValid);


    return isValid;
  }
  
  const logoutDoctor = () => {
    console.log("Logging out doctor");
    setDoctorInfo(null);
    setPatientID(null);
    localStorage.removeItem("doctorInfo");
    localStorage.removeItem("patientID");
  };
  

  const handleCloseDialog = () => {
    setShowInvalidIDDialog(false);
  };

  return (
    <PatientContext.Provider value={{ patientID, setPatientID, isPatientIDValid, doctorInfo, setDoctorInfo,logoutDoctor,isDoctorInfoValid, SUPABASE_URL, SUPABASE_ANN_KEY ,setPhoneNumber,phoneNumber}}>
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
