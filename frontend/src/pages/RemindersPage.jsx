import React, { useState, useEffect } from 'react';
import ReminderList from '../components/reminders/ReminderList';
import ReminderForm from '../components/reminders/ReminderForm';
import { getReminders, addReminder, updateReminder, deleteReminder } from '../components/services/reminders';

const RemindersPage = () => {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const data = await getReminders();
        setReminders(data);
      } catch (err) {
        setError('Failed to load reminders');
      } finally {
        setLoading(false);
      }
    };
    fetchReminders();
  }, []);

  const handleAddReminder = async (reminder) => {
    try {
      const newReminder = await addReminder(reminder);
      setReminders((prevReminders) => [...prevReminders, { ...reminder, id: newReminder.id }]);
    } catch (err) {
      setError('Failed to add reminder');
    }
  };

  const handleUpdateReminder = async (id, updatedData) => {
    try {
      await updateReminder(id, updatedData);
      setReminders((prevReminders) =>
        prevReminders.map((r) => (r.id === id ? { ...r, ...updatedData } : r))
      );
    } catch (err) {
      setError('Failed to update reminder');
    }
  };

  const handleDeleteReminder = async (id) => {
    try {
      await deleteReminder(id);
      setReminders((prevReminders) => prevReminders.filter((r) => r.id !== id));
    } catch (err) {
      setError('Failed to delete reminder');
    }
  };

  const handleCompleteReminder = async (id) => {
    try {
      // Implement completeReminder API call here
      // For now, just update the reminder as completed locally
      await updateReminder(id, { completed: true });
      setReminders((prevReminders) =>
        prevReminders.map((r) => (r.id === id ? { ...r, completed: true } : r))
      );
    } catch (err) {
      setError('Failed to complete reminder');
    }
  };

  if (loading) {
    return <p>Loading reminders...</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Reminders</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ReminderForm addReminder={handleAddReminder} />
      <ReminderList
        reminders={reminders}
        deleteReminder={handleDeleteReminder}
        updateReminder={handleUpdateReminder}
        completeReminder={handleCompleteReminder}
      />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '960px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '30px',
  },
};

export default RemindersPage;
