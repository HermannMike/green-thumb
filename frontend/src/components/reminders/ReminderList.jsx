import React, { useState } from 'react';
import ReminderItem from './ReminderItem';
import ReminderForm from './ReminderForm';

const ReminderList = ({ reminders, deleteReminder, updateReminder, completeReminder }) => {
  const [editingId, setEditingId] = useState(null);

  const handleEdit = (reminder) => {
    setEditingId(reminder.id);
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleUpdate = (updatedData) => {
    updateReminder(editingId, updatedData);
    setEditingId(null);
  };

  const handleComplete = (id) => {
    completeReminder(id);
  };

  return (
    <div>
      <h2>Reminder List</h2>
      {reminders.length === 0 ? (
        <p>No reminders available.</p>
      ) : (
        reminders.map((reminder) => (
          <div key={reminder.id} style={styles.reminderContainer}>
            {editingId === reminder.id ? (
              <ReminderForm
                initialData={reminder}
                onSubmit={handleUpdate}
                onCancel={handleCancel}
              />
            ) : (
              <>
                <ReminderItem reminder={reminder} onEdit={handleEdit} onComplete={handleComplete} />
                <button
                  onClick={() => deleteReminder(reminder.id)}
                  style={styles.deleteButton}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  reminderContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  deleteButton: {
    backgroundColor: '#d32f2f',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '6px 12px',
    cursor: 'pointer',
  },
};

export default ReminderList;
