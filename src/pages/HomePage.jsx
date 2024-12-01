import React, { useState } from 'react';
import { Box, Container, Typography, Collapse, Paper, Button, TextField, Dialog, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import TaskList from '../components/TaskList';
import useTasks from '../utils/useTasks';
import Sidebar from '../components/Sidebar';
import TaskForm from '../components/TaskForm';

const HomePage = () => {
  const { tasks, addTask, updateTask, toggleTaskCompletion } = useTasks();
  const [isFormMinimized, setIsFormMinimized] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTaskAdded, setIsTaskAdded] = useState(false);
  const [search] = useState('');

  
  const handleAddTask = (task) => {
    addTask(task);
    setIsDialogOpen(false);
    setIsFormMinimized(true);
    setIsTaskAdded(true);
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Login/Register Button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          p: 2,
          backgroundColor: 'primary.main',
          color: 'white',
        }}
      >
        <Button
          component={Link}
          to="/login"
          variant="outlined"
          sx={{ color: 'white', borderColor: 'white', textTransform: 'none' }}
        >
          Login/Register
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar />
        <Container sx={{ mt: 3, ml: 2, flexGrow: 1 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
            HELPSTiR
          </Typography>

          {!isTaskAdded && (
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
              <Box
                component="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddTask({ title: e.target.title.value, description: e.target.description.value });
                  e.target.reset();
                }}
                sx={{ mt: 2 }}
              >
                <TextField label="Title" name="title" fullWidth margin="normal" />
                <TextField
                  label="Description"
                  name="description"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                />
                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                  Add Task
                </Button>
              </Box>
            </Paper>
          )}

          {isTaskAdded && (
            <Box>
              <Collapse in={isFormMinimized} timeout="auto">
                <TaskList
                  tasks={filteredTasks}
                  toggleTaskCompletion={toggleTaskCompletion}
                  updateTask={updateTask}
                />
              </Collapse>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 2,
                      mb: 2,
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onClick={() => setIsDialogOpen(true)}
                  >
                    <Typography variant="h5">+ Add New Task</Typography>
                  </Paper>
                </Grid>
              </Grid>
              <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <TaskForm addTask={handleAddTask} />
              </Dialog>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
