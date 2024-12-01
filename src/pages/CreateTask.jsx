import React, { useContext, useState, useEffect } from 'react';
import { Box, Container, Typography, Collapse, Paper, Button, TextField, Snackbar, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import TaskList from '../components/TaskList';
import useTasks from '../utils/useTasks';
import Sidebar from '../components/Sidebar';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const CreateTask = () => {
  const { tasks, addTask, updateTask, toggleTaskCompletion, deleteTask } = useTasks();
  const { user } = useContext(UserContext);
  const [isFormMinimized, setIsFormMinimized] = useState(false);
  const [isTaskAdded, setIsTaskAdded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTasks, setFilteredTasks] = useState(tasks || []);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  

  const handleAddTask = async (task, file) => {
    if (!user) {
      setError('Please log in or register to add a task.');
      setOpenSnackbar(true);
      return;
    }
  
    if (!task.title) {
      setError('Title is required.');
      setOpenSnackbar(true);
      return;
    }
  
    try {
      let response;
  
      if (file) {
        // Handle file upload
        const formData = new FormData();
        formData.append('title', task.title);
        formData.append('description', task.description || '');
        formData.append('userId', user._id);
        formData.append('file', file);
  
        response = await axios.post('/api/tasks', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        // Handle JSON request for tasks without files
        response = await axios.post('/api/tasks', {
          title: task.title,
          description: task.description || '',
          userId: user._id,
        });
      }
  
      addTask(response.data.task);
      setIsFormMinimized(true);
      setIsTaskAdded(true);
      setError('');
      setOpenSnackbar(true);
    } catch (err) {
      console.error(err);
      setError('Failed to add task.');
      setOpenSnackbar(true);
    }
  };
  

  useEffect(() => {
    if (searchQuery) {
      setFilteredTasks(tasks.filter(task => task.title.toLowerCase().includes(searchQuery.toLowerCase())));
    } else {
      setFilteredTasks(tasks || []);
    }
  }, [searchQuery, tasks]);

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
        {user ? (
          <Typography variant="h6" color="primary">
            Welcome, {user.fullName}
          </Typography>
        ) : (
          <Button component={Link} to="/login" variant="outlined" color="primary">
            Login/Register
          </Button>
        )}
      </Box>

      <Sidebar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Container sx={{ mt: 5, ml: -1, flexGrow: 1 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 5 }}>
          HELPSTiR
        </Typography>

        {!isTaskAdded && (
          <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                handleAddTask(
                  {
                    title: e.target.title.value,
                    description: e.target.description.value,
                  },
                  e.target.file.files[0]
                );
                e.target.reset();
              }}
              sx={{ mt: 2 }}
            >
              <TextField
                label="Title"
                name="title"
                fullWidth
                margin="normal"
                required
              />
              <TextField
                label="Description"
                name="description"
                fullWidth
                margin="normal"
                multiline
                rows={4}
              />
              <Typography
                variant="body2"
                align="center"
                color="textSecondary"
                sx={{ my: 2 }}
              >
                OR
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Upload File (PDF, Word, Excel):
              </Typography>
              <input type="file" name="file" style={{ margin: '10px 0' }} />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Add Task
              </Button>
            </Box>
          </Paper>
        )}

        {isTaskAdded && (
          <Box>
            {filteredTasks.length > 0 ? (
              <Collapse in={isFormMinimized} timeout="auto">
                <TaskList
                  tasks={filteredTasks}
                  toggleTaskCompletion={toggleTaskCompletion}
                  updateTask={updateTask}
                  deleteTask={deleteTask}
                />
              </Collapse>
            ) : (
              <Typography
                variant="h6"
                color="textSecondary"
                align="center"
                sx={{ mt: 4 }}
              >
                No tasks available. Add your first task!
              </Typography>
            )}
          </Box>
        )}

        {/* Snackbar */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={error ? 'error' : 'success'}
          >
            {error || 'Task added successfully!'}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default CreateTask;
