import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import remove from './Image/trash-bin.png';

function KeywordsTable() {
  const [keywords, setKeywords] = useState([
    { id: 1, name: 'Heart' },
    { id: 2, name: 'Liver' },
  ]);

  const handleRemoveKeyword = (index) => {
    const newKeywords = [...keywords];
    newKeywords.splice(index, 1);
    setKeywords(newKeywords);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Keyword ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {keywords.map((keyword, index) => (
          <TableRow key={index}>
            <TableCell>{keyword.id}</TableCell>
            <TableCell>{keyword.name}</TableCell>
            <TableCell>
              <Button onClick={() => handleRemoveKeyword(index)}>
                <img src={remove} alt="Delete" style={{ width: '40px', height: '40px' }} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default KeywordsTable;
