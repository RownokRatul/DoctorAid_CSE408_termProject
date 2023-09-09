import React, { useState, useEffect } from 'react';
import { Button, Card, TextField, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Autocomplete } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function LeftFlexbox({ diseasesList, setDiseasesList, testsList, setTestsList,setSelectedTags }) {
  const [disease, setDisease] = useState(null);
  const [test, setTest] = useState(null);
  const [allDiseases, setAllDiseases] = useState([]);
  const [allTests, setAllTests] = useState([]);
  const [allTags, setAllTags] = useState([]);


  useEffect(() => {
    console.log("diseasesList:", diseasesList);
    console.log("testsList:", testsList);
    console.log("allTags:", allTags);
  }, [diseasesList, testsList, allTags]);
  useEffect(() => {
    fetch('api/v0/get_all_diseases')
      .then(res => res.json())
      .then(data => setAllDiseases(data.data))
      .catch(err => console.error('Failed to fetch diseases:', err));

    fetch('api/v0/get_all_tests')
      .then(res => res.json())
      .then(data => setAllTests(data.data))
      .catch(err => console.error('Failed to fetch tests:', err));


    fetch('api/v0/search_by_tag')
      .then(res => res.json())
      .then(data => setAllTags(data.data))
      .catch(err => console.error('Failed to fetch tags:', err));

  }, []);

  const handleAddDisease = () => {
  if (disease && !diseasesList.includes(disease.id)) {
    setDiseasesList(prevState => [...prevState, disease.id]);
    
    

  }
  setDisease(null);
};


  const handleAddTest = () => {
    if (test && !testsList.includes(test.id)) {
      setTestsList(prevState => [...prevState, test.id]);
    }
    setTest(null);
  };

  const handleDeleteDisease = (id) => {
    setDiseasesList(diseasesList.filter(diseaseId => diseaseId !== id));
  };

  const handleDeleteTest = (id) => {
    setTestsList(testsList.filter(testId => testId !== id));
  };

  return (
    <div className="left-flexbox" style={{ width: '95%', backgroundColor: '#f9f9f9' }}>
      <Card style={{ padding: '5px', marginBottom: '5px', height: '31%', backgroundColor: 'azure' }}>
      <TextField fullWidth label="BP" />
      <TextField fullWidth label="Pulse Rate" />
      </Card>
      <Card style={{ padding: '5px', marginBottom: '5px', height: '31%', backgroundColor: 'azure' }}>
        <h3 style={{ textAlign: 'center', paddingTop: '5px' }}>Add Symptoms</h3>
        <Autocomplete
          options={allDiseases}
          getOptionLabel={(option) => option.disease_name}
          value={disease}
          onChange={(event, newValue) => setDisease(newValue)}
          renderInput={(params) => <TextField {...params} label="Symptoms" />}
        />
        <Button onClick={handleAddDisease}>Add</Button>
        <List>
          {diseasesList.map((diseaseId) => {
            const disease = allDiseases.find(d => d.id === diseaseId);
            return disease ? (
              <ListItem key={diseaseId}>
                <ListItemText primary={disease.disease_name} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteDisease(diseaseId)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ) : null;
          })}
        </List>
      </Card>

      <Card style={{ padding: '5px', marginBottom: '5px', height: '31%', backgroundColor: 'azure' }}>
        <h3 style={{ textAlign: 'center', paddingTop: '5px' }}>Add Tests</h3>
        <Autocomplete
          options={allTests}
          getOptionLabel={(option) => option.test_name} // Adjust the field name as per your API response
          value={test}
          onChange={(event, newValue) => setTest(newValue)}
          renderInput={(params) => <TextField {...params} label="Tests" />}
        />
        <Button onClick={handleAddTest}>Add</Button>
        <List>
          {testsList.map((testId) => {
            const test = allTests.find(t => t.id === testId);
            return test ? (
              <ListItem key={testId}>
                <ListItemText primary={test.test_name} /> {/* Adjust the field name as per your API response */}
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTest(testId)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ) : null;
          })}
        </List>
      </Card>
    </div>
  );
}

export default LeftFlexbox;
