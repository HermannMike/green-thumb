import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/ReminderCalendar.css";

const ReminderCalendar = ({ reminders, onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getReminderDates = () =>
    reminders.map((r) => new Date(r.date).toDateString());

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const reminderDates = getReminderDates();
      return reminderDates.includes(date.toDateString()) ? "has-reminder" : null;
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onSelectDate(date);
  };

  return (
    <div className="reminder-calendar">
      <h3> Select a Date</h3>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileClassName={tileClassName}
      />
    </div>
  );
};

export default ReminderCalendar;

