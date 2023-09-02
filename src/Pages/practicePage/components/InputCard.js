import React from 'react';
import { Card, CardContent, TextField, Button } from '@mui/material';

const InputCard = ({ text, setText, handleAdd }) => (
  <Card>
    <CardContent>
      <TextField
        label="Add Item"
        variant="filled"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleAdd}>
        Add
      </Button>
    </CardContent>
  </Card>
);

export default InputCard;
