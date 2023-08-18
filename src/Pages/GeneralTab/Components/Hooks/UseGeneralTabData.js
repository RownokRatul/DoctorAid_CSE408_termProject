
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import PatientInfoCard from '../Cards/PatientInfoCard'
import HealthStatsCard from '../Cards/HealthStatsCard'
import MajorSurgeriesCard from '../Cards/MajorSurgeriesCard'
import MajorDiseasesCard from '../Cards/MajorDiseasesCard'
import BloodPressureChart from '../Charts/BloodPressureChart'
import HeartRateChart from '../Charts/HeartRateChart'


import { Card } from '@mui/material';
import { useContext } from 'react';
import { PatientContext } from '../../../../PatientContext'

const useGeneralTabData = () => {
    const { patientID } = useContext(PatientContext);
    const [data, setData] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        console.log("hello");
        try {
            const response = await axios.post("api/v0/patients/get_demography_tab_info/", 
            {
                "id" : 1
            }
            );
            console.log("response", response.data);
            // Assuming the API response contains the search result data
            if (response.status === 200 ) {
                console.log("response", response.data);
            } else {
                setData(null);
            }
            console.log("response", response.data);
          } catch (error) {
            console.error("Error searching:", error);
            setData(null);
          }
        }});
            
            
       
  
    if (!data) {
      return <div>Loading...</div>;
    }

  // Dummy data for surgeries and diseases
  const surgeries = ['Appendectomy', 'Cholecystectomy'];
  const diseases = ['Hypertension', 'Diabetes'];

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ flex: '1', padding: '20px' }}>
        <PatientInfoCard patient={data} />
        <HealthStatsCard stats={data} />
        <MajorSurgeriesCard surgeries={surgeries} />
        <MajorDiseasesCard diseases={diseases} />
      </div>
      <div style={{ flex: '1', padding: '20px' }}>
        <Card style={{ marginBottom: '20px' }}>
          <HeartRateChart heartRates={data.heart_rate_data} />
        </Card>
        <Card style={{ marginBottom: '20px' }}>
          <BloodPressureChart bloodPressure={data.blood_pressure_data} />
        </Card>
        {/* Add other charts here */}
      </div>
    </div>
  );
};

export default useGenerlTabData;
