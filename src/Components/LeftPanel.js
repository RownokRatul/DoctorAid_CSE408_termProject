// components/LeftPanel.js

import React from 'react';
import { Button, Drawer, List, ListItem, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const LeftPanel = ({ open, toggleDrawer }) => {
  return (
    <Drawer variant="persistent" open={open} style={{ width: open ? '240px' : '0', overflowX: 'hidden' }}>
      <IconButton onClick={toggleDrawer}>
        {open ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>
      <List>
        <ListItem>
          <Button variant="contained">Search new patient</Button>
        </ListItem>
        <ListItem>
          <Button variant="contained" color="error">Logout</Button>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default LeftPanel;
