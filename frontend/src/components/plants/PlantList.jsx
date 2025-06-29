import { useState } from "react";
import PlantCard from "./PlantCard";
import PlantForm from "./PlantForm";
import "../../styles/PlantList.css";

const PlantList = () => {
  const [plants, setPlants] = useState([]);
  const [editing, setEditing] = useState(null);

  const handleAddOrUpdate = (plant) => {
    if (plant.id) {
      setPlants(plants.map((p) => (p.id === plant.id ? plant : p)));
    } else {
      plant.id = Date.now();
      setPlants([...plants, plant]);
    }
    setEditing(null);
  };

  const handleDelete = (id) => {
    setPlants(plants.filter((p) => p.id !== id));
  };

  return (
    <div className="plant-list-container">
      <PlantForm onSubmit={handleAddOrUpdate} selectedPlant={editing} />
      <div className="plant-grid">
        {plants.map((plant) => (
          <PlantCard
            key={plant.id}
            plant={plant}
            onEdit={setEditing}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default PlantList;

