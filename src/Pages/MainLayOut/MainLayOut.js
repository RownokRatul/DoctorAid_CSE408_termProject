// pages/MainLayout.js


import { useLocation } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import TopMenuBar from '../../Components/TopMenuBar';
import LeftPanel from '../../Components/LeftPanel';
import Banner from '../../Components/Banner';
import Footer from '../../Components/Footer';
import { Container, IconButton } from '@mui/material';
import { ChevronRight } from '@mui/icons-material';
import doctoraid_logo from './Components/Images/doctoraid_logo.jpg';
import FloatingActionButton from '../CreatePrescriptionTab/Components/FloatingActionButton';

const MainLayout = ({ children }) => {

  const location = useLocation(); // Get the current location
  const [open, setOpen] = useState(true);
  const logo = './Components/Images/doctoraid_logo.jpg'; // Add your logo path here
  const bannerSrc = './Components/Images/doctoraid_logo.jpg'; // Add your banner path here

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      position: 'relative',
      height: '100%',

    }}>
      <Banner src={doctoraid_logo} />
      {location.pathname !== '/' && location.pathname !== '/intern' && location.pathname !== '/diagnostician' && location.pathname !== '/internPage' && location.pathname !== '/register' && location.pathname !== '/home' && (
        <div>
          <TopMenuBar logo={logo} />
          {!open && (
            <IconButton onClick={toggleDrawer} style={{ position: 'absolute', left: 0, top: '50%' }}>
              <ChevronRight />
            </IconButton>
          )}
        </div>
      )}
      
      <div style={{
        flex: 1,  // Take up all available space
        width: '90%',
        marginLeft: '5%',
      }}>
        {children}
      
      </div>

      {location.pathname !== '/' && location.pathname !== '/intern' && location.pathname !== '/diagnostician' && location.pathname !== '/internPage' && location.pathname !== '/register' && location.pathname !== '/home' && (
        <FloatingActionButton />
      )}

      <Footer />

    </div>
  );
};

export default MainLayout;
