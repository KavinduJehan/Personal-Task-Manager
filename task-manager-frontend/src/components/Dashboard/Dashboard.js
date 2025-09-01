import React, { useState, useEffect } from 'react';
import { taskApi } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorBoundary from '../common/ErrorBoundary';
import './Dashboard.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
    fetchTodayTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await taskApi.getAllTasks();
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTodayTasks = async () => {
    try {
      const response = await taskApi.getTodayTasks();
      setTodayTasks(response.data);
    } catch (error) {
      console.error('Error fetching today tasks:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div style={{color: 'red'}}>Error: {error.message}</div>;

  return (
    <ErrorBoundary>
      <div className="dashboard">
        <div className="welcome-section">
          <h1>Welcome, Jehan!</h1>
          <h2>Here's What's coming up this week</h2>
        </div>
        
        <div className="main-content">
          <div className="tasks-section">
            <div className="task-table">
              <div className="table-header">
                <span>Task Name</span>
                <span>Priority Level</span>
                <span>Module</span>
                <span>Days Due</span>
              </div>
              {tasks.slice(0, 6).map(task => (
                <div key={task.id} className="task-row">
                  <span>{task.title}</span>
                  <span className={`priority-${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>
                  <span>{task.module}</span>
                  <span>{Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24))}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="calendar-section">
            {/* Calendar component will go here */}
            <div className="calendar-placeholder">
              <h3>Calendar</h3>
              <p>Calendar component coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Dashboard;