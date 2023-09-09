
import React, { useState,useContext, useEffect } from 'react';
import { Button, Card, Container, Box } from '@mui/material';
import { createClient } from '@supabase/supabase-js';

import AddressCard from './Components/AddressCard';
import CurrentAddressCard from './Components/CurrentAddressCard';

import CurrentOccupationCard from './Components/CurrentOccupation';
import OccupationCard from './Components/Occupation';
import HistoryCard from './Components/TravelHistory';
import DiseasesCard from './Components/DiseaseCard';
import PrescriptionCard from './Components/PrescriptionUploadCard';
import HealthInfoCard from './Components/HealthInfoCard';
import { PatientContext } from '../../PatientContext';

import DiseasePrescriptionCard from './Components/DiseasePrescriptionCard'; // Import the new component

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InternDoctor = () => {

  const { SUPABASE_URL } = useContext(PatientContext);
  const { SUPABASE_ANN_KEY } = useContext(PatientContext);

  const { role } = useContext(PatientContext);

  const navigate = useNavigate();

  console.log("Role: ", role);

  const { phoneNumber }=useContext(PatientContext);
  const [patientInfo, setPatientInfo] = useState(null); // To store the search results

  const [page, setPage] = useState(1); // State to manage the current page
  const [info, setInfo] = useState({
    
    currentAddress: { name: '', from: '' },
    addresses: [],
    currentOccupation: { name: '', from: '' },
    occupations: [],
    histories: [] 

  });

  const [healthInfo, setHealthInfo] = useState({
    height: '',
    weight: '',
    heartRate: '',
    bpLow: '',
    bpHigh: ''
  });

  // In InternDoctor.js

  const [diseasePrescriptionPairs, setDiseasePrescriptionPairs] = useState([{ disease: null, file: null, date: null }]);


  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.post('api/v0/search_patient/', {
          phone: phoneNumber,
        });
        setPatientInfo(response.data.data);
        console.log("response",response.data);

        
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    // access control
    if(role !== 'intern') {
      navigate('/');
    }
    else if(!phoneNumber) {
      navigate('/intern');
    }
    else {
      fetchData();
    }

  }, []); 

 
  useEffect(() => {
    if(patientInfo) {
      let addresses = [], occupations = [], histories = [];
  
      if (patientInfo.addresses && patientInfo.addresses.length > 0) {
        const addressLen = patientInfo.addresses.length;
        addresses = patientInfo.addresses.slice(0, addressLen - 1).map((addr, index) => ({
          name: addr,
          from: new Date(patientInfo.address_from[index]).toISOString().split('T')[0],
          to: new Date(patientInfo.address_to[index]).toISOString().split('T')[0]
        }));
      }
  
      if (patientInfo.occupations && patientInfo.occupations.length > 0) {
        const occupationLen = patientInfo.occupations.length;
        occupations = patientInfo.occupations.slice(0, occupationLen - 1).map((occupation, index) => ({
          name: occupation,
          from: new Date(patientInfo.occupation_from[index]).toISOString().split('T')[0],
          to: new Date(patientInfo.occupation_to[index]).toISOString().split('T')[0]
        }));
      }
  
      if (patientInfo.travel_history && patientInfo.travel_history.length > 0) {
        histories = patientInfo.travel_history.map((history, index) => ({
          name: history,
          from: new Date(patientInfo.travel_from[index]).toISOString().split('T')[0],
          to: new Date(patientInfo.travel_to[index]).toISOString().split('T')[0]
        }));
      }
  
      setInfo({
        currentAddress: patientInfo.addresses && patientInfo.addresses.length > 0 ? { 
          name: patientInfo.addresses[patientInfo.addresses.length - 1], 
          from: new Date(patientInfo.address_from[patientInfo.addresses.length - 1]).toISOString().split('T')[0]
        } : { name: '', from: '' },
        addresses,
        currentOccupation: patientInfo.occupations && patientInfo.occupations.length > 0 ? {
          name: patientInfo.occupations[patientInfo.occupations.length - 1],
          from: new Date(patientInfo.occupation_from[patientInfo.occupations.length - 1]).toISOString().split('T')[0]
        } : { name: '', from: '' },
        occupations,
        histories
      });
  
      setSelectedDiseases([]); // Assuming patientInfo doesn't have diseases for now
      setPrescriptions([{ file: '', date: '' }]); // Assuming patientInfo doesn't have prescriptions for now
    }
  }, [patientInfo]);


    const handleCurrentAddressChange = (field, value) => {
      setInfo({ ...info, currentAddress: { ...info.currentAddress, [field]: value } });
    };

      const handleCurrentOccupationChange = (field, value) => {
        setInfo({ ...info, currentOccupation: { ...info.currentOccupation, [field]: value } });
    };

  

    const handleAddressChange = (index, field, value) => {
        const newAddresses = [...info.addresses];
        newAddresses[index][field] = value;
        setInfo({ ...info, addresses: newAddresses });
    };

    const handleOccupationChange = (index, field, value) => {
      const newOccupations = [...info.occupations];
      newOccupations[index][field] = value;
      setInfo({ ...info, occupations: newOccupations });
    };
    const handlehistoryChange = (index, field, value) => {
      const newhistories = [...info.histories];
      newhistories[index][field] = value;
      setInfo({ ...info, histories: newhistories });
    };
    
    const handleHealthInfoChange = (field, value) => {
      setHealthInfo({ ...healthInfo, [field]: value });
    };

    const addAddress = () => {
        setInfo({ ...info, addresses: [...info.addresses, { name: '', from: '', to: '' }] });
    };

    const addOccupation = () => {
      setInfo({ ...info, occupations: [...info.occupations, { name: '', from: '', to: '' }] });
    };
    const addhistory = () => {
      setInfo({ ...info, histories: [...info.histories, { name: '', from: '', to: '' }] });
    };

    const [selectedDiseases, setSelectedDiseases] = useState([]);
    const [prescriptions, setPrescriptions] = useState([{ file: '', date: '' }]);

    const handleDiseaseSelection = (disease) => {
        setSelectedDiseases(selectedDiseases.includes(disease)
        ? selectedDiseases.filter(d => d !== disease)
        : [...selectedDiseases, disease]);
    };

    const handlePrescriptionChange = (index, field, value) => {
        const newPrescriptions = [...prescriptions];
        newPrescriptions[index][field] = value;
        setPrescriptions(newPrescriptions);
    };

    const addPrescription = () => {
        setPrescriptions([...prescriptions, { file: '', date: '' }]);
    };

    const handleNext= () => {
    
    setPage(2);
  }
  const handleNext2= () => {
    setPage(3);
  }

  const uploadFileAndGetURL = async (file) => {

    console.log(SUPABASE_URL);
    console.log(SUPABASE_ANN_KEY);

    const bucket = "prescriptions";
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANN_KEY);

    const { error } = await supabase.storage.from(bucket).upload(file.name, file);
  
    if (error) {
      console.error("Upload error", error);
      return null;
    }
    return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${encodeURIComponent(file.name)}`;
  };

  const convertDateToISO = (dateString) => {
    const dateObj = new Date(dateString);
    dateObj.setUTCHours(0, 0, 0, 0);
    return dateObj.toISOString();
  };


  const handleFinalSubmit = async () => {
    // Combine all the information collected across the two pages

    // const file_URL = await uploadFileAndGetURL(prescriptions[0].file);
    // console.log(file_URL);
    // Add this in handleFinalSubmit in InternDoctor.js

  //   const result = {
  //     addresses: [info.currentAddress.name, ...info.addresses.map(a => a.name)],
  //     address_from: [info.currentAddress.from, ...info.addresses.map(a => a.from)],
  //     address_to: info.addresses.map(a => a.to),
  //     occupations: [info.currentOccupation.name, ...info.occupations.map(a => a.name)],
  //     occupation_from: [info.currentOccupation.from, ...info.occupations.map(a => a.from)],
  //     occupation_to: info.occupations.map(a => a.to),
  //     histories: info.histories.map(a => a.name),
  //     history_from: info.histories.map(a => a.from),
  //     history_to: info.histories.map(a => a.to),
  //     diseases: selectedDiseases,
  //     prescriptions: file_URL,
  //   };
  
  //   // Output the final result to the console
  //   console.log(JSON.stringify(result));
  // }

  // access control
  // if(role !== 'intern') {
  //   navigate('/');
  //   // return <h1>Access Denied!</h1>
  // }

      const diseasePrescriptions = await Promise.all(
        diseasePrescriptionPairs.map(async (pair) => {
          if(pair.file ===null){
            return {
              disease_id: pair.diseaseId,
              patient_id: patientInfo.id,
              date: pair.date,
              prescription: null
            };
          }
          const file_URL = await uploadFileAndGetURL(pair.file);
          return {
            disease_id: pair.diseaseId,
            patient_id: patientInfo.id,
            date: pair.date,
            prescription: file_URL
          };
        })
      );


    

    
     console.log("HealthInfo",healthInfo.height);
     console.log("PatientInfo",patientInfo.height);
    
    



    // Send the result to the backend
    
        try {
            const response = await axios.put("api/v0/update_patient/", 
            {
              id: patientInfo.id,
              height: healthInfo.height ? parseFloat(healthInfo.height) : null,
              weight: healthInfo.weight ? parseFloat(healthInfo.weight) : null,
              // height: patientInfo.height,
              // weight: patientInfo.weight,
              addresses: [info.currentAddress.name, ...info.addresses.map(a => a.name)],
              address_from: [info.currentAddress.from, ...info.addresses.map(a => a.from)].map(convertDateToISO),
              address_to: info.addresses.map(a => a.to).map(convertDateToISO),
              occupations: [info.currentOccupation.name, ...info.occupations.map(a => a.name)],
              occupation_from: [info.currentOccupation.from, ...info.occupations.map(a => a.from)].map(convertDateToISO),
              occupation_to: info.occupations.map(a => a.to).map(convertDateToISO),
              travel_history: info.histories.map(a => a.name),
              travel_from: info.histories.map(a => a.from).map(convertDateToISO),
              travel_to: info.histories.map(a => a.to).map(convertDateToISO)
            }
            );
            console.log("response", response.data);
            // Assuming the API response contains the search result data
            if (response.status === 200 ) {
                console.log("response", response.data);
            } else {
               console.log("response", response.data);
            }
          } catch (error) {
            console.error("Error updating:", error);
            
          }

           
        try {
          const response = await axios.post("api/v0/add_medical_history/", 
          diseasePrescriptions
          );
          console.log("response", response.data);
          // Assuming the API response contains the search result data
          if (response.status === 200 ) {
              console.log("response", response.data);
          } else {
             console.log("response", response.data);
          }
        } catch (error) {
          console.error("Error updating history:", error);
          
        }

        try {
          const response = await axios.post("api/v0/add_bp_hr/", 
          {
            patient_id:  patientInfo.id,
            taken_at: "2022-05-01",
            hr_value : parseInt(healthInfo.heartRate,10),
            bp_value_low : parseInt(healthInfo.bpLow,10),
            bp_value_high : parseInt(healthInfo.bpHigh,10)
          }
          );
          console.log("response", response.data);
          // Assuming the API response contains the search result data
          if (response.status === 200 ) {
              console.log("response", response.data);
          } else {
             console.log("response", response.data);
          }
        } catch (error) {
          console.error("Error updating:", error);
          
        }
  };
  return (
    <Container maxWidth="md">
      <Box bgcolor="background.paper" p={3} boxShadow={20} borderRadius={2} marginTop={10}>
        {page === 1 ? (
          <>
            <Box mb={2}>
              <Card>
                <CurrentAddressCard currentAddress={info.currentAddress} handleChange={handleCurrentAddressChange} />
              </Card>
            </Box>
            <Box mb={2}>
              <Card>
                <AddressCard addresses={info.addresses} handleAddressChange={handleAddressChange} addAddress={addAddress} />
              </Card>
            </Box>
            <Box mb={2}>
              <Card>
                <CurrentOccupationCard currentOccupation={info.currentOccupation} handleChange={handleCurrentOccupationChange} />
              </Card>
            </Box>
            <Box mb={2}>
              <Card>
                <OccupationCard occupations={info.occupations} handleOccupationChange={handleOccupationChange} addOccupation={addOccupation} />
              </Card>
            </Box>
            <Box mb={2}>
              <Card>
                <HistoryCard histories={info.histories} handlehistoryChange={handlehistoryChange} addhistory={addhistory} />
              </Card>
            </Box>
            <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
          </>
        ) : page === 2 ? (
          <>
            <Box mb={2}>
              <Card>
                <DiseasePrescriptionCard diseasePrescriptionPairs={diseasePrescriptionPairs} setDiseasePrescriptionPairs={setDiseasePrescriptionPairs} />
              </Card>
            </Box>
            <Button variant="contained" color="primary" onClick={handleNext2}>Next</Button>
          </>
        ) : (
          <>
            <Box mb={2}>
              <Card>
                <HealthInfoCard healthInfo={info.healthInfo} handleHealthInfoChange={handleHealthInfoChange} />
              </Card>
            </Box>
            <Button variant="contained" color="primary" onClick={handleFinalSubmit}>Submit</Button>
          </>
        )}
      </Box>
    </Container>
  );

}
export default InternDoctor;
  