// import React from 'react';
// import TaskItem from './TaskItem';
// import { Grid, Collapse } from '@mui/material';

// const colors = ['#FFCDD2', '#C8E6C9', '#BBDEFB', '#FFE0B2', '#D1C4E9'];

// const TaskList = ({ tasks, toggleTaskCompletion, updateTask, deleteTask }) => {
//   return (
//     <Grid container spacing={2}>
//       {tasks.map((task, index) => (
//         <Grid item xs={12} sm={6} md={4} key={task.id}>
//           <Collapse in={true} timeout="auto">
//             <TaskItem
//               task={task}
//               toggleTaskCompletion={toggleTaskCompletion}
//               updateTask={updateTask}
//               deleteTask={deleteTask}
//               color={colors[index % colors.length]}
//             />
//           </Collapse>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default TaskList;

import React from 'react';
import TaskItem from './TaskItem';
import { Grid } from '@mui/material';

const TaskList = ({ tasks, toggleTaskCompletion, updateTask, deleteTask }) => {
  return (
    <Grid container spacing={3}>
      {tasks.map((task, index) => (
        <Grid item xs={12} sm={6} md={4} key={task.id}>
          <TaskItem
            task={task}
            toggleTaskCompletion={toggleTaskCompletion}
            updateTask={updateTask}
            deleteTask={deleteTask}
            color={index % 2 === 0 ? 'lightblue' : 'lightgreen'}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default TaskList;

