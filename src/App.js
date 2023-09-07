// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './Pages/MainLayOut/MainLayOut';
import General from './Pages/GeneralTab/GeneralTab';
import Demography from './Pages/DemographyTab/DemographyTab'; // Import other pages as needed
import Diagnostics from './Pages/DiagnosticsTab/DiagnosticsTab';
import Medication from './Pages/MedicationTab/MedicationTab';
import Search from './Pages/SearchTab/SearchTab';
import Prescription from './Pages/PrescriptionTab/PrescriptionTab';
import AdminPage from './Pages/AdminPage/AdminPage';
import FloatingActionButton from './Pages/CreatePrescriptionTab/Components/FloatingActionButton';
import CreatePrescriptionPage from './Pages/CreatePrescriptionTab/CreatePrescriptionTab';
import PatientIDInput from './Pages/EnterPatientID/EnterPatientID';
import PatientRegistration from './Pages/PatientRegistrationTab/PatientRegistration'
import InternDoctor from './Pages/InternDoctor/InternDoctor';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { useThemeContext } from './ThemeContext';
import { PatientProvider } from './PatientContext';
import DiagnosticianPage from './Pages/DiagnosticianTab/DiagnosticianTab';
import PracticePage2 from './Pages/practicePage/practice2';
import LoginPage from './Pages/LandingPage/landingPage';
import SearchPatient from './Pages/InternDoctor/InternSearchPage';
// ...



function App() {
  const { theme } = useThemeContext(); // Use the theme from your custom context

  return (
    <MuiThemeProvider theme={theme}>
    <Router>
      <MainLayout>
        <PatientProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/doctor_homepage" element={<PatientIDInput />} />
            <Route path="/general" element={<General />} />
            <Route path="/demography" element={<Demography />} />
            <Route path="/diagnostics" element={<Diagnostics />} />
            <Route path="/medication" element={<Medication />} />
            <Route path="/search" element={<Search />} />
            <Route path="/prescription" element={<Prescription />} />
            <Route path="/create-prescription" element={<CreatePrescriptionPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/register" element={<PatientRegistration />} />
            <Route path="/intern" element={<SearchPatient />} />
            <Route path="/diagnostician" element={<DiagnosticianPage />} />
            <Route path="/demo" element={<PracticePage2 />} />
            <Route path="/internPage" element={<InternDoctor />} />
            
          </Routes>
        </PatientProvider>
        <FloatingActionButton />
      </MainLayout>
    </Router>
    </MuiThemeProvider>
  );
}

export default App;
