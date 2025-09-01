import React, { useState, useEffect } from 'react';
import { taskApi } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorBoundary from '../common/ErrorBoundary';
import './Grading.css';

const Grading = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [completedTasks, setCompletedTasks] = useState([]);
  const [focusRating, setFocusRating] = useState(4);
  const [pomodoroSessions, setPomodoroSessions] = useState(0);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCompletedTasks();
    setTimeout(() => setLoading(false), 500);
  }, [selectedDate]);

  const fetchCompletedTasks = async () => {
    try {
      const response = await taskApi.getTasksByStatus('DONE');
      // Filter tasks completed today
      const today = new Date().toDateString();
      const todayTasks = response.data.filter(task => 
        new Date(task.updatedAt).toDateString() === today
      );
      setCompletedTasks(todayTasks);
    } catch (error) {
      console.error('Error fetching completed tasks:', error);
      setError(error);
    }
  };

  const calculateCompletionPercentage = () => {
    // This would ideally come from your daily task goals
    const totalTasksForDay = 8; // Example
    return (completedTasks.length / totalTasksForDay) * 100;
  };

  const renderStars = (rating, onChange) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map(star => (
          <span
            key={star}
            className={`star ${star <= rating ? 'filled' : ''}`}
            onClick={() => onChange(star)}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div style={{color: 'red'}}>Error: {error.message}</div>;

  return (
    <ErrorBoundary>
      <div className="grading-dashboard">
        <h1>Grading Dashboard</h1>
        
        <div className="date-selector">
          <label>Date:</label>
          <button onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)))}>
            ←
          </button>
          <span>{selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
          <button onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)))}>
            →
          </button>
        </div>
        
        <div className="grading-metrics">
          <div className="metric">
            <label>Tasks Completed today:</label>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${calculateCompletionPercentage()}%` }}
              ></div>
            </div>
            <span>{completedTasks.length} tasks completed</span>
          </div>
          
          <div className="metric">
            <label>Pomodoro sessions:</label>
            <select value={pomodoroSessions} onChange={(e) => setPomodoroSessions(e.target.value)}>
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5+</option>
            </select>
          </div>
          
          <div className="metric">
            <label>Focus Rating:</label>
            {renderStars(focusRating, setFocusRating)}
          </div>
          
          <div className="metric">
            <label>Summary of the day:</label>
            <textarea
              placeholder="Enter text here..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Grading;