// src/services/axiosInstance.js
import axios from 'axios';

// Set your API base URL (from .env or default)
const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create reusable axios instance
const axiosInstance = axios.create({
  baseURL: API,
});

// ✅ Interceptor: Attach JWT token from localStorage (safely)
axiosInstance.interceptors.request.use((config) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
  } catch (err) {
    console.warn('Invalid user token in localStorage:', err);
  }

  return config;
});

export default axiosInstance;
