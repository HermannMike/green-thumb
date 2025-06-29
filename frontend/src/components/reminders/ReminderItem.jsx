// src/components/reminders/ReminderItem.jsx

const getTagClass = (type) => {
  switch (type) {
    case "Watering":
      return "tag-watering";
    case "Fertilizing":
      return "tag-fertilizing";
    case "Repotting":
      return "tag-repotting";
    default:
      return "";
  }
};

const ReminderItem = ({ reminder, onDelete }) => (
  <li>
    {reminder.text} - {reminder.date}
    <span className={`reminder-tag ${getTagClass(reminder.type)}`}>
      {reminder.type}
    </span>
    <button onClick={() => onDelete(reminder.id)}>Delete</button>
  </li>
);

export default ReminderItem;

