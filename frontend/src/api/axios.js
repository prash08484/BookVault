import axios from 'axios';

// Debug: Log the API URL being used
console.log('API Base URL:', process.env.REACT_APP_API_URL || 'http://localhost:5000');

// Create axios instance with base URL
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
});

// Add request interceptor to include auth token and retry logic
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

// Add response interceptor to handle 502 errors (backend sleeping)
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error;
    
    // If backend is sleeping (502/503) and we haven't retried yet
    if ((response?.status === 502 || response?.status === 503) && !config._retry) {
      config._retry = true;
      console.log('Backend is waking up, retrying in 3 seconds...');
      
      // Wait 3 seconds for backend to wake up
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      return API(config);
    }
    
    return Promise.reject(error);
  }
);

export default API;
