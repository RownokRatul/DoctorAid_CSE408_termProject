import React, { useState,useContext } from 'react';
import { Card, CardContent, TextField, Button, Box, FormControlLabel, Checkbox, Chip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PatientContext } from '../../../../../PatientContext'

const SearchKeyCard = ({ criteria, handleCriteriaChange, handleSearch, tags }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const { patientID } = useContext(PatientContext);

  const filteredTags = searchText ? tags.filter((tag) => tag.tag_name.toLowerCase().includes(searchText.toLowerCase())): [];

  console.log('Before Searching Finally: ', criteria );

  const handleCheckboxChange = (e, tag) => {
    if (e.target.checked) {
      setSelectedTags([...selectedTags, tag]);
      handleCriteriaChange('tags', [...criteria.tags, tag.tag_name]);
    } else {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
      handleCriteriaChange('tags', criteria.tags.filter((t) => t !== tag.tag_name));
    }
  };

  const handleRemoveTag = (tag) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
    handleCriteriaChange('tags', criteria.tags.filter((t) => t !== tag.tag_name));
  };

  const handleSearchClick = () => {
    console.log(selectedTags);
  
    const tagIds = selectedTags.map((tag) => tag.id); // Assuming the tag objects have an 'id' property
    const requestBody = {
      patient_id: patientID,
      tags: tagIds,
    };
  
    fetch('api/v0/search_by_tag', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((data) => {

        console.log("body part-------------:",data);
        // Process the response data here if necessary
        //handleSearch({ ...criteria, searchKey: selectedTags.map((tag) => tag.tag_name).join(', ') });

        // console.log("body part from backend:",data);  
        
        // Filtering based on criteria
        let filteredData = data.data;
        // console.log("Before Filtered data:",filteredData);
        // filteredData.tests = filteredData.tests.map(test => ({
        //   ...test, date: test.prescription_date,
        // }));
        console.log("Before Filtered data:",filteredData);

        if(!criteria.domains.medicalHistory) {
          filteredData.medical_history = [];
        }
        if(!criteria.domains.prescription) {
          filteredData.prescriptions = [];
        }
        if(!criteria.domains.tests) {
          filteredData.tests = [];
        }

        const filterByDate = (items, dateField) => {
          return items.filter(item => {
            let itemDate = new Date(item[dateField]);
            let fromDate = criteria.fromDate ? new Date(criteria.fromDate) : null;
            let toDate = criteria.toDate ? new Date(criteria.toDate) : null;

            if(fromDate) {
              fromDate.setDate(fromDate.getDate() + 1);
            }
            if(toDate) {
              toDate.setDate(toDate.getDate() + 1);
            }
            // fromDate.setDate(fromDate.getDate() + 1);
            // toDate.setDate(toDate.getDate() + 1);
            
            // let today = new Date();
            // if (new Date(fromDate).toISOString().split('T')[0] === today.toISOString().split('T')[0]) {
            //   console.log('From date is today');
            //   fromDate = today;
            // }
            // console.log("To date:",new Date(toDate).toISOString().split('T')[0]);
            // console.log("From date:",new Date(fromDate).toISOString().split('T')[0]);
            // console.log("today", today.toISOString().split('T')[0]);

            // if (new Date(toDate).toISOString().split('T')[0] === today.toISOString().split('T')[0]) {
            //   console.log('To date is today');
            //   toDate = today;
            // }
  
            if (fromDate && toDate) {
              return itemDate >= fromDate && itemDate <= toDate;
            } else if (fromDate) {
              return itemDate >= fromDate;
            } else if (toDate) {
              return itemDate <= toDate;
            }
            return true; // If both fromDate and toDate are null
          });
        };

        filteredData.medical_history = filterByDate(filteredData.medical_history, 'date');
        filteredData.prescriptions = filterByDate(filteredData.prescriptions, 'date');
        filteredData.tests = filterByDate(filteredData.tests, 'prescription_date');

        console.log("After Filtered data:",filteredData);
        handleSearch(filteredData); 
        console.log("Real tag:",requestBody);

      })
      .catch((err) => {
        console.error('Failed to search by tag:', err);
        // Handle the error here if necessary
      });
  };
  

  return (
    <Card style={{backgroundColor:"azure"}}> 
      <CardContent>
        <h3>Search Key</h3>
        <TextField
          label="Search Key"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {searchText && (
          <Box overflow="auto" maxHeight={200} mt={2}>
            {filteredTags.map((tag, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={selectedTags.includes(tag)}
                    onChange={(e) => handleCheckboxChange(e, tag)}
                    name={tag.tag_name}
                  />
                }
                label={tag.tag_name}
              />
            ))}
          </Box>
        )}
        <Box mt={2}>
          {selectedTags.map((tag, index) => (
            <Chip
              key={index}
              label={tag.tag_name}
              onDelete={() => handleRemoveTag(tag)}
              deleteIcon={<CloseIcon />}
              style={{ marginRight: '5px', marginBottom: '5px' }}
            />
          ))}
        </Box>
        <Button onClick={handleSearchClick}>Search</Button>
      </CardContent>
    </Card>
  );
};

export default SearchKeyCard;
