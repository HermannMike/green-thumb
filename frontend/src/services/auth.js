import api from './api';

export const register = async (formData) => {
  try {
    const response = await api.post('/auth/register', formData);
    return response.data;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

export const login = async (formData) => {
  try {
    const response = await api.post('/auth/login', formData);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};
  