import React, { useState, useEffect } from 'react';
import PlantList from '../components/plants/PlantList';
import PlantForm from '../components/plants/PlantForm';

const PlantsPage = () => {
  const [plants, setPlants] = useState(() => {
    const saved = localStorage.getItem('plants');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        name: 'Aloe Vera',
        description: 'A succulent plant species of the genus Aloe.',
        imageUrl: 'https://via.placeholder.com/150?text=Aloe+Vera',
      },
      {
        id: 2,
        name: 'Snake Plant',
        description: 'A species of flowering plant in the family Asparagaceae.',
        imageUrl: 'https://via.placeholder.com/150?text=Snake+Plant',
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('plants', JSON.stringify(plants));
  }, [plants]);

  const addPlant = (plant) => {
    setPlants((prevPlants) => [
      ...prevPlants,
      { ...plant, id: prevPlants.length + 1 },
    ]);
  };

  const deletePlant = (id) => {
    setPlants((prevPlants) => prevPlants.filter(p => p.id !== id));
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Plants</h1>
      <PlantForm addPlant={addPlant} />
      <PlantList plants={plants} deletePlant={deletePlant} />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '960px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '30px',
  },
};

export default PlantsPage;
