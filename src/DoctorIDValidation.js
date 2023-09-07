import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // If using react-router v6
import { PatientContext } from './PatientContext';

export const useDoctorIDValidation = () => {
    console.log("Inside useDoctorIDValidation");
  const { isDoctorInfoValid } = useContext(PatientContext);
  const navigate = useNavigate();

  console.log("isDoctorInfoValid: ", isDoctorInfoValid());


    if (!isDoctorInfoValid()) {
      navigate('/'); // Redirect to the enter patient ID page
    }
};
