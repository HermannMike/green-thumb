import React from "react";
import "../../styles/UpcomingReminders.css";

const UpcomingReminders = ({ reminders }) => {
  const upcoming = reminders
    .filter((r) => new Date(r.reminderDate) >= new Date())
    .sort((a, b) => new Date(a.reminderDate) - new Date(b.reminderDate))
    .slice(0, 5); // Show top 5 upcoming

  return (
    <div className="upcoming-reminders-widget">
      <h3>🌱 Upcoming Reminders</h3>
      {upcoming.length === 0 ? (
        <p>No upcoming reminders.</p>
      ) : (
        <ul>
          {upcoming.map((r) => (
            <li key={r.id}>
              <span className="reminder-date">{new Date(r.reminderDate).toDateString()}</span>
              <span className="reminder-text">{r.note}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UpcomingReminders;
