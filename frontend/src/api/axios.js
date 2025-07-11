import axios from 'axios';

// Create axios instance with base URL
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
});

// Add request interceptor to include auth token
API.interceptors.request.use(
  (config) => {
    const userAuthData = localStorage.getItem('userAuthData');
    if (userAuthData) {
      const userData = JSON.parse(userAuthData);
      if (userData.token) {
        config.headers.Authorization = `Bearer ${userData.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
