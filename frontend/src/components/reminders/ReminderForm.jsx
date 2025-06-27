import React, { useState } from 'react';

const ReminderForm = ({ addReminder }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!title) {
      setError('Title is required');
      return;
    }
    if (!date) {
      setError('Date is required');
      return;
    }
    addReminder({ title, description, date });
    setTitle('');
    setDescription('');
    setDate('');
    setSuccess('Reminder added successfully!');
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Add Reminder</h2>
      {error && <div style={styles.error}>{error}</div>}
      {success && <div style={styles.success}>{success}</div>}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={styles.input}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={styles.textarea}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Add Reminder</button>
    </form>
  );
};

const styles = {
  form: {
    marginBottom: '30px',
    padding: '20px',
    border: '1px solid #4caf50',
    borderRadius: '8px',
    backgroundColor: '#f1f8e9',
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    marginBottom: '12px',
    borderRadius: '4px',
    border: '1px solid #4caf50',
    fontSize: '1rem',
  },
  textarea: {
    width: '100%',
    padding: '8px 12px',
    marginBottom: '12px',
    borderRadius: '4px',
    border: '1px solid #4caf50',
    fontSize: '1rem',
    minHeight: '60px',
  },
  button: {
    backgroundColor: '#4caf50',
    color: '#fff',
    padding: '10px 16px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  error: {
    color: '#d32f2f',
    marginBottom: '12px',
  },
  success: {
    color: '#388e3c',
    marginBottom: '12px',
  },
};

export default ReminderForm;
