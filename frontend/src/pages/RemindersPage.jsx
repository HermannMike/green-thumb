import React, { useState, useEffect } from 'react';
import ReminderList from '../components/reminders/ReminderList';
import ReminderForm from '../components/reminders/ReminderForm';

const RemindersPage = () => {
  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem('reminders');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        title: 'Water the plants',
        description: 'Remember to water the plants every morning.',
        date: '2024-06-01',
      },
      {
        id: 2,
        title: 'Fertilize garden',
        description: 'Apply fertilizer to the garden this weekend.',
        date: '2024-06-05',
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  const addReminder = (reminder) => {
    setReminders((prevReminders) => [
      ...prevReminders,
      { ...reminder, id: prevReminders.length + 1 },
    ]);
  };

  const deleteReminder = (id) => {
    setReminders((prevReminders) => prevReminders.filter(r => r.id !== id));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Reminders</h1>
      <ReminderForm addReminder={addReminder} />
      <ReminderList reminders={reminders} deleteReminder={deleteReminder} />
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
