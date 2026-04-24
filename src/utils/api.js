import axios from 'axios';
import { API_BASE_URL } from './constants';
import { getUserToken } from './storage';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - add auth token
api.interceptors.request.use(
  async (config) => {
    const token = await getUserToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error
      console.error('API Error:', error.response.data);
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // No response received
      console.error('Network Error:', error.request);
      return Promise.reject({ message: 'Network error. Please check your connection.' });
    } else {
      console.error('Request Error:', error.message);
      return Promise.reject({ message: error.message });
    }
  }
);

export default api;

