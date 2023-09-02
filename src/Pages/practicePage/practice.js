import React, { useState } from 'react';
import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const PracticePage=() => {
  const [text, setText] = useState(null); // State for the text input
  const [list, setList] = useState([]); // State for the list of items
  const [editItem, setEditItem] = useState(''); // State for the item being edited
  const [dialogopen,setDialogOpen]=useState(false);

  const handleAdd = async () => {
    // Mock API call to localhost:/api/add_demo_data
    // Replace this with your actual API logic
    // const response = await fetch('http://localhost:/api/add_demo_data', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ text }),
    // });

    // Mocked response
    const newItem = { id: list.length + 1, text, temp:list.length+2 };
    setList([...list, newItem]);
    setText('');
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setDialogOpen(true);
  };

  const handleDelete = (item) => {
    setList(list.filter((item2) => item2.id !== item.id));
  };

  const handleUpdate = () => {
    const updatedList = list.map((item) => (item.id === editItem.id ? editItem : item));
    setList(updatedList);
    setDialogOpen(false);
  };

  return (
    <div>
      {/* Input Card */}
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

      {/* List of Items */}
      <div>
        {list.map((item) => (
          <div key={item.id}>
            {item.text}{'...'}
            <Button onClick={() => handleEdit(item)}>Edit</Button>
            <Button onClick={() => handleDelete(item)}>Delete</Button>
          </div>
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={dialogopen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <TextField
            label="Edit Item"
            variant="outlined"
            value={editItem?.text || ''}
            onChange={(e) => setEditItem({ ...editItem, text: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default PracticePage;
