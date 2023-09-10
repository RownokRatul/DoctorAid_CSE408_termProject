import React, { useState, useEffect } from 'react';
import { Card, TextField, Table, TableBody, TableCell, TableHead, TableRow, Button, List, ListItem, Dialog, DialogTitle, DialogActions,DialogContent,DialogContentText } from '@mui/material';
import remove from './Image/trash-bin.png'; // Make sure you have this path correct
function RightFlexbox({ SearchResults }) {

  // const [allDiseases, setAllDiseases] = useState([]);
  // const [allTests, setAllTests] = useState([]);
  // const [allDrugs, setAllDrugs] = useState([]);

  // useEffect(() => {
  //   fetch('api/v0/get_all_diseases')
  //     .then(res => res.json())
  //     .then(data => setAllDiseases(data.data))
  //     .catch(err => console.error('Failed to fetch diseases:', err));

  //   fetch('api/v0/get_all_tests')
  //     .then(res => res.json())
  //     .then(data => setAllTests(data.data))
  //     .catch(err => console.error('Failed to fetch tests:', err));

  //   fetch('api/v0/get_all_brand_drugs')
  //     .then(res => res.json())
  //     .then(data => setAllDrugs(data.data))
  //     .catch(err => console.error('Failed to fetch Drugs:', err));

  // }, []);

  console.log("IN RIGHT FLEXBOX", SearchResults);
  const { tests, prescriptions, medical_history } = SearchResults|| {};

  return (
    <div className="right-flexbox" style={{ padding: '20px' }}>
      {/* Tests */}
      <Card style={{ marginBottom: '20px' }}>
        <div style={{ padding: '15px' }}>
          <h3>Tests</h3>
          <List>
            {tests && tests.map((test, index) => (
              <ListItem key={index}>{test.name /* or whatever field the test has */}</ListItem>
            ))}
          </List>
          <div style={{ textAlign: 'right' }}>
            <Button color="primary" variant="outlined">See More</Button>
          </div>
        </div>
      </Card>

      {/* Prescriptions */}
      <Card style={{ marginBottom: '20px' }}>
        <div style={{ padding: '15px' }}>
          <h3>Prescriptions</h3>
          <List>
            {prescriptions && prescriptions.map((prescription) => (
              <ListItem key={prescription.id}>
                {new Date(prescription.date).toLocaleDateString()} - Dr. {prescription.doctor_username}
              </ListItem>
            ))}
          </List>
          <div style={{ textAlign: 'right' }}>
            <Button color="primary" variant="outlined">See More</Button>
          </div>
        </div>
      </Card>

      {/* Medical History */}
      <Card style={{ marginBottom: '20px' }}>
        <div style={{ padding: '15px' }}>
          <h3>Medical History</h3>
          <List>
            {medical_history && medical_history.map((history, index) => (
              <ListItem key={index}>{history.event /* or whatever field the history has */}</ListItem>
            ))}
          </List>
          <div style={{ textAlign: 'right' }}>
            <Button color="primary" variant="outlined">See More</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default RightFlexbox;
