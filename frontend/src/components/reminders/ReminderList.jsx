import React from 'react';
import ReminderItem from './ReminderItem';

const ReminderList = ({ reminders, deleteReminder }) => {
  return (
    <div>
      <h2>Reminder List</h2>
      {reminders.length === 0 ? (
        <p>No reminders available.</p>
      ) : (
        reminders.map((reminder) => (
          <div key={reminder.id} style={styles.reminderContainer}>
            <ReminderItem reminder={reminder} />
            <button
              onClick={() => deleteReminder(reminder.id)}
              style={styles.deleteButton}
            >
              Delete
            </button>
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
