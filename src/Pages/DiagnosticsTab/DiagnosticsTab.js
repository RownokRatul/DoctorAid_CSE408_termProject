// pages/Diagnostics.js

import React from 'react';
import { usePatientIDValidation } from '../../PatientIDValidation';



const Diagnostics = () => {
  usePatientIDValidation();
  return (
    <div>
      <h1>Diagnostics Page Content</h1>
    </div>
  );
  
};

export default Diagnostics;
