// pages/MainLayout.js

import React, { useState } from 'react';
import TopMenuBar from '../Components/TopMenuBar';
import LeftPanel from '../Components/LeftPanel';
import { Container, IconButton } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';

const MainLayout = ({ children }) => {
  const [open, setOpen] = useState(true);
  const logo = 'path/to/your/logo.png'; // Add your logo path here

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div>
      <TopMenuBar logo={logo} />
      {!open && (
        <IconButton onClick={toggleDrawer} style={{ position: 'absolute', left: 0, top: '50%' }}>
          <ChevronRight />
        </IconButton>
      )}
      <LeftPanel open={open} toggleDrawer={toggleDrawer} />
      <Container>
        {children}
      </Container>
    </div>
  );
};

export default MainLayout;
