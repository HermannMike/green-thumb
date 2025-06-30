-- Create the database
CREATE DATABASE green_thumb_db;

-- Connect to the database
\c green_thumb_db;

-- Create the users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the plants table
CREATE TABLE plants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the reminders table
CREATE TABLE reminders (
    id SERIAL PRIMARY KEY,
    task VARCHAR(255) NOT NULL,
    due_date TIMESTAMP NOT NULL,
    plant_id INT NOT NULL REFERENCES plants(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);