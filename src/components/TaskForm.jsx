// src/components/TaskForm.jsx
import React, { useState } from 'react';
import { TextField, Button, Box, Paper, Typography, Divider } from '@mui/material';

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ title, description }, file);
    setTitle('');
    setDescription('');
    setFile(null);
  };

  return (
    <Paper elevation={4} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Add a New Task
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          required
          margin="normal"
          multiline
          rows={4}
        />
        <Divider sx={{ my: 2 }}>OR</Divider>
        <Typography variant="body1" gutterBottom>
          Upload a File (Optional)
        </Typography>
        <input
          type="file"
          accept=".pdf,.docx,.xlsx"
          onChange={handleFileChange}
          style={{ marginBottom: 16 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2, borderRadius: 2, textTransform: 'none' }}
        >
          Add Task
        </Button>
      </Box>
    </Paper>
  );
};

export default TaskForm;
