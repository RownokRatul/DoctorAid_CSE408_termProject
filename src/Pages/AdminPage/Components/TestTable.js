import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import remove from './Image/trash-bin.png'; // Import your delete icon

function TestsTable() {
  const [tests, setTests] = useState([
    // Example data; you would usually fetch this from your server
    { id: 1, name: 'Blood Test', price: '$50' },
    { id: 2, name: 'X-Ray', price: '$75' },
  ]);

  const handleRemoveTest = (index) => {
    const newTests = [...tests];
    newTests.splice(index, 1);
    setTests(newTests);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Test ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tests.map((test, index) => (
          <TableRow key={index}>
            <TableCell>{test.id}</TableCell>
            <TableCell>{test.name}</TableCell>
            <TableCell>{test.price}</TableCell>
            <TableCell>
              <Button onClick={() => handleRemoveTest(index)}>
                <img src={remove} alt="Delete" style={{ width: '40px', height: '40px' }} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TestsTable;
