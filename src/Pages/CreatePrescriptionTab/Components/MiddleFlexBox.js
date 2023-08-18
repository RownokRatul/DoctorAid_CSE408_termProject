import React, { useState } from 'react';
import { Card, TextField, List, ListItem, Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import remove from './Image/trash-bin.png'

function MiddleFlexbox({ selectedMedicines, setSelectedMedicines }) {
  const [searchText, setSearchText] = useState('');
//   const [selectedMedicines, setSelectedMedicines] = useState([]);

  const medicinesMockData = [
    { name: 'monitine', dosage: '50mg' },
    { name: 'monus', dosage: '25mg' },
    {name: 'aspirin', dosage: '100mg' },
    {name: 'paracetamol', dosage: '500mg' },
    {name: 'ibuprofen', dosage: '200mg' },
    {name: 'amoxicillin', dosage: '500mg' },
    {name: 'azithromycin', dosage: '250mg' },

    

    // Add more mock medicines here
  ];

  const filteredMedicines = medicinesMockData.filter(medicine =>
    medicine.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelectMedicine = (medicine) => {
    setSelectedMedicines([...selectedMedicines, { name: medicine.name, strength: medicine.dosage, frequency: 'TBD', duration: 'TBD', remarks: 'TBD' }]);
    setSearchText('');
  };

  const handleRemoveMedicine = (index) => {
    const newSelectedMedicines = [...selectedMedicines];
    newSelectedMedicines.splice(index, 1);
    setSelectedMedicines(newSelectedMedicines);
  };

  return (
    <div className="middle-flexbox" style={{ width: '95%', backgroundColor: '#f0f0f0' }}>
      <h3 style={{ textAlign: 'center', paddingTop:'15px' }}>Add Medicines</h3>
      <Card style={{ padding: '10px', height: '100%', backgroundColor: 'azure' }}>
        <TextField
          fullWidth
          label="Search Medicine"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <List>
            {searchText && filteredMedicines.map((medicine, index) => (
              <ListItem key={index} button onClick={() => handleSelectMedicine(medicine)}>
                {medicine.name} - {medicine.dosage}
              </ListItem>
            ))}
          </List>
        <div style={{ maxHeight: '400px', overflow: 'auto' }}> 
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Strength</TableCell>
                <TableCell>Frequency</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Remarks</TableCell>
                <TableCell>Action</TableCell> {/* Add Header for Action */}
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedMedicines.map((medicine, index) => (
                <TableRow key={index}>
                  <TableCell>{medicine.name}</TableCell>
                  <TableCell>{medicine.strength}</TableCell>
                  <TableCell>{medicine.frequency}</TableCell>
                  <TableCell>{medicine.duration}</TableCell>
                  <TableCell>{medicine.remarks}</TableCell>
                  <TableCell>
                    {/* <Button variant="contained" color="secondary" onClick={() => handleRemoveMedicine(index)}>Remove</Button> */}

                      <Button onClick={() => handleRemoveMedicine(index)} style={{ marginRight: '10px' }}>
                          <img src={remove} alt="Delete" style={{ width: '40px', height: '40px' }} />
                      </Button>


                  </TableCell> {/* Add Delete Button */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}

export default MiddleFlexbox;
