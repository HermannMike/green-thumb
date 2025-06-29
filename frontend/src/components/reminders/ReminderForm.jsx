import React, { useState } from 'react';

const ReminderForm = ({ addReminder, initialData = {}, onSubmit, onCancel }) => {
  const [task, setTask] = useState(initialData.task || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [due_date, setDueDate] = useState(initialData.due_date || '');
  const [plant_id, setPlantId] = useState(initialData.plant_id || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!task) {
      setError('Task is required');
      return;
    }
    if (!due_date) {
      setError('Due date is required');
      return;
    }
    if (!plant_id) {
      setError('Plant ID is required');
      return;
    }
    if (onSubmit) {
      onSubmit({ task, due_date, plant_id });
    } else {
      addReminder({ task, due_date, plant_id });
      setTask('');
      setDescription('');
      setDueDate('');
      setPlantId('');
      setSuccess('Reminder added successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>{onSubmit ? 'Edit Reminder' : 'Add Reminder'}</h2>
      {error && <div style={styles.error}>{error}</div>}
      {success && <div style={styles.success}>{success}</div>}
      <input
        type="text"
        placeholder="Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        style={styles.input}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={styles.textarea}
      />
      <input
        type="datetime-local"
        value={due_date}
        onChange={(e) => setDueDate(e.target.value)}
        style={styles.input}
      />
      <input
        type="number"
        placeholder="Plant ID"
        value={plant_id}
        onChange={(e) => setPlantId(e.target.value)}
        style={styles.input}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button type="submit" style={styles.button}>{onSubmit ? 'Update Reminder' : 'Add Reminder'}</button>
        {onSubmit && (
          <button type="button" onClick={onCancel} style={{ ...styles.button, backgroundColor: '#d32f2f' }}>
            Cancel
          </button>
        )}
      </div>
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
