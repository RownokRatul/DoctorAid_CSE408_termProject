import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import DiseasesDialog from './DiseasesDialog';
import remove from './Image/trash-bin.png';

function DiseasesTable() {
  const [diseases, setDiseases] = useState([
    { id: 1, name: 'Diabetes' },
    { id: 2, name: 'Hypertension' },
  ]);

  const handleRemoveDisease = (index) => {
    const newDiseases = [...diseases];
    newDiseases.splice(index, 1);
    setDiseases(newDiseases);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Disease ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {diseases.map((disease, index) => (
          <TableRow key={index}>
            <TableCell>{disease.id}</TableCell>
            <TableCell>{disease.name}</TableCell>
            <TableCell>
              <Button onClick={() => handleRemoveDisease(index)}>
                <img src={remove} alt="Delete" style={{ width: '40px', height: '40px' }} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default DiseasesTable;
