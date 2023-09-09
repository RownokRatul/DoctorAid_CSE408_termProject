import React, { useState, useEffect, useContext } from 'react';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, TextField, Button, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { createClient } from '@supabase/supabase-js';

import diagnosticianAvatar from './Components/images/diagnostician.png'

import { PatientContext } from '../../PatientContext';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const DiagnosticianPage = () => {

  const { SUPABASE_URL } = useContext(PatientContext);
  const { SUPABASE_ANN_KEY } = useContext(PatientContext);
  const { logout } = useContext(PatientContext);
  const { role } = useContext(PatientContext);

  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [pendingTests, setPendingTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [selectedPrescription, setPrescription_id] = useState(null);
  const [tableData, setTableData] = useState({
    rowNames: [],
    columnNames: [],
    values: [],
  });
  const [loading, setLoading] = useState(true);

  // Fetching the list of pending tests
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('api/v0/get_queued_tests');
        const result = await response.json();
        if (result.message === 'Success') {
          console.log(result.data);
          setPendingTests(result.data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setLoading(false);
      }
    };

    // access control
    if(role !== 'diagnostician') {
      navigate('/');
    }else {
      fetchData();
    }

  }, []);

  const handleClickRow = async (testId,prescription_id) => {
    try {
      const response = await fetch('api/v0/get_test_metadata/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ test_id: testId }),
      });
      const result = await response.json();
      if (result.message === 'Success') {

        setSelectedTest(testId);
        setPrescription_id(prescription_id);
        console.log(result.data);

        const numRows = result.data.row_name.length;
        const numCols = result.data.column_name.length;

        let prefilled2D = [];

        if (result.data.prefilled_values) {
          for (let i = 0; i < numRows; i++) {
            const row = [];
            for (let j = 0; j < numCols; j++) {
              const index = i * numCols + j;
              row.push(result.data.prefilled_values[index]);
            }
            prefilled2D.push(row);
          }
        } else {
          prefilled2D = Array.from({ length: numRows }, () => Array(numCols).fill(''));
        }

        setTableData({
            test_name: result.data.test_name,
            rowNames: result.data.row_name,
            columnNames: result.data.column_name,
            values: prefilled2D
        });

        console.log(tableData);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };
  

  const handleFileChange = (rowIndex, colIndex, file) => {
    setTableData(prevState => {
      prevState.values[rowIndex][colIndex] = file;
      return { ...prevState };
    });
  };
  

  const handleInputChange = (rowIndex, colIndex, value) => {
    setTableData(prevState => {
      prevState.values[rowIndex][colIndex] = value;
      return { ...prevState };
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  
  const uploadFileAndGetURL = async (file) => {
    const bucket = "test_results";
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANN_KEY);

    const { error } = await supabase.storage.from(bucket).upload(file.name, file);
  
    if (error) {
      console.error("Upload error", error);
      return null;
    }
    return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${encodeURIComponent(file.name)}`;
  };



  const handleSubmit = async () => {
    // Create the payload

    for (let rowIndex = 0; rowIndex < tableData.values.length; rowIndex++) {
      for (let colIndex = 0; colIndex < tableData.values[rowIndex].length; colIndex++) {
        const value = tableData.values[rowIndex][colIndex];
        
        if (value instanceof File) {
          const fileURL = await uploadFileAndGetURL(value);
          console.log(fileURL);
          if (fileURL) {
            tableData.values[rowIndex][colIndex] = fileURL;
          } else {
            console.error("File upload failed");
          }
        }
      }
    }

    const payload = {
      prescription_id: selectedPrescription, // Make sure to set the correct prescription ID here
      test_id: selectedTest, // Set the correct test ID here
      test_values: tableData.values.flat(),
      date: selectedDate.toISOString(),
    };

    // console.log(payload);
  
    // Send the POST request
      try {
        const response = await fetch('api/v0/create_prescribed_test/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
    
        // Handle the response
        if (response.ok) {
          const result = await response.json();
          // Handle the success response here (e.g., navigate to a new page or show a success message)
        } else {
          // Handle the error response here
        }
      } catch (error) {
        console.error('Failed to submit data:', error);
        // Handle the error here
      }
      window.location.reload();
    };
  
  // access control
  if(role !== 'diagnostician') {
    // navigate('/');
    return <div>Loading...</div>;
  }

  return (
    
    <div style={{ display: 'flex', padding: '20px' }}>

      {/* Left Flexbox with Prescriptions */}
      {loading ? (
        <div>Loading...</div>
      ) : !selectedTest && (
        <Paper style={{ flex: '50%', marginRight: '20px', padding: '20px', overflow: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Prescription ID</TableCell>
                <TableCell>Test Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingTests.map((row) => (
                <TableRow key={row.test_id} hover onClick={() => handleClickRow(row.test_id,row.prescription_id)}>
                  <TableCell>{row.prescription_id}</TableCell>
                  <TableCell>{row.test_name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* Right Flexbox with Editable Table */}
      
      {selectedTest && (

        
        <Paper style={{ flex: '100%', padding: '20px', overflow: 'auto' }}>
          
          <Table>
            <caption style={{
              captionSide: 'top', 
              fontWeight: 'bold', 
              textAlign: 'center', 
              fontSize: '20px',
              textDecoration: 'underline',
            }}>
              {tableData.test_name}
            </caption>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                {tableData.columnNames.map((colName, index) => (
                  <TableCell key={index}>{colName}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.rowNames.map((rowName, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell>{rowName}</TableCell>
                  {tableData.columnNames.map((colName, colIndex) => (
                    <TableCell key={colIndex}>
                      {colName.toLowerCase() === "image" ? (
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/jpg,application/pdf"
                          onChange={(e) => handleFileChange(rowIndex, colIndex, e.target.files[0])}
                        />
                      ) : (
                        <TextField
                          value={tableData.values?.[rowIndex]?.[colIndex] || ''}
                          onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                        />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          

          <div>
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
            />
            <Button onClick={handleSubmit} variant="contained" color="primary" style={{ marginTop: '10px' }}>Submit</Button>
          </div>
         </Paper>
      )}
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        position: 'fixed',
        bottom: '100px',
        right: '40px',
      }}>
          <Avatar src={diagnosticianAvatar} alt="Diagnostician" sx={{ width: 100, height: 100 }} />
          <Button variant="contained" color="primary" style={{ marginTop: '10px' }} onClick={handleLogout}>Logout</Button>
      </div>

    </div>
  );
};

export default DiagnosticianPage;
