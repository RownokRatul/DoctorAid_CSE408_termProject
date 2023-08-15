import React, { useState } from 'react';
import { Button, Card, TextField, List, ListItem } from '@mui/material';

function LeftFlexbox({ diseasesList, setDiseasesList, testsList, setTestsList }) {

  const [disease, setDisease] = useState('');
  const [test, setTest] = useState('');

  const handleAddDisease = () => {
    if (disease.trim() !== ''){
      setDiseasesList([...diseasesList, disease]);
      setDisease('');
    }
  };

  const handleAddTest = () => {
    if (test.trim() !== ''){
      setTestsList([...testsList, test]);
      setTest('');
    }
  };

  return (
    <div className="left-flexbox" style={{ width: '95%', backgroundColor: '#f9f9f9' }}>
    <h3 style={{ textAlign: 'center', paddingTop: '5px' }}>Add Vitals</h3>
    <Card style={{ padding: '5px', marginBottom: '5px', height: '31%', backgroundColor: '#f9f9f9' }}>
      <TextField fullWidth label="BP" />
      <TextField fullWidth label="Pulse Rate" />
    </Card>

    <Card style={{ padding: '5px', marginBottom: '5px', height: '31%', backgroundColor: '#f9f9f9' }}>
      <h3 style={{ textAlign: 'center', paddingTop: '5px' }}>Add Symptoms</h3>
      <TextField value={disease} onChange={(e) => setDisease(e.target.value)} fullWidth label="Symptoms" />
      <div style={{ textAlign: 'center' }}> {/* Center the button */}
        <Button onClick={handleAddDisease}>Add</Button>
      </div>
      <div style={{ maxHeight: '100px', overflow: 'auto' }}> {/* Make the list scrollable */}
        <List>
          {diseasesList.map((disease, index) => (
            <ListItem key={index}>{disease}</ListItem>
          ))}
        </List>
      </div>
    </Card>

    <Card style={{ padding: '5px', marginBottom: '5px', height: '31%', backgroundColor: '#f9f9f9' }}>
      <h3 style={{ textAlign: 'center', paddingTop: '5px' }}>Add Tests</h3>
      <TextField value={test} onChange={(e) => setTest(e.target.value)} fullWidth label="Test" />
      <div style={{ textAlign: 'center' }}> {/* Center the button */}
        <Button onClick={handleAddTest}>Add</Button>
      </div>
      <div style={{ maxHeight: '100px', overflow: 'auto' }}> {/* Make the list scrollable */}
        <List>
          {testsList.map((test, index) => (
            <ListItem key={index}>{test}</ListItem>
          ))}
        </List>
      </div>
    </Card>
  </div>
  );
}

export default LeftFlexbox;
