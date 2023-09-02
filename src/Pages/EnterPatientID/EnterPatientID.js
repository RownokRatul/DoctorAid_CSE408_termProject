import React, { useState, useContext ,useEffect} from 'react';
import { PatientContext } from '../../PatientContext';
import { TextField, Button, Card, Typography,Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import doctoravatar from './Components/Images/doctor.png';
import { Line } from 'react-chartjs-2'; // Importing Line from react-chartjs-2 for the line graph

import NewsCard from './Components/NewsCardComponent'; // Import the NewsCard component

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the default styling

const DoctorHomepage = () => {

  // ...other code

  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const url = 'https://newsapi.org/v2/everything?' +
        //             'q=Medicine&Doctor&Patient&' +
        //             'from=2023-08-28&' +
        //             'sortBy=popularity&' +
        //             'apiKey=af17597cd9564f5bb7615fa5ff39b6ad';


               const     url = 'https://newsapi.org/v2/everything?'+
       'q=Apple&'+
       'from=2023-08-27&'+
       'sortBy=popularity&'+
       'apiKey=af17597cd9564f5bb7615fa5ff39b6ad';
        
        const req = new Request(url);
  
        const response = await fetch(req);
        const result = await response.json();
        setNews(result.articles.slice(0, 5)); // Keep the top 5 articles
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
  
    fetchData();
  }, []);

  
  const [inputID, setInputID] = useState('');
  const { setPatientID } = useContext(PatientContext);
  const navigate = useNavigate();

  // Dummy data for the doctor's information
  const doctorInfo = {
    image: 'doctor-image.jpg', // Doctor's image URL
    name: 'Dr. John Smith',
    speciality: 'Cardiology',
    contact: '123-456-7890',
    email: 'johnsmith@example.com',
    degrees: 'MBBS, MD',
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

  return (
    <div>
      {/* Top Panel */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f0f0f0', padding: '10px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar src={doctoravatar} alt="Doctor" sx={{ width: 100, height: 100 }} />
          <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>Logout</Button>
        </div>
        <Card style={{ flex: '1', marginLeft: '20px', padding: '15px', backgroundColor: '#f7f9fc', flex: '30%' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" style={{ color: '#333', marginBottom: '10px' }}>{doctorInfo.name}</Typography>
            <Typography variant="subtitle1" style={{ color: '#666', marginBottom: '10px' }}>{doctorInfo.speciality}</Typography>
          </div>
          <div style={{ display: 'flex', gap: '15px' ,justifyContent:"center"}}>
            <div style={{ padding: '10px', border: '1px solid #eaeaea', borderRadius: '5px' }}>
              <Typography variant="body2" style={{ fontWeight: 'bold' }}>Contact:</Typography>
              <Typography variant="body1">{doctorInfo.contact}</Typography>
            </div>
            <div style={{ padding: '10px', border: '1px solid #eaeaea', borderRadius: '5px' }}>
              <Typography variant="body2" style={{ fontWeight: 'bold' }}>Email:</Typography>
              <Typography variant="body1">{doctorInfo.email}</Typography>
            </div>
            <div style={{ padding: '10px', border: '1px solid #eaeaea', borderRadius: '5px' }}>
              <Typography variant="body2" style={{ fontWeight: 'bold' }}>Degrees:</Typography>
              <Typography variant="body1">{doctorInfo.degrees}</Typography>
            </div>
            <div style={{ padding: '10px', border: '1px solid #eaeaea', borderRadius: '5px' }}>
              <Typography variant="body2" style={{ fontWeight: 'bold' }}>Hospital:</Typography>
              <Typography variant="body1">{doctorInfo.hospital}</Typography>
            </div>
          </div>
        </Card>
      </div>


      {/* Main Content Area */}
      <div style={{ display: 'flex', height: '90%' }}>




        {/* Middle Panel */}
        <div style={{ flex: '30%', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
           

          <Card style={{ display: 'flex', marginBottom: '20px', padding: '15px', backgroundColor: "azure" }}>
            {/* Left Part with Graph */}
            <div style={{ flex: '50%', marginRight: '10px' }}>
              <Typography variant="h6" style={{ marginBottom: '10px' }}>Last 7 Days Patient Count</Typography>
              <div style={{ height: '300px' }}> {/* Set your desired max height */}
                <Line
                  data={{
                    labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
                    datasets: [{
                      label: 'Patients',
                      data: [12, 19, 3, 5, 2, 3, 7], // Dummy data
                      borderColor: 'rgba(75,192,192,1)',
                      backgroundColor: 'rgba(75,192,192,0.2)',
                    }]
                  }}
                  options={{ maintainAspectRatio: false }}
                />
              </div>
            </div>
            
            {/* Right Part with Calendar */}
            <div style={{ flex: '50%', marginLeft: '10px', height: '300px' }}>
              <Typography variant="h6" style={{ marginBottom: '10px' }}>Calendar</Typography>
              <Calendar value={new Date()} /> {/* react-calendar component */}
            </div>
          </Card>


          {/* Bottom Card with 3 Patient Info Cards */}
          <Card style={{ padding: '15px' ,backgroundColor:"beige"}}>
          <Typography variant="h6" style={{ marginBottom: '10px' }}>Last 3 Visited Patients</Typography>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {[1, 2, 3].map((patient, index) => (
              <Card key={index} style={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: "#f5f5f5", borderTop: '0.5px solid gray' }}>
              <Avatar src={'dummyAvatar' + index} alt="Patient" />
              <Typography variant="body1">Name: Dummy Name {index}</Typography>
              <Typography variant="body2">Patient ID: {index}</Typography>
              <Button onClick={() => handlePatientDetail(index)}>Detail</Button>
            </Card>
            
            ))}
          </div>
        </Card>

        </div>













        
      
        {/* Right Panel */}
        <div style={{ flex: '30%', height: '690px', padding: '20px' }}> {/* Adjusted flex value */}
          <Card style={{ padding: '5px', backgroundColor: "azure", marginBottom: "20px" }}>
            <h2 style={{textAlign:"center"}}>Search Patient</h2>
            <div style={{marginTop:"30px" , marginBottom:"30px", marginLeft:"130px"}}>
              <TextField label="Patient ID" value={inputID} onChange={(e) => setInputID(e.target.value)} />
              <Button onClick={handleSubmit}>Enter</Button>
            </div>
          </Card>

          {/* <Card style={{ height: '100%', padding: '15px', overflowY: 'scroll', backgroundColor: "beige" }}>
            <h2 style={{textAlign:"center"}}>Recent News</h2>
          {news.map((article, index) => (
            <NewsCard key={index} news={article} />
          ))}
          </Card> */}
        </div>
      </div>
    </div>
  );
};

export default DoctorHomepage;
