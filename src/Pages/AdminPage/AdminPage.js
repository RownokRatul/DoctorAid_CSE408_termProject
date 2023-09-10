import React, { useState } from 'react';
import { Container, Box, Button, Card, TextField, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, Select, MenuItem, InputLabel, FormControl, Paper, TableContainer } from '@mui/material';
import TestsTable from './Components/TestTable';
import DiseasesTable from './Components/DiseaseTable';
import KeywordsTable from './Components/KeywordsTable';
import UsersTable from './Components/UsersTable';

function AdminPage() {
  const [selectedTable, setSelectedTable] = useState('tests');
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setSuccessDialogOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [users, setUser] = useState([]);
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
    setFormData({});
    setDialogOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddRow = () => {
    const apiUrl = "api/v0/admin/create_user";
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Success") {
          setSuccessDialogOpen(true);
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
            case 'users':
              setUser([...users, formData]);
              break;
            default:
              break;
          }
          closeDialog();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const renderDialogContent = () => {
    return (
      <>
        <FormControl fullWidth margin="normal">
          <InputLabel>Role</InputLabel>
          <Select name="user_role" onChange={handleInputChange}>
            <MenuItem value="doctor">Doctor</MenuItem>
            <MenuItem value="receptionist">Receptionist</MenuItem>
            <MenuItem value="intern">Intern</MenuItem>
            <MenuItem value="diagnostician">Diagnostician</MenuItem>
          </Select>
        </FormControl>
        {formData.user_role === "doctor" && (
          <>
            <TextField name="username" label="Username" fullWidth onChange={handleInputChange} />
            <TextField name="hash_password" label="Password" type="password" fullWidth onChange={handleInputChange} />
            <TextField name="name" label="Name" fullWidth onChange={handleInputChange} />
            <TextField name="specialization" label="Specialization" fullWidth onChange={handleInputChange} />
            <TextField name="degree" label="Degree" fullWidth onChange={handleInputChange} />
            <TextField name="phone" label="Phone" fullWidth onChange={handleInputChange} />
            <TextField name="email" label="Email" fullWidth onChange={handleInputChange} />
          </>
        )}
        {formData.user_role === "receptionist" && (
          <>
            <TextField name="username" label="Username" fullWidth onChange={handleInputChange} />
            <TextField name="hash_password" label="Password" type="password" fullWidth onChange={handleInputChange} />
            <TextField name="name" label="Name" fullWidth onChange={handleInputChange} />
            <TextField name="phone" label="Phone" fullWidth onChange={handleInputChange} />
          </>
        )}
        {formData.user_role === "intern" && (
          <>
            <TextField name="username" label="Username" fullWidth onChange={handleInputChange} />
            <TextField name="hash_password" label="Password" type="password" fullWidth onChange={handleInputChange} />
            <TextField name="name" label="Name" fullWidth onChange={handleInputChange} />
            <TextField name="phone" label="Phone" fullWidth onChange={handleInputChange} />
            <TextField name="email" label="Email" fullWidth onChange={handleInputChange} />
          </>
        )}
        {formData.user_role === "diagnostician" && (
          <>
            <TextField name="username" label="Username" fullWidth onChange={handleInputChange} />
            <TextField name="hash_password" label="Password" type="password" fullWidth onChange={handleInputChange} />
            <TextField name="name" label="Name" fullWidth onChange={handleInputChange} />
            <TextField name="phone" label="Phone" fullWidth onChange={handleInputChange} />
            <TextField name="email" label="Email" fullWidth onChange={handleInputChange} />
          </>
        )}
      </>
    );
  };

  return (
    <Container>
      <Box display="flex">
        <Box flex="20%" p={3}>
          <Card>
            <List>
              <ListItem button onClick={() => handleTableSelection('tests')}>Tests</ListItem>
              <ListItem button onClick={() => handleTableSelection('diseases')}>Diseases</ListItem>
              <ListItem button onClick={() => handleTableSelection('keywords')}>Keywords</ListItem>
              <ListItem button onClick={() => handleTableSelection('users')}>Users</ListItem>
            </List>
          </Card>
        </Box>
        <Box flex="80%" p={3}>
          <TableContainer component={Paper} style={{maxHeight: 440, overflow: 'auto'}}>
            {selectedTable === 'tests' && <TestsTable tests={tests} />}
            {selectedTable === 'diseases' && <DiseasesTable diseases={diseases} />}
            {selectedTable === 'keywords' && <KeywordsTable keywords={keywords} />}
            {selectedTable === 'users' && <UsersTable users={users} />}
          </TableContainer>
          <Button variant="contained" color="primary" onClick={openDialog}>Add Row</Button>
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
      <Dialog open={isSuccessDialogOpen} onClose={() => setSuccessDialogOpen(false)}>
        <DialogTitle>Data Added Successfully</DialogTitle>
        <DialogActions>
          <Button onClick={() => setSuccessDialogOpen(false)} color="primary">OK</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AdminPage;
