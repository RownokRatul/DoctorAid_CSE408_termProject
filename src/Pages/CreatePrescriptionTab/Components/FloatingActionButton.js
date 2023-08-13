// components/FloatingActionButton.js

import React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useLocation } from 'react-router-dom';

const FloatingActionButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Fab color="primary" aria-label="add" onClick={() => navigate('/create-prescription', { state: { from: location.pathname } })} style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
      <AddIcon />
    </Fab>
  );
};

export default FloatingActionButton;
