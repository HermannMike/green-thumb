import React, { useState } from 'react';

const PlantCard = ({ plant }) => {
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    card: {
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      margin: '8px',
      maxWidth: '200px',
      boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.2)' : '0 2px 5px rgba(0,0,0,0.1)',
      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
      transition: 'transform 0.3s, box-shadow 0.3s',
      cursor: 'pointer',
    },
    image: {
      width: '100%',
      height: 'auto',
      borderRadius: '4px',
    },
    name: {
      fontSize: '1.2em',
      margin: '12px 0 8px 0',
    },
    description: {
      fontSize: '0.9em',
      color: '#555',
    },
  };

  return (
    <div
      style={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={plant.image} alt={plant.name} style={styles.image} />
      <h3 style={styles.name}>{plant.name}</h3>
      <p style={styles.description}>{plant.description}</p>
    </div>
  );
};

export default PlantCard;
