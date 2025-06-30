import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// PostgreSQL pool setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/green_thumb',
});

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access token missing' });

  jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret', (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Routes

// New route: Check username availability
app.get('/auth/check_username', async (req, res) => {
  const username = req.query.username;
  if (!username) {
    return res.status(400).json({ message: 'Username parameter is required' });
  }
  try {
    const result = await pool.query('SELECT username FROM users WHERE username = $1', [username]);
    if (result.rows.length > 0) {
      return res.status(200).json({ available: false, message: 'Username is already taken' });
    } else {
      return res.status(200).json({ available: true, message: 'Username is available' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

// Auth - Register
app.post('/auth/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Username and password required' });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
      [username, hashedPassword]
    );
    const user = result.rows[0];
    res.status(201).json({ id: user.id, username: user.username });
  } catch (error) {
    if (error.code === '23505') {
      // Unique violation
      return res.status(409).json({ message: 'Username already exists' });
    }
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Auth - Login
app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Username and password required' });

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || 'your_jwt_secret', {
      expiresIn: '1h',
    });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Plants - Get all plants for user
app.get('/plants', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM plants WHERE user_id = $1', [req.user.id]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Plants - Add a plant
app.post('/plants', authenticateToken, async (req, res) => {
  const { name, species, wateringFrequency } = req.body;
  if (!name) return res.status(400).json({ message: 'Plant name is required' });

  try {
    const result = await pool.query(
      'INSERT INTO plants (user_id, name, species, watering_frequency) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.user.id, name, species || null, wateringFrequency || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Plants - Update a plant
app.put('/plants/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { name, species, wateringFrequency } = req.body;

  try {
    const result = await pool.query(
      'UPDATE plants SET name = $1, species = $2, watering_frequency = $3 WHERE id = $4 AND user_id = $5 RETURNING *',
      [name, species, wateringFrequency, id, req.user.id]
    );
    if (result.rowCount === 0) return res.status(404).json({ message: 'Plant not found' });
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Plants - Delete a plant
app.delete('/plants/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM plants WHERE id = $1 AND user_id = $2', [id, req.user.id]);
    if (result.rowCount === 0) return res.status(404).json({ message: 'Plant not found' });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Reminders - Get all reminders for user
app.get('/reminders', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reminders WHERE user_id = $1', [req.user.id]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Reminders - Add a reminder
app.post('/reminders', authenticateToken, async (req, res) => {
  const { plantId, reminderDate, note } = req.body;
  if (!plantId || !reminderDate) return res.status(400).json({ message: 'plantId and reminderDate are required' });

  try {
    const result = await pool.query(
      'INSERT INTO reminders (user_id, plant_id, reminder_date, note) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.user.id, plantId, reminderDate, note || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Reminders - Delete a reminder
app.delete('/reminders/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM reminders WHERE id = $1 AND user_id = $2', [id, req.user.id]);
    if (result.rowCount === 0) return res.status(404).json({ message: 'Reminder not found' });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
