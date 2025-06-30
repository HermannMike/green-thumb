-- SQLite migration to make plant_id nullable in reminders table

BEGIN TRANSACTION;

CREATE TABLE reminders_new (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    plant_id INTEGER,
    reminder_date DATETIME NOT NULL,
    note TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(plant_id) REFERENCES plants(id)
);

INSERT INTO reminders_new (id, user_id, plant_id, reminder_date, note, created_at)
SELECT id, user_id, plant_id, reminder_date, note, created_at FROM reminders;

DROP TABLE reminders;

ALTER TABLE reminders_new RENAME TO reminders;

COMMIT;
