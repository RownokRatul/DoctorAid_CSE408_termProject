// pages/MainLayout.js

import React, { useState } from 'react';
import TopMenuBar from '../Components/TopMenuBar';
import LeftPanel from '../Components/LeftPanel';
import Banner from '../Components/Banner';
import Footer from '../Components/Footer';
import { Container, IconButton } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';

const MainLayout = ({ children }) => {
  const [open, setOpen] = useState(true);
  const logo = '../../public/logo192.png'; // Add your logo path here
  const bannerSrc = '../../public/logo192.png'; // Add your banner path here


  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', paddingBottom: '60px' }}>
      <Banner src={bannerSrc} />
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
      
      <Footer />
      
    </div>
  );
};

export default MainLayout;
