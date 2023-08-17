import React, { useState } from 'react';
import { Box, Typography, TextField, Checkbox, FormControlLabel, Chip, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DiseasesCard = ({ selectedDiseases, handleDiseaseSelection }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const predefinedDiseases = [
    'Diabetes',
    'Hypertension',
    'Asthma',
    'Arthritis',
    'Migraine',
    'Epilepsy',
    'Heart Disease',
    'Chronic Bronchitis',
    'Kidney Disease',
    'Liver Disease',
    'Cancer',
    'Tuberculosis',
    'HIV/AIDS',
    'Dengue Fever',
    'Typhoid',
    'Hepatitis',
    'Polio',
    'Rabies',
    'Malaria',
    'Cholera'
  ];

  const filteredDiseases = searchTerm
    ? predefinedDiseases.filter((disease) =>
        disease.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleCheckboxChange = (e, disease) => {
    handleDiseaseSelection(disease, e.target.checked);
  };

  const handleRemoveDisease = (disease) => {
    handleDiseaseSelection(disease, false);
  };

  return (
    <Box padding={2} bgcolor="azure" borderRadius={2} marginTop={0} paddingTop={5}>
      <Typography variant="h6" color="text.primary" gutterBottom>
        Select Diseases
      </Typography>
      <TextField
        label="Search Diseases"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {searchTerm && (
        <Box overflow="auto" maxHeight={200} mt={2}>
          {filteredDiseases.map((disease, index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={selectedDiseases.includes(disease)}
                  onChange={(e) => handleCheckboxChange(e, disease)}
                  name={disease}
                />
              }
              label={disease}
            />
          ))}
        </Box>
      )}
      <Box mt={2}>
        {selectedDiseases.map((disease, index) => (
          <Chip
            key={index}
            label={disease}
            onDelete={() => handleRemoveDisease(disease)}
            deleteIcon={<CloseIcon />}
            style={{ marginRight: '5px', marginBottom: '5px' }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default DiseasesCard;
