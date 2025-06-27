import React, { useState } from 'react';
import { signup } from '../services/auth';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signup({ username, password });
    setMessage(response.message);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Sign Up for GreenThumb</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            style={styles.input}
            placeholder="Choose a username"
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={styles.input}
            placeholder="Create a password"
          />
        </div>
        <button type="submit" style={styles.button}>Sign Up</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '30px',
    borderRadius: '15px',
    background: 'linear-gradient(135deg, #81c784, #4caf50)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
    color: '#fff',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    animation: 'fadeIn 1s ease-in-out',
  },
  title: {
    textAlign: 'center',
    marginBottom: '25px',
    fontSize: '2rem',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    fontSize: '1.1rem',
  },
  input: {
    width: '100%',
    padding: '10px 15px',
    borderRadius: '8px',
    border: 'none',
    fontSize: '1rem',
    outline: 'none',
    boxShadow: 'inset 0 0 5px rgba(0,0,0,0.2)',
  },
  button: {
    padding: '12px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#2e7d32',
    color: '#fff',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  message: {
    marginTop: '20px',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: '1rem',
    textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
  },
};

export default RegisterForm;
