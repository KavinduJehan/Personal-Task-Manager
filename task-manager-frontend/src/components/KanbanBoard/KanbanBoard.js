import React, { useState, useEffect } from 'react';
import { taskApi } from '../../services/api';
import TaskCard from './TaskCard';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorBoundary from '../common/ErrorBoundary';
import './KanbanBoard.css';

const KanbanBoard = () => {
  const [todoTasks, setTodoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasksByStatus = async () => {
      try {
        const todoResponse = await taskApi.getTasksByStatus('TODO');
        const inProgressResponse = await taskApi.getTasksByStatus('IN_PROGRESS');
        const doneResponse = await taskApi.getTasksByStatus('DONE');
        
        setTodoTasks(todoResponse.data);
        setInProgressTasks(inProgressResponse.data);
        setDoneTasks(doneResponse.data);
      } catch (error) {
        setError(error);
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasksByStatus();
  }, []);

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      // First get the task
      const taskResponse = await taskApi.getTaskById(taskId);
      const task = taskResponse.data;
      
      // Update status
      task.status = newStatus;
      await taskApi.updateTask(taskId, task);
      
      // Refresh the board
      fetchTasksByStatus();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div style={{color: 'red'}}>Error: {error.message}</div>;

  return (
    <ErrorBoundary>
      <div className="kanban-board">
        <h1>Kanban Board</h1>
        
        <div className="kanban-columns">
          <div className="kanban-column">
            <div className="column-header todo">
              <h3>To-Do</h3>
            </div>
            <div className="column-content">
              {todoTasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onStatusChange={updateTaskStatus}
                />
              ))}
              <button className="add-task-btn">+</button>
            </div>
          </div>

          <div className="kanban-column">
            <div className="column-header in-progress">
              <h3>In Progress</h3>
            </div>
            <div className="column-content">
              {inProgressTasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onStatusChange={updateTaskStatus}
                />
              ))}
              <button className="add-task-btn">+</button>
            </div>
          </div>

          <div className="kanban-column">
            <div className="column-header done">
              <h3>Done</h3>
            </div>
            <div className="column-content">
              {doneTasks.map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  onStatusChange={updateTaskStatus}
                />
              ))}
              <button className="add-task-btn">+</button>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default KanbanBoard;