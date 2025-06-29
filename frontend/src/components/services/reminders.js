import axios from 'axios';
import { getToken } from './auth';

const API_BASE_URL = 'http://localhost:5000/api/reminders/';

const getAuthHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getReminders = async () => {
  const response = await axios.get(API_BASE_URL, { headers: getAuthHeaders() });
  return response.data;
};

export const addReminder = async (reminder) => {
  const response = await axios.post(API_BASE_URL, reminder, { headers: getAuthHeaders() });
  return response.data;
};

export const updateReminder = async (id, updatedReminder) => {
  const response = await axios.put(API_BASE_URL + id, updatedReminder, { headers: getAuthHeaders() });
  return response.data;
};

export const deleteReminder = async (id) => {
  const response = await axios.delete(API_BASE_URL + id, { headers: getAuthHeaders() });
  return response.data;
};
