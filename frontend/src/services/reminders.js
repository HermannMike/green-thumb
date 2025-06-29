import api from './api';

export const getReminders = async () => {
  try {
    const response = await api.get('/reminders');
    return response.data;
  } catch (error) {
    console.error('Get reminders error:', error);
    throw error;
  }
};

export const addReminder = async (reminder) => {
  try {
    const response = await api.post('/reminders', reminder);
    return response.data;
  } catch (error) {
    console.error('Add reminder error:', error);
    throw error;
  }
};

export const deleteReminder = async (id) => {
  try {
    await api.delete(`/reminders/${id}`);
  } catch (error) {
    console.error('Delete reminder error:', error);
    throw error;
  }
};
