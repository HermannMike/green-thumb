import axios from 'axios';

const API_BASE_URL = '/api/reminders';

export const getReminders = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const addReminder = async (reminder) => {
  const response = await axios.post(API_BASE_URL, reminder);
  return response.data;
};

export const updateReminder = async (id, updatedReminder) => {
  const response = await axios.put(API_BASE_URL + '/' + id, updatedReminder);
  return response.data;
};

export const deleteReminder = async (id) => {
  const response = await axios.delete(API_BASE_URL + '/' + id);
  return response.data;
};
