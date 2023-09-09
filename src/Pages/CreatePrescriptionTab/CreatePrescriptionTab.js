// pages/CreatePrescriptionPage.js

import {React,useEffect,useContext} from 'react';
import { Button, Grid } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import LeftFlexbox from './Components/LeftFlexBox';
import MiddleFlexbox from './Components/MiddleFlexBox';
import RightFlexbox from './Components/RightFlexBox';
import TopBanner from './Components/TopBanner';
import BottomBanner from './Components/BottomBanner';
import { useState } from 'react';
import { usePatientIDValidation } from '../../PatientIDValidation';
import { PatientContext } from '../../PatientContext';



const patientInfo = {
  id: '123',
  name: 'John Doe',
  address: '123 Main St.',
};

const prescriptionNo = 'RX456';
const avatarSrc = 'path/to/avatar.png'; // or a URL to an image


const CreatePrescriptionPage = () => {
  usePatientIDValidation();

  const {patientID}=useContext(PatientContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [diseasesList, setDiseasesList] = useState([]);
  const [testsList, setTestsList] = useState([]);

  // State from MiddleFlexbox
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  
  const [selectedMedicineNames, setSelectedMedicineNames] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const [allResults, setAllResults] = useState([]); // To store all the results



  useEffect(() => {
    console.log("Selected tags: ", selectedTags,selectedMedicineNames);
    console.log("NExt line");
    const uniqueTags = [...new Set(selectedTags)];
    console.log("Unique tags: ", uniqueTags);

    const requestBody = {
      patient_id: patientID,
      tags: uniqueTags,
    };

    
  
    fetch('api/v0/search_by_tag', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Result:",data);
        console.log("Request body: ", requestBody);
        setAllResults(data.data);
      }
      )
      .catch((err) => {
        console.error('Failed to search by tag:', err);
        // Handle the error here if necessary
      });  









  }, [selectedTags]);

  useEffect(() => {

    console.log("Selected disease: ", diseasesList);
    const fetchData = async () => {  // Define an async function
      console.log("IN HERE: ",diseasesList);
      try {
        const response = await fetch('api/v0/get_disease_tags_by_id/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            disease_ids: diseasesList,
          }),
        });
        
        console.log("RESPONSE:", response);
        
        if (response.status === 404) {
          console.log("Ekhane onek kichu missing");
        }
  
        const result = await response.json(); // Await the result here
        if (result.message === 'Success') {
          // append the result to selectedTags
          setSelectedTags([...selectedTags, ...result.data]);
          console.log("all tags disease: ", selectedTags);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
  
    fetchData();  // Immediately invoke the async function


  }, [diseasesList]);

  // write a same useEffect for testsList

  useEffect(() => {

    console.log("Selected tests: ", testsList);
    const fetchData = async () => {  // Define an async function
      console.log("IN HERE: ",testsList);
      try {
        const response = await fetch('api/v0/get_test_tags_by_id/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            test_ids: testsList,
          }),
        });

        console.log("RESPONSE:", response);

        if (response.status === 404) {
          console.log("Ekhane onek kichu missing");
        }

        const result = await response.json(); // Await the result here
        if (result.message === 'Success') {
          // append the result to selectedTags
          setSelectedTags([...selectedTags, ...result.data]);
          console.log("all tags test: ", selectedTags);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();  // Immediately invoke the async function


  }, [testsList]);

  // write a same useEffect for selectedMedicineNames

  useEffect(() => {

    console.log("Selected medicine: ", selectedMedicineNames);
    const fetchData = async () => {  // Define an async function
      console.log("IN HERE: ",selectedMedicineNames);
      try {
        const response = await fetch('api/v0/get_drug_tags_by_id/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            drug_ids: selectedMedicineNames,
          }),
        });

        console.log("RESPONSE:", response);

        if (response.status === 404) {
          console.log("Ekhane onek kichu missing");
        }

        const result = await response.json(); // Await the result here
        if (result.message === 'Success') {
          // append the result to selectedTags
         setSelectedTags([...selectedTags, ...result.data]);
          console.log("all tags medicine: ", selectedTags,selectedMedicineNames);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();  // Immediately invoke the async function


  }, [selectedMedicineNames]);

    






  const resetData = async () => {
    // Reset all states to their initial values
    setDiseasesList([]);
    setTestsList([]);
    setSelectedMedicines([]);
    setSelectedMedicineNames([]);
    setSelectedTags([]);
    setAllResults([]);


    // Navigate to the desired page
    navigate(location.state?.from || '/');
  };


  const handleClearAll = () => {
    // Clear all the states
    console.log('Clearing all the states');
    setDiseasesList([]);
    setTestsList([]);
    setSelectedMedicines([]);
  };

  return (
    
    <div
      style={{
        transform: 'scale(1)',
        opacity: 1,
        position: 'fixed',
        top: '5%',
        left: '5%',
        width: '90%',
        height: '90%',
        background: '#fff',
        zIndex: 100,
        marginTop: '10px',
        marginBottom: '200px',
        borderRadius: '10px',
        borderTop: '1px solid #000',
        borderLeft: '1px solid #000',
        borderRight: '1px solid #000',
        borderBottom: '1px solid #000',
        boxShadow: '0 0 50px rgba(0, 0, 0, 0.5)',
        overflow: 'auto',
        transition: 'transform 10.5s ease, opacity 10.5s ease', // Add transition
      }}
    >
      <Button onClick={resetData}>Close</Button>
      
      
      {/* Top Banner with 15% height */}
      <TopBanner patientInfo={patientInfo} prescriptionNo={prescriptionNo} avatarSrc={avatarSrc} />
      
      {/* Middle 70% Flexbox */}
      <Grid container style={{ height: '100%', width: '100%' }}>
        <Grid item xs={3}>
            <LeftFlexbox diseasesList={diseasesList} setDiseasesList={setDiseasesList} testsList={testsList} setTestsList={setTestsList} setSelectedTags={setSelectedTags} 
            
            />
        </Grid>
        <Grid item xs={5}>
            <MiddleFlexbox selectedMedicines={selectedMedicines} setSelectedMedicines={setSelectedMedicines} selectedMedicineNames={selectedMedicineNames} setSelectedMedicineNames={setSelectedMedicineNames}/>
        </Grid>
        <Grid item xs={4}>
          <RightFlexbox  SearchResults={allResults} />
        </Grid>
      </Grid>

      {/* Bottom Banner with 15% height */}
      <BottomBanner handleClearAll={handleClearAll}/>
    </div>
  );
};

export default CreatePrescriptionPage;
