// pages/GeneralTab.js

import React from 'react';

import PatientInfoCard from './Components/Cards/PatientInfoCard';
import HealthStatsCard from './Components/Cards/HealthStatsCard';
import MajorSurgeriesCard from './Components/Cards/MajorSurgeriesCard';
import MajorDiseasesCard from './Components/Cards/MajorDiseasesCard';


import HeartRateChart from './Components/Charts/HeartRateChart';
import BloodPressureChart from './Components/Charts/BloodPressureChart';
import GlucoseLevelChart from './Components/Charts/GlucoseLevelChart';


import { Card } from '@mui/material';


// Dummy data
const patient = {
  avatar: '/path/to/avatar.jpg',
  name: 'John Doe',
  age: 32,
  contact: '123-456-7890',
  // ... other details ...
};
const stats = {
  height: 180,
  weight: 70,
  bmi: 21.6,
  heartRate: 72,
  bloodPressure: '120/80',
  glucose: 100,
};
const surgeries = ['Appendectomy', 'Cholecystectomy'];
const diseases = ['Hypertension', 'Diabetes'];


const GeneralTab = () => {
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ flex: '1', padding: '20px' }}>
        <PatientInfoCard patient={patient} />
        <HealthStatsCard stats={stats} />
        <MajorSurgeriesCard surgeries={surgeries} />
        <MajorDiseasesCard diseases={diseases} />
      </div>
      <div style={{ flex: '1', padding: '20px' }}>
        <Card style={{ marginBottom: '20px' }}>
          <HeartRateChart />
        </Card>
        <Card style={{ marginBottom: '20px' }}>
          <BloodPressureChart />
        </Card>
        <Card>
          <GlucoseLevelChart />
        </Card>
      </div>
    </div>
  );
};

export default GeneralTab;
