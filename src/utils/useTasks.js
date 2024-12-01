import { useState } from 'react';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    const newTask = {
      id: Date.now(),
      ...task,
      isDone: false,
      timestamp: new Date(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  return { tasks, addTask, updateTask, toggleTaskCompletion, deleteTask };
};

export default useTasks;
