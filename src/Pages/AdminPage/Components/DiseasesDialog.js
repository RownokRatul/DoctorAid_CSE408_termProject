import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

function DiseasesDialog({ open, onClose, onSave }) {
  const [name, setName] = React.useState('');

  const handleSave = () => {
    onSave({ name });
    setName('');
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a Disease</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Disease Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DiseasesDialog;
