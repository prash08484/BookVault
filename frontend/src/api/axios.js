import axios from 'axios';

// Debug: Log the API URL being used
const apiUrl = process.env.REACT_APP_API_URL || 'https://bookvault-1.onrender.com';
console.log('Environment REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
console.log('API Base URL being used:', apiUrl);

// Create axios instance with base URL
const API = axios.create({
  baseURL: apiUrl,
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
    
    console.log('API Error:', {
      status: response?.status,
      message: error.message,
      url: config?.url,
      retryAttempt: config._retryCount || 0
    });
    
    // If backend is sleeping (502/503/network error) and we haven't retried too many times
    if ((response?.status === 502 || response?.status === 503 || error.code === 'NETWORK_ERROR' || !response) && (config._retryCount || 0) < 2) {
      config._retryCount = (config._retryCount || 0) + 1;
      console.log(`Backend issue detected, retry attempt ${config._retryCount}/2 in 3 seconds...`);
      
      // Wait 3 seconds for backend to wake up
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      return API(config);
    }
    
    return Promise.reject(error);
  }
);

export default API;
