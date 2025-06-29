import React from 'react';

const ReminderItem = ({ reminder, onEdit, onComplete }) => {
  const { task, due_date, plant_name, plant_image_url } = reminder;

  return (
    <div style={styles.container}>
      <input
        type="checkbox"
        onChange={() => onComplete(reminder.id)}
        style={styles.checkbox}
        aria-label="Mark reminder as completed"
      />
      <img
        src={plant_image_url || 'https://via.placeholder.com/60'}
        alt={plant_name || 'Plant'}
        style={styles.image}
      />
      <div style={styles.textContainer}>
        <h3 style={styles.title}>{task}</h3>
        <p style={styles.plantName}>{plant_name}</p>
        <p style={styles.date}>{new Date(due_date).toLocaleString()}</p>
      </div>
      <button onClick={() => onEdit(reminder)} style={styles.editButton}>Edit</button>
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
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: '12px',
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  },
  image: {
    width: '60px',
    height: '60px',
    borderRadius: '8px',
    objectFit: 'cover',
    marginRight: '12px',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    margin: '0 0 6px 0',
    color: '#2e7d32',
  },
  plantName: {
    margin: '0 0 6px 0',
    color: '#388e3c',
    fontWeight: 'bold',
  },
  date: {
    margin: 0,
    fontSize: '0.85rem',
    color: '#388e3c',
  },
  editButton: {
    backgroundColor: '#1976d2',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '6px 12px',
    cursor: 'pointer',
  },
};

export default ReminderItem;
