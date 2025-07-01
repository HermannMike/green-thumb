-- Migration to make plant_id nullable in reminders table
ALTER TABLE reminders ALTER COLUMN plant_id DROP NOT NULL;
