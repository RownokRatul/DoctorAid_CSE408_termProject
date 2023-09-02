import React from 'react';
import { Button } from '@mui/material';

const ItemList = ({ list, handleEdit, handleDelete }) => (
  <div>
    {list.map((item) => (
      <div key={item.id}>
        {item.name}{'...'}
        <Button onClick={() => handleEdit(item)}>Edit</Button>
        <Button onClick={() => handleDelete(item)}>Delete</Button>
      </div>
    ))}
  </div>
);

export default ItemList;
