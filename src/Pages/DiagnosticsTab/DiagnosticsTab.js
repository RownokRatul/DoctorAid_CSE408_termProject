
import { PatientContext } from '../../PatientContext'

import { usePatientIDValidation } from '../../PatientIDValidation';
import React, { useState, useContext, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Dialog, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';


const Diagnostics = () => {
  usePatientIDValidation();
  const { patientID } = useContext(PatientContext);
  const [prescribedTests, setPrescribedTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if(patientID === null) return;
    
    const fetchData = async () => {
      try {
        const response = await fetch('api/v0/get_prescribed_tests_by_patient_id/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ patient_id: patientID }),
        });
        const result = await response.json();
        setPrescribedTests(result.data);
      } catch (error) {
        console.error('Failed to fetch prescribed tests:', error);
      }
    };

    fetchData();
  }, [patientID]);

  const handleClickDetail = async (testId, prescriptionId) => {
    try {
      // First, fetch the test metadata.
      const metadataResponse = await fetch('api/v0/get_test_metadata/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ test_id: testId }),
      });
      const metadata = await metadataResponse.json();
  
      // Then, fetch the specific test values.
      const valuesResponse = await fetch('api/v0/get_prescribed_test_by_test_id/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prescription_id: prescriptionId, test_id: testId }),
      });
      const valuesData = await valuesResponse.json();
  
      // Combine the metadata and test values into a single object.
      const selectedTestData = {
        ...metadata.data,
        test_values: valuesData.data.test_values,
      };
  
      setSelectedTest(selectedTestData);
      setDialogOpen(true);
    } catch (error) {
      console.error('Failed to fetch test details:', error);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <h1 style={{textAlign:"center",marginTop:"50px"}}>Previous Tests</h1>
      {prescribedTests.map((test) => (
        <Card key={test.test_id} style={{ margin: '10px' ,backgroundColor:"azure",textAlign:"center",marginTop:"50px"}}>
          <CardContent style={{margin:"20px"}}>
            <Typography variant="h5">{test.test_name}</Typography>
            <Typography variant="body2">Prescription ID: {test.prescription_id}</Typography>
            <Typography variant="body2">Test ID: {test.test_id}</Typography>
            <Typography variant="body2">Date: {test.date}</Typography>
            <Button variant="contained" color="primary" onClick={() => handleClickDetail(test.test_id, test.prescription_id)}>See Detail</Button>

          </CardContent>
        </Card>
      ))}

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <Paper style={{ padding: '20px' }}>
          <Typography variant="h6">{selectedTest?.test_name}</Typography>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell></TableCell>
                {selectedTest?.column_name.map((col, index) => (
                  <TableCell key={index}>{col}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedTest?.row_name.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell>{row}</TableCell>
                  {selectedTest.column_name.map((col, colIndex) => (
                    <TableCell key={colIndex}>{selectedTest.test_values[rowIndex * selectedTest.column_name.length + colIndex] || ''}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Dialog>
    </div>
  );
};

export default Diagnostics;
