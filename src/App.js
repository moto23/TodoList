import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import TodayPage from './components/TodayPage';
import AllTasksPage from './pages/AllTasksPage';
import Sidebar from './components/Sidebar';
import CreateTask from './pages/CreateTask';
import RecoverTasksPage from './pages/RecoverTasksPage';
import RemindersPage from './pages/RemindersPage';
import CalendarPage from './pages/CalendarPage';
import Register from './components/Register';
import Login from './components/Login';
import { UserProvider } from './context/UserContext';

const AppLayout = () => {
  const location = useLocation();

  // List of routes where Sidebar should not appear
  const noSidebarRoutes = ['/login', '/register'];

  const showSidebar = !noSidebarRoutes.includes(location.pathname);

  return (
    <>
      {showSidebar && <Sidebar />}
      <Routes>
        <Route path="/" element={<CreateTask />} />
        <Route path="/all-tasks" element={<AllTasksPage />} />
        <Route path="/add-new-list" element={<CreateTask />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recover-tasks" element={<RecoverTasksPage />} />
        <Route path="/today" element={<TodayPage />} />
        <Route path="/reminders" element={<RemindersPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        {/* Add other routes here */}
      </Routes>
    </>
  );
};

function App() {
  return (
    <UserProvider>
      <Router>
        <AppLayout />
      </Router>
    </UserProvider>
  );
}

export default App;
