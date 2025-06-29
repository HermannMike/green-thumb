import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/auth';

export const registerUser = async (username, password) => {
  const response = await axios.post(`${API_BASE_URL}/register`, { username, password });
  return response.data;
};

export const loginUser = async (username, password) => {
  const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
  if (response.data.access_token) {
    localStorage.setItem('token', response.data.access_token);
  }
  return response.data;
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const logoutUser = () => {
  localStorage.removeItem('token');
};
