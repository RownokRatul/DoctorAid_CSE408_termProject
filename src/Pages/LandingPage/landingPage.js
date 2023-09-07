import React, { useState,useContext } from 'react';
import { useHistory, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Paper, TextField, Button, Typography, Container, Box } from '@mui/material';
import { PatientContext } from '../../PatientContext';

const LoginPage = () => {
    const { setDoctorInfo } = useContext(PatientContext);  // Destructure setDoctorInfo from context

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate =useNavigate();


  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/v0/login', {
        username,
        password,
      });
      const { data } = response;
      if (data.message === 'Authenticated') {
        
        console.log("Data: ",data);
        const role = data.user.role;
        switch (role.toLowerCase()) {
          case 'doctor':
            setDoctorInfo(data.user);
            navigate('/doctor_homepage');
            break;
          case 'intern':
            navigate('/intern');
            break;
          case 'diagnostician':
            navigate('/diagnostician');
            break;
          default:
            setError('Unknown role');
        }
      } else {
        setError('Login failed');
      }
    } catch (error) {
      setError('Something went wrong');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{
          minHeight: '100vh',
          justifyContent: 'center',
          bgcolor: '#f2f2f2',
        }}
      >
        <Paper elevation={3} style={{ padding: '20px', width: '100%' }}>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <Typography color="error" align="center">
                {error}
              </Typography>
            )}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;
