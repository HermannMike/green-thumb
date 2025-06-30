import api from './api';

export const getReminders = async () => {
  try {
    // Add Authorization header with token from localStorage
    const token = localStorage.getItem('token');
    const response = await api.get('/reminders', {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Get reminders error:', error);
    throw error;
  }
};

export const addReminder = async (reminder) => {
  try {
    // Map frontend form fields to backend expected fields
    const payload = {
      note: reminder.text,
      reminderDate: reminder.date,
      type: reminder.type, // optional, if backend supports
    };
    const token = localStorage.getItem('token');
    const response = await api.post('/reminders', payload, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Add reminder error:', error);
    throw error;
  }
};

export const deleteReminder = async (id) => {
  try {
    const token = localStorage.getItem('token');
    await api.delete(`/reminders/${id}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
  } catch (error) {
    console.error('Delete reminder error:', error);
    throw error;
  }
};
