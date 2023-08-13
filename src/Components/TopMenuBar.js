// components/TopMenuBar.js

import React from 'react';
import { AppBar, Toolbar, Tabs, Tab } from '@mui/material';
import { Link } from 'react-router-dom';

const TopMenuBar = ({ logo }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        {logo && <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />}
        <Tabs>
          <Tab label="General" component={Link} to="/general" />
          <Tab label="Demography" component={Link} to="/demography" />
          {/* Add other tabs as needed */}
          {/* ... */}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
};

export default TopMenuBar;
