import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // If using react-router v6
import { PatientContext } from './PatientContext';

export const usePatientIDValidation = () => {
  const { isPatientIDValid } = useContext(PatientContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPatientIDValid()) {
      navigate('/'); // Redirect to the enter patient ID page
    }
  }, [isPatientIDValid, navigate]);
};
