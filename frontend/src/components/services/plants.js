import axios from 'axios';
import { getToken } from './auth';

const API_BASE_URL = 'http://localhost:5000/api/plants';

const getAuthHeaders = () => {
  const token = getToken();
  return {
    Authorization: token ? `Bearer ${token}` : '',
  };
};

export const getPlants = async () => {
  const response = await axios.get(API_BASE_URL, { headers: getAuthHeaders() });
  return response.data;
};

export const addPlant = async (plant) => {
  const response = await axios.post(API_BASE_URL, plant, { headers: getAuthHeaders() });
  return response.data;
};

export const updatePlant = async (id, updatedPlant) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, updatedPlant, { headers: getAuthHeaders() });
  return response.data;
};

export const deletePlant = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`, { headers: getAuthHeaders() });
  return response.data;
};
