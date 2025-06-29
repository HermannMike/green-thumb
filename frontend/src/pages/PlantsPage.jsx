import "../styles/PlantsPage.css";
import PlantList from "../components/plants/PlantList";

const PlantsPage = () => {
  return (
    <div className="plants-page">
      <div className="plants-header">
        <h2> My Plants</h2>
        <p>Track all your plants and manage their care schedule easily.</p>
      </div>
      <PlantList />
    </div>
  );
};

export default PlantsPage;
