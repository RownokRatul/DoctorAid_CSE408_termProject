import { React, useEffect, useState } from 'react';
import { TextField, Button, Box, Typography, Grid, FormControlLabel, Checkbox, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DiseasePrescriptionCard = ({ diseasePrescriptionPairs, setDiseasePrescriptionPairs }) => {
  const [tags, setTags] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetch('api/v0/get_all_diseases')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const fetchedTags = data.data;
        setTags(fetchedTags);
      })
      .catch((err) => console.error('Failed to fetch tags:', err));
  }, []);

  const handleFieldChange = (index, field, value) => {
    const newPairs = [...diseasePrescriptionPairs];
    newPairs[index][field] = value;
  
    if (field === 'disease') {
      const selectedTag = tags.find(tag => tag.disease_name === value);
      newPairs[index]['diseaseId'] = selectedTag ? selectedTag.id : null;
    }
    console.log("newPairs:", newPairs);
  
    setDiseasePrescriptionPairs(newPairs);
  };
  

  const addDiseasePrescriptionPair = () => {
    setDiseasePrescriptionPairs([
      ...diseasePrescriptionPairs,
      { disease: '', diseaseId: null, file: null, date: '' }
    ]);
  };
  

  const filteredTags = searchText
    ? tags.filter((tag) => tag.disease_name.toLowerCase().includes(searchText.toLowerCase()))
    : [];

  return (
    <Box padding={2} bgcolor="azure" borderRadius={2} marginBottom={3}>
      <Typography variant="h6" color="text.primary" gutterBottom>
        Select Disease and Upload Prescription
      </Typography>

      {diseasePrescriptionPairs.map((pair, index) => (
        <Box marginBottom={3} key={index}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                label="Search Disease"
                value={pair.disease}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  handleFieldChange(index, 'disease', e.target.value);
                }}
                fullWidth
              />
              {pair.disease && (
                <Box overflow="auto" maxHeight={200} mt={2}>
                  {filteredTags.map((tag, i) => (
                    <FormControlLabel
                      key={i}
                      control={
                        <Checkbox
                            checked={pair.disease === tag.disease_name}
                            onChange={(e) => {
                              if (e.target.checked) {
                                handleFieldChange(index, 'disease', tag.disease_name);
                              }
                            }}
                            name={tag.disease_name}
                        />

                      }
                      label={tag.disease_name}
                    />
                  ))}
                </Box>
              )}
            </Grid>
            <Grid item xs={4}>
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.pdf"
                onChange={(e) => handleFieldChange(index, 'file', e.target.files[0])}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Date"
                type="date"
                value={pair.date}
                onChange={(e) => handleFieldChange(index, 'date', e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => handleFieldChange(index, 'isFinalized', true)}
              >
                Done
              </Button>
            </Grid>
          </Grid>
        </Box>
      ))}

      <Button variant="outlined" color="primary" onClick={addDiseasePrescriptionPair}>
        Add More
      </Button>
    </Box>
  );
};

export default DiseasePrescriptionCard;
