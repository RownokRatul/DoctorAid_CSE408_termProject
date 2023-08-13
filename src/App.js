// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainLayout from './Pages/MainLayOut';
import General from './Pages/GeneralTab';
import Demography from './Pages/DemographyTab'; // Import other pages as needed
// ...

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/general" element={<General />} />
          <Route path="/demography" element={<Demography />} />
          {/* Add other routes as needed */}
          {/* ... */}
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
