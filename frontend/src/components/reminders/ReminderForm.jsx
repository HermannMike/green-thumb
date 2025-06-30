import "../../styles/ReminderForm.css";
import { useState } from "react";

const ReminderForm = ({ onAdd }) => {
  const [form, setForm] = useState({ text: "", date: "", type: "Watering" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...form, id: Date.now() });
    setForm({ text: "", date: "", type: "Watering" });
  };

  return (
    <form className="reminder-form" onSubmit={handleSubmit}>
      <h3>Set a Reminder</h3>
      <div className="form-group">
        <label htmlFor="text">Reminder</label>
        <input
          type="text"
          name="text"
          id="text"
          value={form.text}
          onChange={handleChange}
          placeholder="e.g. Water Aloe Vera"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          name="date"
          id="date"
          value={form.date}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="type">Type</label>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          required
        >
          <option value="Watering">Watering</option>
          <option value="Fertilizing">Fertilizing</option>
          <option value="Repotting">Repotting</option>
        </select>
      </div>
      <button type="submit" className="btn">
        Add Reminder
      </button>
    </form>
  );
};

export default ReminderForm;

