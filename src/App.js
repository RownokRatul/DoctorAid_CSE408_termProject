// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './Pages/MainLayOut';
import General from './Pages/GeneralTab/GeneralTab';
import Demography from './Pages/DemographyTab/DemographyTab'; // Import other pages as needed
import Diagnostics from './Pages/DiagnosticsTab/DiagnosticsTab';
import Medication from './Pages/MedicationTab/MedicationTab';
import Search from './Pages/SearchTab/SearchTab';
import Prescription from './Pages/PrescriptionTab/PrescriptionTab';
// ...


function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/general" element={<General />} />
          <Route path="/demography" element={<Demography />} />
          <Route path="/diagnostics" element={<Diagnostics />} />
          <Route path="/medication" element={<Medication />} />
          <Route path="/search" element={<Search />} />
          <Route path="/prescription" element={<Prescription />} />


          
          {/* Add other routes as needed */}
          {/* ... */}
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
