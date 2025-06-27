import React from 'react';
import PlantCard from './PlantCard';

const PlantList = ({ plants, deletePlant }) => {
  return (
    <div>
      <h2>Plant List</h2>
      {plants.length === 0 ? (
        <p>No plants available.</p>
      ) : (
        plants.map((plant) => (
          <div key={plant.id} style={styles.plantContainer}>
            <PlantCard plant={plant} />
            <button
              onClick={() => deletePlant(plant.id)}
              style={styles.deleteButton}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  plantContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
  },
  deleteButton: {
    backgroundColor: '#d32f2f',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '6px 12px',
    cursor: 'pointer',
  },
};

export default PlantList;
