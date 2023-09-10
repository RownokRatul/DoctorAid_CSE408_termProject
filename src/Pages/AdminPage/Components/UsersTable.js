import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import remove from './Image/trash-bin.png'; // Import your delete icon

function UsersTable() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    fetch('api/v0/admin/list_all_users')
      .then(res => res.json())
      .then(data => setTests(data.data));
  }, []);

  const handleRemoveTest = (index) => {
    const testToRemove = tests[index];
    
    // Perform API call to remove user
    fetch('api/v0/admin/delete_user', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_role: testToRemove.user_role,
        username: testToRemove.username
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // Refetch the updated user list
        fetch('api/v0/admin/list_all_users')
          .then(res => res.json())
          .then(data => setTests(data.data));
      } else {
        // Handle error
        console.error("Error deleting user:", data.message);
      }
    });
    
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
