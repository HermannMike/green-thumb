import React, { useState } from 'react';

const PlantForm = ({ addPlant }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    addPlant({ name, description, imageUrl });
    setName('');
    setDescription('');
    setImageUrl('');
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Add Plant</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={styles.textarea}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Add Plant</button>
    </form>
  );
};

const styles = {
  form: {
    marginBottom: '30px',
    padding: '20px',
    border: '1px solid #4caf50',
    borderRadius: '8px',
    backgroundColor: '#e8f5e9',
  },
  input: {
    width: '100%',
    padding: '8px 12px',
    marginBottom: '12px',
    borderRadius: '4px',
    border: '1px solid #4caf50',
    fontSize: '1rem',
  },
  textarea: {
    width: '100%',
    padding: '8px 12px',
    marginBottom: '12px',
    borderRadius: '4px',
    border: '1px solid #4caf50',
    fontSize: '1rem',
    minHeight: '60px',
  },
  button: {
    backgroundColor: '#4caf50',
    color: '#fff',
    padding: '10px 16px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
};

export default PlantForm;
