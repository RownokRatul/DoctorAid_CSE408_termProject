import React, { useState,useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import InputCard from './components/InputCard';
import ItemList from './components/ItemList';
import { json } from 'react-router-dom';

const PracticePage2=() => {
  const [text, setText] = useState(null);
  const [list, setList] = useState([]);
  const [editItem, setEditItem] = useState('');
  const [dialogopen,setDialogOpen]=useState(false);
  const [occupation,setOccupation]=useState('');

  useEffect(() => {
    console.log('List of items updated:', list);
  }, [list]);

  const handleAdd = async () => {

      // Mock API call to localhost:/api/add_demo_data
    // Replace this with your actual API logic
    // const response = await fetch('http://localhost:/api/add_demo_data', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ text }),
    // });
    console.log("text:",text);
    const newItem = { id: list.length + 1, name:text, occupation:[] };
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
    console.log("id:",editItem.id,"name:",editItem.name,"occupation:",editItem.occupation);
    // make a json of what was print in console.log

    const json = {
       id :editItem.id,
        name:editItem.name,
        occupation:editItem.occupation
    }
    console.log("json:",json);


    const updatedList = list.map((item) => (item.id === editItem.id ? editItem : item));
    setList(updatedList);
    setDialogOpen(false);
  };

  const handleOccupationAdd=()=>{
    console.log("occupation:",occupation);
    setEditItem({...editItem,occupation:[...editItem.occupation,occupation]});
    setOccupation('');
  }
  return (
    <div>
      {/* Input Card */}
      <InputCard text={text} setText={setText} handleAdd={handleAdd} />

      {/* List of Items */}
      <ItemList list={list} handleEdit={handleEdit} handleDelete={handleDelete} />

      {/* Edit Dialog */}
      <Dialog open={dialogopen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <TextField
            label="Edit Item"
            variant="outlined"
            value={editItem?.name|| ''}
            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
          />
          <TextField
            label="Ocuupation"
            variant="outlined"
            onChange={(e) => setOccupation( e.target.value )}
          />
        </DialogContent>
        <DialogActions>
          
          <Button onClick={handleOccupationAdd} color="primary">
            Add
          </Button>

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

export default PracticePage2;
