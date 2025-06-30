import { useState } from "react";
import ReminderForm from "./ReminderForm";
import ReminderItem from "./ReminderItem";
import ReminderCalendar from "./ReminderCalendar";
import "../../styles/ReminderList.css";

const ReminderList = () => {
  const [reminders, setReminders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const addReminder = (reminder) => {
    setReminders([...reminders, reminder]);
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter((r) => r.id !== id));
  };

  return (
    <div className="reminder-list-wrapper">
      <ReminderForm onAdd={addReminder} />
      <ReminderCalendar reminders={reminders} onSelectDate={setSelectedDate} />
      <div className="reminders-section">
        <h3>My Reminders</h3>
        {reminders.length === 0 ? (
          <p className="no-reminders">You have no reminders yet.</p>
        ) : (
          <ul className="reminder-list">
            {reminders.map((reminder) => (
              <ReminderItem
                key={reminder.id}
                reminder={reminder}
                onDelete={deleteReminder}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ReminderList;

