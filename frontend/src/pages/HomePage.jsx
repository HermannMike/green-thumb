import React, { useState, useEffect } from 'react';
import ReminderList from '../components/reminders/ReminderList';
import PlantList from '../components/plants/PlantList';

const HomePage = () => {
  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem('reminders');
    return saved ? JSON.parse(saved) : [];
  });

  const [plants, setPlants] = useState(() => {
    const saved = localStorage.getItem('plants');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedReminders = JSON.parse(localStorage.getItem('reminders')) || [];
      const updatedPlants = JSON.parse(localStorage.getItem('plants')) || [];
      setReminders(updatedReminders);
      setPlants(updatedPlants);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to GreenThumb</h1>
      <div style={styles.section}>
        <h2>Reminders</h2>
        <ReminderList reminders={reminders} />
      </div>
      <div style={styles.section}>
        <h2>Plants</h2>
        <PlantList plants={plants} />
      </div>
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
  section: {
    marginBottom: '40px',
  },
};

export default HomePage;
