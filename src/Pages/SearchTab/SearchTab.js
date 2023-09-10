import React, { useState ,useEffect} from 'react';
import { Box, Dialog, DialogContent, DialogTitle, Typography, Button ,Table, TableHead, TableRow, TableCell, TableBody, Paper,} from '@mui/material';
import SearchCriteria from './Components/SearchCriteria/SearchCriteria';
import SearchResult from './Components/SearchResults/SearchResult';
import MiddleFlexBox from './Components/BodyPicker/MiddleFlexBox';
import { useContext } from 'react';
import { PatientContext } from '../../PatientContext';
import { Document, Page } from 'react-pdf';  // for PDF rendering
import { pdfjs } from 'react-pdf';




import { usePatientIDValidation } from '../../PatientIDValidation';
import { set } from 'lodash';
const SearchTab = () => {

  usePatientIDValidation();
  
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  const [results, setResults] = useState([]); // To store the search results
  const [selectedResult, setSelectedResult] = useState(null);
  const { patientID } = useContext(PatientContext);
  const [filteredResults, setFilteredResults] = useState([]);

  const [tags, setTags] = useState([]); // To store the fetched tags
  const [bodyPart,setBodyPart]=useState(null);

  const [allDiseases, setAllDiseases] = useState([]);
  const [allTests, setAllTests] = useState([]);
  const [allDrugs, setAllDrugs] = useState([]);

    useEffect(() => {
      // Fetching the tags when the component mounts
      fetch('api/v0/search_by_tag')
        .then((res) => res.json())
        .then((data) => {
          const fetchedTags = data.data;
          console.log('Fetched tags:', fetchedTags); // Logging the fetched tags
          setTags(fetchedTags); // Updating the state
        })
        .catch((err) => console.error('Failed to fetch tags:', err));

        fetch('api/v0/get_all_diseases')
      .then(res => res.json())
      .then(data => setAllDiseases(data.data))
      .catch(err => console.error('Failed to fetch diseases:', err));

    fetch('api/v0/get_all_tests')
      .then(res => res.json())
      .then(data => setAllTests(data.data))
      .catch(err => console.error('Failed to fetch tests:', err));

    fetch('api/v0/get_all_brand_drugs')
      .then(res => res.json())
      .then(data => setAllDrugs(data.data))
      .catch(err => console.error('Failed to fetch Drugs:', err));

    }, []);
    

    // useEffect(() => {
    //   console.log("search updated results:", results);
    // }, [results]);
  
  


  const handleSearch = (data) => {
    console.log("Data-------------:", data);
  
    // Extracting the relevant fields from the criteria
    const { tests, prescriptions, medical_history } = data;
  
    // Transforming the data into the desired results format
    const transformedResults = [];
  
    tests.forEach((test) => {
      transformedResults.push({
        type: 'Test',
        test_id: test.test_id,
        name: test.test_name,
        date: test.prescription_date,
        prescribedDate: test.prescribed_date,
        prescription_id: test.prescription_id,
        tags: [], // Add tags if available
      });
    });
  
    prescriptions.forEach((prescription) => {

      console.log("prescription:",prescription);
      transformedResults.push({
        type: 'Prescription',
        id: prescription.id,
        date: prescription.date,
        tags: [], // Add tags if available
      });
    });
  
    medical_history.forEach((history) => {
      transformedResults.push({
        type: 'Medical History',
        description: history.name,
        url: history.url,
        tags: [], // Add tags if available
      });
    });

    setResults(transformedResults);
    console.log("Newresults:",results);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setDialogOpen2(false);
  };

  const [selectedTest, setSelectedTest] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

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
  

  const handleSeeMoreTest = (result) => {

    console.log("result in search:",result);
    setSelectedResult(result);
    handleClickDetail(result.test_id,result.prescription_id);



  };
  
  const [prescriptionDetail, setPrescriptionDetail] = useState(null);
  
  const [dialogOpen2, setDialogOpen2] = useState(false);

  const handleSeeMorePrescription = async (result) => {
    console.log("result in search:",result);
    setSelectedResult(result);


    try {
      const response = await fetch('api/v0/get_prescription_by_id/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prescription_id: result.id }),
      });
      const result_2 = await response.json();
      setPrescriptionDetail(result_2.data);
      setDialogOpen2(true);
    } catch (error) {
      console.error('Failed to fetch prescribed drugs:', error);
    }




















  };

  const [selectedFileType, setSelectedFileType] = useState(null);


  
  const handleSeeMoreHistory = (result) => {
    setSelectedResult(result);
  
    console.log("Medical History:", result.url);
  
    window.open(result.url, '_blank');
  };
  




  const handleClose = () => {
    setSelectedResult(null);
  };

  // SearchTabs Component
    const handlePartSelected = (part) => {
      const selectedTag = tags.find(tag => tag.tag_name.toLowerCase() === part.toLowerCase());
      if (selectedTag) {
        console.log('Selected tag ID:', selectedTag.id);
      } else {
        console.log('Tag not found');
      }

      const requestBody = {
        patient_id: patientID,
        tags: [selectedTag.id],
      };
      console.log("body part:",requestBody);
    
      fetch('api/v0/search_by_tag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("body part:",data);
          handleSearch(data.data);
        }
        )
        .catch((err) => {
          console.error('Failed to search by tag:', err);
          // Handle the error here if necessary
        });  
    };

  return (
    <Box display="flex" width="100%">
      
      <SearchCriteria onSearch={handleSearch} tags={tags} />

      {/* Middle Flexbox */}
    <Box width="40%" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        
      <MiddleFlexBox onPartSelected={handlePartSelected} />
      
    </Box>

      {/* Right Flexbox */}
      {/* Right Flexbox */}
      <Box width="50%" overflow="auto" style={{ marginTop: '20px', padding: '15px' }}>
        <h1>Search Results</h1>
        {results.length > 0 ? (
          results.map((result, index) => {
            switch (result.type) {

              case 'Test':
                return (
                  <Box key={index} mb={2} p={2} boxShadow={3} borderRadius="borderRadius" bgcolor="azure">
                    <Typography variant="h6">{result.type}</Typography>
                    <Typography variant="body1">Test Name: {result.name}</Typography>
                    <Typography variant="body1">Date: {new Date(result.date).toISOString().split('T')[0]}</Typography>
                    <Typography variant="body1">Prescribed Date: {new Date(result.prescribedDate).toISOString().split('T')[0]}</Typography>
                    <Button color="primary" onClick={() => handleSeeMoreTest(result)}>See More</Button>
                  </Box>
                );
              case 'Prescription':
                return (
                  <Box key={index} mb={2} p={2} boxShadow={3} borderRadius="borderRadius" bgcolor="azure">
                    <Typography variant="h6">{result.type}</Typography>
                    <Typography variant="body1">Date: {new Date(result.date).toISOString().split('T')[0]}</Typography>
                    <Button color="primary" onClick={() => handleSeeMorePrescription(result)}>See More</Button>
                  </Box>
                );
              case 'Medical History':
                return (
                  <Box key={index} mb={2} p={2} boxShadow={3} borderRadius="borderRadius" bgcolor="azure">
                    <Typography variant="h6">{result.type}</Typography>
                    <Typography variant="body1">Description: {result.description}</Typography>
                    <Button color="primary" onClick={() => handleSeeMoreHistory(result)}>See More</Button>

                  </Box>
                  
                );
              default:
                return null;
            }
          }

          )
        ) : (
          <Typography variant="body1" color="textSecondary">No results found</Typography>
        )}
      </Box>

      


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

          <Dialog open={dialogOpen2} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>Prescription Detail</DialogTitle>
        <DialogContent>
          {prescriptionDetail && (
            <>
              <Box style={{ backgroundColor: '#f2f2f2', padding: '1rem' }}>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>General Information</Typography>
                <Typography>ID: {prescriptionDetail.id}</Typography>
                <Typography>Doctor: {prescriptionDetail.doctor_username}</Typography>
                <Typography>Date: {new Date(prescriptionDetail.date).toLocaleDateString()}</Typography>
                <Typography>Findings: {prescriptionDetail.findings}</Typography>
              </Box>
              <Box mt={2} style={{ backgroundColor: '#e6e6e6', padding: '1rem' }}>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>Queued Tests</Typography>
                {prescriptionDetail.queued_tests.map((test, index) => (
                  <Typography key={index}>Diagnostic Tests: {(allTests.find(test2 => test2.id === test.test_id)).test_name}</Typography>
                ))}
              </Box>
              <Box mt={2} style={{ backgroundColor: '#d9d9d9', padding: '1rem' }}>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>Prescribed Drugs</Typography>
                {prescriptionDetail.prescribed_drugs.map((drug, index) => (
                  <Box key={index}>
                    <Typography>Prescribed Drug : {(allDrugs.find(drug2 => drug2.id === drug.drug_id)).name}</Typography>
                    <Typography>Dosage: {drug.prescribed_dosage}</Typography>
                  </Box>
                ))}
              </Box>
              <Box mt={2} style={{ backgroundColor: '#cccccc', padding: '1rem' }}>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>Disease List</Typography>
                {prescriptionDetail.prescription_diseases.map((disease, index) => (
                  <Typography key={index}>Diagnosis : {(allDiseases.find(dis2 => dis2.id === disease.disease_id)).disease_name}</Typography>
                ))}
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>

          


    </Box>
    

  );
};

export default SearchTab;
