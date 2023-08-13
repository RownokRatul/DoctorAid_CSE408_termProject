// components/TopMenuBar.js

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Tabs, Tab, ThemeProvider, createTheme } from '@mui/material';

const TopMenuBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const paths = [
    '/',
    '/demography',
    '/medication',
    '/prescription',
    '/search',
  ];

  const currentTabIndex = paths.indexOf(currentPath);

  // Create a custom theme with desired colors
  const theme = createTheme({
    palette: {
      primary: {
        main: '#ffffff', // Set the primary color to white
      },
    },
    components: {
      MuiTabs: {
        styleOverrides: {
          indicator: {
            backgroundColor: '#000', // Set the indicator color
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            color: '#000', // Default color for the tabs
            "&.Mui-selected": {
              // set color to deep grey
              color : '#000',
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="primary">
        <Tabs value={currentTabIndex} aria-label="simple tabs example">
          <Tab label="General" component={Link} to="/general" />
          <Tab label="Demography" component={Link} to="/demography" />
          <Tab label="Medications" component={Link} to="/medication" />
          <Tab label="Prescriptions" component={Link} to="/prescription" />
          <Tab label="Search" component={Link} to="/search" />
        </Tabs>
      </AppBar>
    </ThemeProvider>
  );
};

export default TopMenuBar;
