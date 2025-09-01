import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskApi = {
  // Get all tasks
  getAllTasks: () => api.get('/tasks'),
  
  // Get task by ID
  getTaskById: (id) => api.get(`/tasks/${id}`),
  
  // Create new task
  createTask: (task) => api.post('/tasks', task),
  
  // Update task
  updateTask: (id, task) => api.put(`/tasks/${id}`, task),
  
  // Delete task
  deleteTask: (id) => api.delete(`/tasks/${id}`),
  
  // Get tasks by status
  getTasksByStatus: (status) => api.get(`/tasks/status/${status}`),
  
  // Get today's tasks
  getTodayTasks: () => api.get('/tasks/today'),
};

export const diaryApi = {
  getAllEntries: () => api.get('/diary'),
  getEntryByDate: (date) => api.get(`/diary/${date}`),
  createEntry: (entry) => api.post('/diary', entry),
  getRecentEntries: () => api.get('/diary/recent'),
};

export default api;