import axios from 'axios';

const api = axios.create({
  baseURL: 'https://green-thumb-9.onrender.com/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the JWT token in Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
