import { useState, useEffect } from "react";
import "../../styles/PlantForm.css";

const PlantForm = ({ onSubmit, selectedPlant }) => {
  const [form, setForm] = useState({ name: "", type: "", lastWatered: "" });

  useEffect(() => {
    if (selectedPlant) {
      setForm(selectedPlant);
    }
  }, [selectedPlant]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({ name: "", type: "", lastWatered: "" });
  };

  return (
    <form className="plant-form" onSubmit={handleSubmit}>
      <h3>{selectedPlant ? "Edit Plant" : "Add New Plant"}</h3>
      <div className="form-group">
        <label>Plant Name</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Aloe Vera"
          required
        />
      </div>
      <div className="form-group">
        <label>Type</label>
        <input
          type="text"
          name="type"
          value={form.type}
          onChange={handleChange}
          placeholder="e.g. Succulent"
          required
        />
      </div>
      <div className="form-group">
        <label>Last Watered</label>
        <input
          type="date"
          name="lastWatered"
          value={form.lastWatered}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn">
        {selectedPlant ? "Update Plant" : "Add Plant"}
      </button>
    </form>
  );
};

export default PlantForm;

