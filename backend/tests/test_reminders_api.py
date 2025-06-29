import pytest
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../backend')))

from app.main import create_app, db
from app.models import Reminder, User
from flask import json

class TestConfig:
    TESTING = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"
    JWT_SECRET_KEY = "test-secret-key"

@pytest.fixture
def app():
    app = create_app(TestConfig)
    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture
def user(app):
    # Adjusted to match User model constructor parameters
    with app.app_context():
        user = User(username="testuser")
        user.set_password("password")
        db.session.add(user)
        db.session.commit()
    return user

from flask_jwt_extended import create_access_token
from datetime import datetime

def test_create_reminder(client, user, app):
    with app.app_context():
        user = db.session.merge(user)
        token = create_access_token(identity=user.id)
        # Create a plant for the user to associate with the reminder
        from app.models import Plant
        plant = Plant(name="Test Plant", user_id=user.id)
        db.session.add(plant)
        db.session.commit()
        data = {
            "task": "Test Reminder",
            "due_date": datetime(2024, 12, 31, 23, 59, 59).isoformat(),
            "plant_id": plant.id
        }
        response = client.post("/api/reminders", json=data, headers={"Authorization": f"Bearer {token}"})
        assert response.status_code == 201
        json_data = json.loads(response.data)
        assert "id" in json_data

def test_get_reminders(client, user, app):
    with app.app_context():
        user = db.session.merge(user)
        token = create_access_token(identity=user.id)
        from app.models import Plant
        plant = Plant(name="Test Plant", user_id=user.id)
        db.session.add(plant)
        db.session.commit()
        reminder = Reminder(task="Reminder 1", due_date=datetime(2024, 12, 31, 23, 59, 59), plant_id=plant.id)
        db.session.add(reminder)
        db.session.commit()

        response = client.get("/api/reminders", headers={"Authorization": f"Bearer {token}"})
        assert response.status_code == 200
        json_data = json.loads(response.data)
        assert len(json_data) > 0

def test_update_reminder(client, user, app):
    with app.app_context():
        user = db.session.merge(user)
        token = create_access_token(identity=user.id)
        from app.models import Plant
        plant = Plant(name="Test Plant", user_id=user.id)
        db.session.add(plant)
        db.session.commit()
        reminder = Reminder(task="Old Title", due_date=datetime(2024, 12, 31, 23, 59, 59), plant_id=plant.id)
        db.session.add(reminder)
        db.session.commit()

        update_data = {
            "task": "New Title",
            "due_date": datetime(2025, 1, 1, 12, 0, 0).isoformat()
        }
        response = client.put(f"/api/reminders/{reminder.id}", json=update_data, headers={"Authorization": f"Bearer {token}"})
        assert response.status_code == 200
        json_data = json.loads(response.data)
        assert json_data["message"] == "Reminder updated"

def test_delete_reminder(client, user, app):
    with app.app_context():
        user = db.session.merge(user)
        token = create_access_token(identity=user.id)
        from app.models import Plant
        plant = Plant(name="Test Plant", user_id=user.id)
        db.session.add(plant)
        db.session.commit()
        reminder = Reminder(task="To Delete", due_date=datetime(2024, 12, 31, 23, 59, 59), plant_id=plant.id)
        db.session.add(reminder)
        db.session.commit()

        response = client.delete(f"/api/reminders/{reminder.id}", headers={"Authorization": f"Bearer {token}"})
        assert response.status_code == 200
        json_data = json.loads(response.data)
        assert json_data["message"] == "Reminder deleted"
        # Verify deletion
        deleted = Reminder.query.get(reminder.id)
        assert deleted is None
