import React, { useState } from 'react';
import { Container, Box, Button, Card, TextField, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem } from '@mui/material';
import TestsTable from './Components/TestTable';
import DiseasesTable from './Components/DiseaseTable';
import KeywordsTable from './Components/KeywordsTable';

function AdminPage() {
  const [selectedTable, setSelectedTable] = useState('tests');
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [tests, setTests] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [keywords, setKeywords] = useState([]);

  const handleTableSelection = (tableName) => {
    setSelectedTable(tableName);
  };

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddRow = () => {
    switch (selectedTable) {
      case 'tests':
        setTests([...tests, formData]);
        break;
      case 'diseases':
        setDiseases([...diseases, formData]);
        break;
      case 'keywords':
        setKeywords([...keywords, formData]);
        break;
      default:
        break;
    }
    closeDialog();
  };

  const renderDialogContent = () => {
    switch (selectedTable) {
      case 'tests':
        return (
          <>
            <TextField name="testId" label="Test ID" fullWidth onChange={handleInputChange} />
            <TextField name="name" label="Name" fullWidth onChange={handleInputChange} />
            <TextField name="price" label="Price" fullWidth onChange={handleInputChange} />
          </>
        );
      case 'diseases':
        return <TextField name="diseaseName" label="Disease Name" fullWidth onChange={handleInputChange} />;
      case 'keywords':
        return <TextField name="keywordName" label="Keyword Name" fullWidth onChange={handleInputChange} />;
      default:
        return null;
    }
  };

  return (
    <Container>
      <Box display="flex">
        <Box flex="20%" paddingTop={'5%'} paddingRight={'5%'}>
          <Card>
            <List>
              <ListItem button onClick={() => handleTableSelection('tests')}>Tests</ListItem>
              <ListItem button onClick={() => handleTableSelection('diseases')}>Diseases</ListItem>
              <ListItem button onClick={() => handleTableSelection('keywords')}>Keywords</ListItem>
            </List>
          </Card>
        </Box>
        <Box flex="80%">
          {selectedTable === 'tests' && <TestsTable tests={tests} />}
          {selectedTable === 'diseases' && <DiseasesTable diseases={diseases} />}
          {selectedTable === 'keywords' && <KeywordsTable keywords={keywords} />}
          <Button onClick={openDialog}>Add Row</Button>
        </Box>
      </Box>
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>Add New Entry</DialogTitle>
        <DialogContent>{renderDialogContent()}</DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddRow} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AdminPage;
