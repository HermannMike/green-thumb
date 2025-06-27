import React from 'react';

const ReminderItem = ({ title, description, date }) => {
  return (
    <div style={styles.container}>
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.description}>{description}</p>
      <p style={styles.date}>{date}</p>
    </div>
  );
};

const styles = {
  container: {
    border: '1px solid #4caf50',
    borderRadius: '8px',
    padding: '12px 16px',
    marginBottom: '12px',
    backgroundColor: '#e8f5e9',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  title: {
    margin: '0 0 6px 0',
    color: '#2e7d32',
  },
  description: {
    margin: '0 0 6px 0',
    color: '#4caf50',
  },
  date: {
    margin: 0,
    fontSize: '0.85rem',
    color: '#388e3c',
  },
};

export default ReminderItem;
