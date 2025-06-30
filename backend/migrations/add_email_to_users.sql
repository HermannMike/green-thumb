-- Migration script to add email column to users table
ALTER TABLE users ADD COLUMN email VARCHAR(255) UNIQUE NOT NULL;
