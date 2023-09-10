
import { PatientContext } from '../../PatientContext'

import { usePatientIDValidation } from '../../PatientIDValidation';
import React, { useState, useContext, useEffect } from 'react';
import { Card, CardContent, Typography, Button, Dialog, Table, TableHead, TableRow, TableCell, TableBody, Paper, CircularProgress, FormControlLabel, Switch, Pagination, LinearProgress } from '@mui/material';
// import { use } from 'passport';


const Diagnostics = () => {
  usePatientIDValidation();
  const { patientID } = useContext(PatientContext);
  const { doctorInfo } = useContext(PatientContext);

  const [prescribedTests, setPrescribedTests] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filterMine, setFilterMine] = useState(false);

  // const [totalPages, setTotalPages] = useState(0);
  // const totalPages = Math.ceil(prescribedTests.length / itemsPerPage);
  // const displayedTests = prescribedTests.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  // const [page, setPage] = useState(1);
  // const [itemsPerPage, setItemsPerPage] = useState(2); // Showing 2 results per page

  useEffect(() => {
    if(patientID === null) return;
    
    console.log("Inside useEffect of Diagnostics.js");
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('api/v0/get_prescribed_tests_by_patient_id/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ patient_id: patientID }),
        });
        const result = await response.json();
        // setTotalPages(Math.ceil(result.data.length / itemsPerPage));
        setPrescribedTests(result.data);
        setFilteredTests(result.data);
        // console.log(result);
      } catch (error) {
        console.error('Failed to fetch prescribed tests:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [patientID]);


  useEffect(() => {
    console.log("Inside useEffect 2 of Diagnostics.js");
    const newFilteredTests = filterMine 
      ? prescribedTests.filter(test => test.doctor_username === doctorInfo.info.username) 
      : prescribedTests;
    
    setFilteredTests(newFilteredTests);
    console.log("filterMine: ",filterMine);
    console.log("Filtered Tests: ",filteredTests);
  }, [filterMine, prescribedTests, doctorInfo.info.username]);
    

  // const handlePageChange = (event, value) => {
  //   setPage(value);
  // };
  

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
    } finally {
      
    }
  };

  const handleToggleFilter = async () => {
    setFilterMine(!filterMine);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };


  return (

    <div style={{ position: 'relative', minHeight: '100vh' }}>
    <h1 style={{textAlign:"center",marginTop:"50px"}}>Previous Tests</h1>
      {isLoading ? (
        <div>
          <LinearProgress color="success" />
        </div>
      ) : (
        <div>

          <FormControlLabel
            control={
              <Switch
                checked={filterMine}
                onChange={handleToggleFilter}
                name="filterMine"
                color="primary"
              />
            }
            label="Filter"
          />

          {filteredTests.map((test) => (

            <Card key={test.test_id} style={{ margin: '10px' ,backgroundColor:"azure",textAlign:"center",marginTop:"50px"}}>
              <CardContent style={{margin:"20px"}}>
                <Typography variant="h5">{test.test_name}</Typography>
                <Typography variant="body2">Prescription ID: {test.prescription_id}</Typography>
                <Typography variant="body2">Test ID: {test.test_id}</Typography>
                <Typography variant="body2">Date: {new Date(test.date).toISOString().split('T')[0]}</Typography>
                <Button variant="contained" color="primary" onClick={() => handleClickDetail(test.test_id, test.prescription_id)}>See Detail</Button>
              </CardContent>
            </Card>
          ))}

          {/* <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Pagination count={totalPages} page={page} onChange={handlePageChange} />
          </div> */}

          <Dialog open={dialogOpen} onClose={handleCloseDialog} scroll="body">
          <Paper style={{ 
              padding: '20px', 
              width: '100vw',  // Set width
              height: '80vh',  // Set height
              overflow: 'auto'  // Content will be scrollable
            }}>
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
                        <TableCell key={colIndex}>
                          {col.toLowerCase() === "image" ? (
                            <img
                              src={selectedTest.test_values[rowIndex * selectedTest.column_name.length + colIndex] || ''}
                              alt="Data"
                              // width={500}
                              // height={500}
                            />
                          ) : (
                            selectedTest.test_values[rowIndex * selectedTest.column_name.length + colIndex] || ''
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default Diagnostics;
