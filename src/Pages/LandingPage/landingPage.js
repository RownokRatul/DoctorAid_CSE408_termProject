import React, { useState,useContext } from 'react';
import { useHistory, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Paper, TextField, Button, Typography, Container, Box, CircularProgress  } from '@mui/material';
import { PatientContext } from '../../PatientContext';

const LoginPage = () => {
  const { setDoctorInfo } = useContext(PatientContext);  // Destructure setDoctorInfo from context
  const { setRole } = useContext(PatientContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate =useNavigate();



  const handleLogin = async (e) => {
    setIsLoading(true);
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
            navigate('/home');
            break;
          case 'intern':
            setRole(role.toLowerCase());
            navigate('/intern');
            break;
          case 'diagnostician':
            setRole(role.toLowerCase());
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
    <Container component="main" maxWidth="xs" style={{ height: '100vh', overflow: 'hidden' }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        style={{
          minHeight: '100vh',
          backgroundColor: '#f2f2f2',
          position: 'relative',  // Added for loader positioning
        }}
      >
        {isLoading && (
          <div style={{
            position: 'absolute', // Position it absolutely
            top: '70%',  // Center vertically
            left: '50%', // Center horizontally
            transform: 'translate(-50%, -50%)'  // Adjust for true centering
          }}>
            <CircularProgress color="success" />
          </div>
        )}
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
