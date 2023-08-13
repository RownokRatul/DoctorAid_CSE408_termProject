import React, { useState } from 'react';
import { Button, Card, TextField, List, ListItem } from '@mui/material';

function LeftFlexbox({ diseasesList, setDiseasesList, testsList, setTestsList }) {

  const [disease, setDisease] = useState('');
  const [test, setTest] = useState('');

  const handleAddDisease = () => {
    setDiseasesList([...diseasesList, disease]);
    setDisease('');
  };

  const handleAddTest = () => {
    setTestsList([...testsList, test]);
    setTest('');
  };

  return (
    <div className="left-flexbox" style={{ width: '95%', backgroundColor: '#f9f9f9' }}>
      <Card style={{  padding: '10px', marginBottom: '15px', height: '33%', backgroundColor: '#f9f9f9' }}>
        <TextField fullWidth label="BP" />
        <TextField fullWidth label="Pulse Rate" />
      </Card>

      <Card style={{ padding: '10px', marginBottom: '15px', height: '33%', backgroundColor: '#f9f9f9' }}>
        <TextField value={disease} onChange={(e) => setDisease(e.target.value)} fullWidth label="Disease" />
        <Button onClick={handleAddDisease}>Add</Button>
        <List>
          {diseasesList.map((disease, index) => (
            <ListItem key={index}>{disease}</ListItem>
          ))}
        </List>
      </Card>

      <Card style={{ padding: '10px', marginBottom: '15px', height: '33%', backgroundColor: '#f9f9f9' }}>
        <TextField value={test} onChange={(e) => setTest(e.target.value)} fullWidth label="Test" />
        <Button onClick={handleAddTest}>Add</Button>
        <List>
          {testsList.map((test, index) => (
            <ListItem key={index}>{test}</ListItem>
          ))}
        </List>
      </Card>
    </div>
  );
}

export default LeftFlexbox;
