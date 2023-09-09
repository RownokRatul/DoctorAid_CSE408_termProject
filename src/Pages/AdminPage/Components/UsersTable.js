import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import remove from './Image/trash-bin.png'; // Import your delete icon

function UsersTable() {
  const [tests, setTests] = useState([]);


  useState(() => {
    fetch('api/v0/admin/list_all_users')
      .then(res => res.json())
      .then(data => setTests(data.data));
  }
  , []);

  const handleRemoveTest = (index) => {
    const newTests = [...tests];
    newTests.splice(index, 1);
    setTests(newTests);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Roll</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tests.map((test, index) => (
          <TableRow key={index}>
            <TableCell>{test.username}</TableCell>
            <TableCell>{test.user_role}</TableCell>
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

export default UsersTable;
