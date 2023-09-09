import React, { useState ,useEffect} from 'react';
import { Box, Dialog, DialogContent, DialogTitle, Typography, Button } from '@mui/material';
import SearchCriteria from './Components/SearchCriteria/SearchCriteria';
import SearchResult from './Components/SearchResults/SearchResult';
import MiddleFlexBox from './Components/BodyPicker/MiddleFlexBox';
import { useContext } from 'react';
import { PatientContext } from '../../PatientContext';

import { usePatientIDValidation } from '../../PatientIDValidation';
const SearchTab = () => {

  usePatientIDValidation();
  const [results, setResults] = useState([]); // To store the search results
  const [selectedResult, setSelectedResult] = useState(null);
  const { patientID } = useContext(PatientContext);
  const [filteredResults, setFilteredResults] = useState([]);

  const [tags, setTags] = useState([]); // To store the fetched tags
  const [bodyPart,setBodyPart]=useState(null);

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
    }, []);
    

    // useEffect(() => {
    //   console.log("search updated results:", results);
    // }, [results]);
  
  


  const handleSearch = (data) => {
    console.log("Data:", data);
  
    // Extracting the relevant fields from the criteria
    const { tests, prescriptions, medical_history } = data;
  
    // Transforming the data into the desired results format
    const transformedResults = [];
  
    tests.forEach((test) => {
      transformedResults.push({
        type: 'Test',
        name: test.test_name,
        date: test.prescription_date,
        prescribedDate: test.prescribed_date,
        tags: [], // Add tags if available
      });
    });
  
    prescriptions.forEach((prescription) => {
      transformedResults.push({
        type: 'Prescription',
        date: prescription.date,
        tags: [], // Add tags if available
      });
    });
  
    medical_history.forEach((history) => {
      transformedResults.push({
        type: 'Medical History',
        description: history,
        tags: [], // Add tags if available
      });
    });

    setResults(transformedResults);
    console.log("Newresults:",results);
  };
  

  const handleSeeMoreTest = (result) => {

    console.log("result:",result)
    setSelectedResult(result);
  };

  const handleSeeMorePrescription = (result) => {
    setSelectedResult(result);
  };

  const handleSeeMoreHistory = (result) => {
    setSelectedResult(result);

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

    </Box>
  );
};

export default SearchTab;
