import React, { useState, useContext ,useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { PatientContext } from '../../PatientContext';
import { TextField, Button, Card, Typography,Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import doctoravatar from './Components/Images/doctor.png';
import { Line } from 'react-chartjs-2'; // Importing Line from react-chartjs-2 for the line graph
import NewsCard from './Components/NewsCardComponent'; // Import the NewsCard component
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the default styling
import testStatus from './Components/testStatusTable';
import { usePatientIDValidation } from '../../PatientIDValidation';
import { useDoctorIDValidation } from '../../DoctorIDValidation';





const DoctorHomepage = () => {
  // ...other code
  console.log("Kire mama");

  

  const [news, setNews] = useState([]);
  const [testStatus, setTestStatus] = useState([]);
  const [doneTests, setDoneTests] = useState([]);
  const [tests, setTests] = useState([]);
  const [queuedTests, setQueuedTests] = useState([]);

  const { doctorInfo }=useContext(PatientContext);
  const { logout } = useContext(PatientContext);
  const { role } = useContext(PatientContext);

  console.log("Doctor Info  in enter: ",doctorInfo);


    const [patients, setPatients] = useState([]);

    

    
  
    useEffect(() => {
      const fetchData = async () => {
        const response = await axios.post('/api/v0/get_recent_patients/', {
          doctor_username: 'doc_oc',
          limit: 3,
        });
  
        if (response.data.message === 'Success') {
          setPatients(response.data.data);
        }
      };
  
      fetchData();
    }, []);
   
  

  useEffect(() => {
    
    // console.log("00000000000000------------------000000000");

    const fetchData = async () => {
      try {
        // const url = 'https://newsapi.org/v2/everything?' +
        //             'q=Medicine&Doctor&Patient&' +
        //             'from=2023-08-28&' +
        //             'sortBy=popularity&' +
        //             'apiKey=af17597cd9564f5bb7615fa5ff39b6ad';


        const url = 'https://newsapi.org/v2/everything?'+
       'q=medicine&medical'+
       'from=2023-08-27&'+
       'sortBy=popularity&'+
       'apiKey=af17597cd9564f5bb7615fa5ff39b6ad';
        
        const req = new Request(url);
  
        const response = await fetch(req);
        const result = await response.json();
        setNews(result.articles.slice(0, 5)); // Keep the top 5 articles
        const response2 = await fetch('api/v0/get_tests_by_doctor_id/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ doctor_username: doctorInfo.info.username }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("data:",data);
            const fetchedList = data.data;
            // console.log('Fetched list:', fetchedList); // Logging the fetched tags
            setTests(fetchedList); // Updating the state
          // console.log("list response",testStatus);
          })
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
  
    // access control
    if (!doctorInfo || !doctorInfo.info) {
      navigate('/');
      // return <div>Loading...</div>;
    }
    else {
      fetchData();
    }

   

  }, []);

  
  const [inputID, setInputID] = useState('');
  const { setPatientID } = useContext(PatientContext);
  const navigate = useNavigate();

  // Dummy data for the doctor's information
  const hospitalinfo = {
    
    hospital: 'ABC Hospital, Address, City, Zip',
  };
  const handlePatientDetail = (patientID) => {
    setPatientID(patientID); // Setting the patient ID
    console.log(patientID);
    navigate('/general'); 
  };

  const handleSubmit = () => {
    setPatientID(parseInt(inputID, 10));
    console.log(inputID);
    navigate('/general'); // Navigate to the general tab
  };

  const handleLogout = async () => {
    console.log("In handle logout");
    fetch('/api/v0/logout', {
      method: 'GET', // Use GET since the API is set up to handle GET requests for logout
      headers: {
        // Include any headers your API may need, like an authentication token
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log('Logout successful:', data);
      logout(); // Assuming this clears local state or local storage
      navigate('/'); // Navigate to home page
    })
    .catch((error) => {
      console.error('Failed to logout:', error);
    });
    // navigate('/');
  }

  
  
  if (!doctorInfo || !doctorInfo.info) {
    // navigate('/');
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f0f0f0', padding: '10px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar src={doctoravatar} alt="Doctor" sx={{ width: 100, height: 100 }} />
          <Button variant="contained" color="primary" style={{ marginTop: '10px' }} onClick={handleLogout}>Logout</Button>
        </div>
        <Card style={{ flex: '1', marginLeft: '20px', padding: '15px', backgroundColor: '#f7f9fc', flex: '30%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" style={{ color: '#333', marginBottom: '10px' }}>{doctorInfo.info.name}</Typography>
            <Typography variant="subtitle1" style={{ color: '#666', marginBottom: '10px' }}>{doctorInfo.info.specialization}</Typography>
          </div>
          <div style={{ display: 'flex', gap: '15px', justifyContent: "center" }}>
            <div style={{ padding: '10px', border: '1px solid #eaeaea', borderRadius: '5px' }}>
              <Typography variant="body2" style={{ fontWeight: 'bold' }}>Contact:</Typography>
              <Typography variant="body1">{doctorInfo.info.phone}</Typography>
            </div>
            <div style={{ padding: '10px', border: '1px solid #eaeaea', borderRadius: '5px' }}>
              <Typography variant="body2" style={{ fontWeight: 'bold' }}>Email:</Typography>
              <Typography variant="body1">{doctorInfo.info.email}</Typography>
            </div>
            <div style={{ padding: '10px', border: '1px solid #eaeaea', borderRadius: '5px' }}>
              <Typography variant="body2" style={{ fontWeight: 'bold' }}>Degrees:</Typography>
              <Typography variant="body1">{doctorInfo.info.degree}</Typography>
            </div>
            <div style={{ padding: '10px', border: '1px solid #eaeaea', borderRadius: '5px' }}>
              <Typography variant="body2" style={{ fontWeight: 'bold' }}>Hospital:</Typography>
              <Typography variant="body1">{hospitalinfo.hospital}</Typography>
            </div>
          </div>
        </Card>
      </div>
  
      <div style={{ display: 'flex', height: '90%' }}>
        <div style={{ flex: '30%', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Card style={{ display: 'flex', marginBottom: '50px', padding: '40px', backgroundColor: "azure" }}>
            <div style={{ flex: '50%', marginLeft: '10px', height: '300px' }}>
              <Typography variant="h6" style={{ marginBottom: '10px' }}>Calendar</Typography>
              <Calendar value={new Date()} />
            </div>
            <div style={{ marginTop: "30px", marginBottom: "30px", marginLeft: "10px" }}>
              <h2> Enter Patient ID to Search</h2>
              <TextField label="Patient ID" value={inputID} onChange={(e) => setInputID(e.target.value)} />
              <Button onClick={handleSubmit}>Enter</Button>
            </div>
          </Card>
          <Card style={{ padding: '15px', backgroundColor: 'beige' }}>
            <Typography variant="h6" style={{ marginBottom: '10px' }}>Last 3 Visited Patients</Typography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {patients.map((patient, index) => (
                <Card key={index} style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#f5f5f5', borderTop: '0.5px solid gray' }}>
                  <Avatar src={'dummyAvatar' + index} alt="Patient" />
                  <Typography variant="body1">Name: {patient.name}</Typography>
                  <Typography variant="body2">Patient ID: {patient.patient_id}</Typography>
                  <Typography variant="body2">Phone: {patient.phoneNumber}</Typography>
                  <Typography variant="body2">Date: {new Date(patient.date).toLocaleDateString()}</Typography>
                  <Typography variant="body2">Findings: {patient.findings}</Typography>
                  <Button onClick={() => handlePatientDetail(patient.patient_id)}>Detail</Button>
                </Card>
              ))}
            </div>
          </Card>
        </div>
  
        <div style={{ flex: '30%', height: '690px', padding: '20px' }}>
          <Card style={{ height: '100%', padding: '15px', overflowY: 'scroll', backgroundColor: "beige" }}>
            <h2 style={{ textAlign: "center" }}>Recent News</h2>
            {news.map((article, index) => (
              <NewsCard key={index} news={article} />
            ))}
          </Card>
          <h1>All Patient Test Status</h1>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}> {/* Added this div */}
            
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Patient ID</TableCell>
                    <TableCell align="right">Prescription ID</TableCell>
                    <TableCell align="right">Test Name</TableCell>
                    <TableCell align="right">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tests === null ? (<div>loading</div>) : (
                    tests.map((test, index) => (
                      <TableRow key={index}>
                        <TableCell align="right">{test.patient_id}</TableCell>
                        <TableCell align="right">{test.prescription_id}</TableCell>
                        <TableCell align="right">{test.test_name}</TableCell>
                        <TableCell align="right">{test.status}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div> {/* End of added div */}
        </div>

      </div>
    </div>
  );
}  

export default DoctorHomepage;