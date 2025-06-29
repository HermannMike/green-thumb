import axios from 'axios';
import { getToken, logoutUser } from './auth';

const API_BASE_URL = 'http://localhost:5000/api/reminders';

const getAuthHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleAuthError = (error) => {
  if (error.response && error.response.status === 401) {
    // Token expired or invalid, logout user
    logoutUser();
    window.location.href = '/login';
  }
  throw error;
};

export const getReminders = async () => {
  try {
    const response = await axios.get(API_BASE_URL, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    handleAuthError(error);
  }
};

export const addReminder = async (reminder) => {
  try {
    // Send plant_name instead of plant_id
    const reminderData = {
      task: reminder.task,
      due_date: reminder.due_date,
      plant_name: reminder.plant_name,
    };
    const response = await axios.post(API_BASE_URL, reminderData, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    handleAuthError(error);
  }
};

export const updateReminder = async (id, updatedReminder) => {
  try {
    // Send plant_name instead of plant_id if present
    const reminderData = {
      task: updatedReminder.task,
      due_date: updatedReminder.due_date,
      plant_name: updatedReminder.plant_name,
    };
    const response = await axios.put(API_BASE_URL + id, reminderData, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    handleAuthError(error);
  }
};

export const deleteReminder = async (id) => {
  try {
    const response = await axios.delete(API_BASE_URL + id, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    handleAuthError(error);
  }
};
