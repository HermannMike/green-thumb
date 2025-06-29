import { useState, useEffect } from "react";
import ReminderForm from "../components/reminders/ReminderForm";
import ReminderList from "../components/reminders/ReminderList";
import ReminderCalendar from "../components/reminders/ReminderCalendar";
import UpcomingReminders from "../components/reminders/UpcomingReminders";
import { getReminders, addReminder, deleteReminder } from "../services/reminders";

const RemindersPage = () => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    getReminders().then(setReminders);
  }, []);

  const handleAdd = (newReminder) => {
    addReminder(newReminder).then((saved) =>
      setReminders([...reminders, saved])
    );
  };

  const handleDelete = (id) => {
    deleteReminder(id).then(() =>
      setReminders(reminders.filter((r) => r.id !== id))
    );
  };

  return (
    <div className="reminders-page container">
      <h2> My Reminders</h2>
      <ReminderForm onAdd={handleAdd} />
      <UpcomingReminders reminders={reminders} />
      <ReminderCalendar reminders={reminders} />
      <ReminderList reminders={reminders} onDelete={handleDelete} />
    </div>
  );
};

export default RemindersPage;

