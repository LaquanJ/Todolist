import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import UserSelectField from '@components/UserSelectField';

const AddTodoModal = ({ open, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [user, setUser] = useState();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add To-Do</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          id='title'
          label='Title'
          type='text'
          fullWidth
          variant='standard'
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <TextField
          autoFocus
          margin='dense'
          id='description'
          label='Description'
          type='text'
          fullWidth
          variant='standard'
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <UserSelectField user={user} setUser={setUser} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => onSave({ title, description, userId: user.id })}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTodoModal;
