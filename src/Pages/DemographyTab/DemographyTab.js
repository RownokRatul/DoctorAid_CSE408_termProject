import {React,useEffect,useState,useContext} from 'react';
import { Grid,Box } from '@mui/material';
import BasicInfoCard from './Components/BasicInfoCard'
import AddressCard from './Components/AddressCard'
import OccupationCard from './Components/OccupationCard';
import TravelHistoryCard from './Components/TravelHistoryCard';
import { PatientContext } from '../../PatientContext';
import axios from 'axios';

const DemographyTab = () => {
  const [data, setData] = useState(null);

  // Fetch patient ID from context
  const { patientId } = useContext(PatientContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/v0/patients/get_demography_tab_info/', {
          id: patientId  // Use the patient ID from context here
        });

        if (response.status === 200) {
          setData(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching demography data:', error);
      }
    };
    fetchData();
  }, [patientId]); 

  if (!data) return <div>Loading...</div>;

  const patientInfo = data.patient_demography_info[0];

  const currentAddress = {
    name: patientInfo.addresses.slice(-1)[0],
    from: new Date(patientInfo.address_from.slice(-1)[0]).toISOString().split('T')[0]
  };

  const previousAddresses = patientInfo.addresses.slice(0, -1).map((addr, index) => ({
    name: addr,
    from: new Date(patientInfo.address_from[index]).toISOString().split('T')[0],
    to: new Date(patientInfo.address_to[index]).toISOString().split('T')[0]
  }));

  const currentOccupation = {
    name: patientInfo.occupations.slice(-1)[0],
    from: new Date(patientInfo.occupation_from.slice(-1)[0]).toISOString().split('T')[0]
  };

  const previousOccupations = patientInfo.occupations.slice(0, -1).map((occupation, index) => ({
    name: occupation,
    from: new Date(patientInfo.occupation_from[index]).toISOString().split('T')[0],
    to: new Date(patientInfo.occupation_to[index]).toISOString().split('T')[0]
  }));

  const travelHistories = patientInfo.travel_history.map((history, index) => ({
    name: history,
    from: new Date(patientInfo.travel_from[index]).toISOString().split('T')[0],
    to: new Date(patientInfo.travel_to[index]).toISOString().split('T')[0]
  }));
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} marginTop={'30px'}>
        <BasicInfoCard name={patientInfo.name} gender={patientInfo.gender} age={patientInfo.age} />
      </Grid>
      <Grid item xs={12}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}>
          <Box mb={2} flex={1} pr={2} sx={{borderRight: '1px solid #ccc'}}>
            <AddressCard title="Current Address" addresses={[currentAddress]} />
            <AddressCard title="Previous Addresses" addresses={previousAddresses} />
          </Box>
          <Box mb={2} flex={1} px={2} sx={{borderRight: '1px solid #ccc'}}>
            <OccupationCard title="Current Occupation" occupations={[currentOccupation]} />
            <OccupationCard title="Previous Occupations" occupations={previousOccupations} />
          </Box>
          <Box mb={2} flex={1.5} pl={2} >
            <TravelHistoryCard histories={travelHistories} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default DemographyTab;