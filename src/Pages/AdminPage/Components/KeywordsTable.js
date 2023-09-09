import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import remove from './Image/trash-bin.png';

function KeywordsTable() {
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    fetch('/api/v0/search_by_tag')
      .then(res => res.json())
      .then(data => setKeywords(data.data));
  }, []);

  const handleRemoveKeyword = (index) => {
    const newKeywords = [...keywords];
    newKeywords.splice(index, 1);
    setKeywords(newKeywords);
  };

  return (
    <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
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
              <TableCell>{keyword.tag_name}</TableCell>
              <TableCell>
                <Button onClick={() => handleRemoveKeyword(index)}>
                  <img src={remove} alt="Delete" style={{ width: '40px', height: '40px' }} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default KeywordsTable;
