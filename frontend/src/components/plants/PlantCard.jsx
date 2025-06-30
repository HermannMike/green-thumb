import "../../styles/PlantCard.css";

const PlantCard = ({ plant, onEdit, onDelete }) => ( 
  <div className="plant-card">
    <h3>{plant.name}</h3>
    <p><strong>Type:</strong> {plant.type}</p>
    <p><strong>Last Watered:</strong> {plant.lastWatered}</p>
    <div className="plant-actions">
      <button onClick={() => onEdit(plant)}>Edit</button>
      <button onClick={() => onDelete(plant.id)}>Delete</button>
    </div>
  </div>
);

export default PlantCard;

