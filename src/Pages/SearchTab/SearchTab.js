import React, { useState } from 'react';
import { Box, Dialog, DialogContent, DialogTitle, Typography, Button } from '@mui/material';
import SearchCriteria from './Components/SearchCriteria/SearchCriteria';
import SearchResult from './Components/SearchResults/SearchResult';
import MiddleFlexBox from './Components/BodyPicker/MiddleFlexBox';
import { useContext } from 'react';
import { PatientContext } from '../../PatientContext';
const SearchTab = () => {
  const [results, setResults] = useState([]); // To store the search results
  const [selectedResult, setSelectedResult] = useState(null);

  const handleSearch = (criteria) => {
    // Implement the search logic based on the criteria
    // Here you can call an API or search through local data to get the results
    // For now, I will mock the data
    setResults([
      {
        type: 'Prescription',
        date: '01/01/2022',
        tags: ['headache', 'stroke'],
      },
      // Add more results as needed
    ]);
  };

  const handleSeeMore = (result) => {
    setSelectedResult(result);
  };

  const handleClose = () => {
    setSelectedResult(null);
  };
  const { patientID } = useContext(PatientContext);
  // SearchTabs Component
    const handlePartSelected = (part) => {
      
      // Do something with the selected part, such as filtering search results...
      console.log(part);
      console.log(patientID);
    };

  return (
    <Box display="flex" width="100%">
      
      <SearchCriteria onSearch={handleSearch} />

      {/* Middle Flexbox */}
      <Box width="40%" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <MiddleFlexBox onPartSelected={handlePartSelected} />
      
      </Box>

      {/* Right Flexbox */}
      <Box width="50%" overflow="auto" style={{ marginTop: '20px' }}>
        {results.map((result, index) => (
          <SearchResult key={index} result={result} onSeeMore={handleSeeMore} />
        ))}
      </Box>

      <Dialog onClose={handleClose} open={selectedResult !== null}>
        <DialogTitle>{selectedResult?.type}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Date: {selectedResult?.date}</Typography>
          <Typography variant="body1">
            Tags: <strong>{selectedResult?.tags.join(', ')}</strong>
          </Typography>
          <Button onClick={handleClose}>Close</Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default SearchTab;
