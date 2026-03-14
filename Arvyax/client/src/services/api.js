import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Journal APIs
export const journalAPI = {
  // Create a new journal entry
  create: (userId, ambience, text) =>
    api.post('/journal', { userId, ambience, text }),

  // Get all entries for a user
  getUserEntries: (userId) => api.get(`/journal/${userId}`),

  // Get single journal entry
  getById: (id) => api.get(`/journal/entries/${id}`),

  // Delete journal entry
  delete: (id) => api.delete(`/journal/${id}`),

  // Analyze emotion from text
  analyzeText: (text, journalId = null) =>
    api.post('/journal/analyze', { text, journalId }),

  // Get insights for a user
  getInsights: (userId) => api.get(`/journal/insights/${userId}`),
};

// Health check
export const healthCheck = () => api.get('/health');

export default api;
