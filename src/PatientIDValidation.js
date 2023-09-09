import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // If using react-router v6
import { PatientContext } from './PatientContext';

export const usePatientIDValidation = () => {
  // console.log("In patient validation");
  const { isPatientIDValid } = useContext(PatientContext);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("In patient validation useEffect");
    if (!isPatientIDValid()) {
      // console.log("In patient validation useEffect if");
      navigate('/'); // Redirect to the enter patient ID page
    }
  }, [isPatientIDValid, navigate]);
};
