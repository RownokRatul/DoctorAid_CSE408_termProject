// pages/General.js

import React from 'react';
import { usePatientIDValidation } from '../../PatientIDValidation';

const Demography = () => {
  usePatientIDValidation();
  return (
    <div>
      <h1>Demography Page Content</h1>
    </div>
      
  );
};

export default Demography;
