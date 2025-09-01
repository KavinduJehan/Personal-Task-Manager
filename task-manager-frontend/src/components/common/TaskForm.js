import React, { useState } from 'react';
import { taskApi } from '../../services/api';

const TaskForm = ({ onTaskCreated, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    module: '',
    dueDate: '',
    priority: 'MEDIUM',
    status: 'TODO'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await taskApi.createTask({
        ...formData,
        dueDate: new Date(formData.dueDate).toISOString()
      });
      onTaskCreated();
      onClose();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="task-form-overlay">
      <div className="task-form">
        <h3>Add New Task</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          
          <select name="module" value={formData.module} onChange={handleChange}>
            <option value="">Select Module</option>
            <option value="EE4302">EE4302</option>
            <option value="EE4305">EE4305</option>
            {/* Add more modules */}
          </select>
          
          <input
            type="datetime-local"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
          
          <select name="priority" value={formData.priority} onChange={handleChange}>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
          </select>
          
          <div className="form-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;