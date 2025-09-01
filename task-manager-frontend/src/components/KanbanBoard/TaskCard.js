import React, { useState, useEffect } from 'react';
import './TaskCard.css';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorBoundary from '../common/ErrorBoundary';

const TaskCard = ({ task, onStatusChange }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleStatusChange = (e) => {
    onStatusChange(task.id, e.target.value);
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div style={{ color: 'red' }}>Error: {error.message}</div>;

  return (
    <ErrorBoundary>
      <div className="task-card">
        <div className="task-content">
          <h4>{task.title}</h4>
          <p>{task.module}</p>
          <div className="task-meta">
            <span className={`priority-${task.priority.toLowerCase()}`}>
              {task.priority}
            </span>
            <span className="due-date">
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="task-actions">
          <select value={task.status} onChange={handleStatusChange}>
            <option value="TODO">To-Do</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
          </select>

          <div className="action-buttons">
            <button className="edit-btn">Edit</button>
            <button className="delete-btn">Delete</button>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default TaskCard;