let reminders = [];

export const getReminders = () => Promise.resolve(reminders);
export const addReminder = (reminder) => {
  reminder.id = Date.now();
  reminders.push(reminder);
  return Promise.resolve(reminder);
};
export const deleteReminder = (id) => {
  reminders = reminders.filter((r) => r.id !== id);
  return Promise.resolve();
};