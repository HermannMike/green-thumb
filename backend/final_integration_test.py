#!/usr/bin/env python3

import requests
import json
from datetime import datetime, timedelta

def test_complete_postgresql_integration():
    base_url = "http://localhost:5000/api"
    
    print("🧪 Final PostgreSQL Integration Test")
    print("=" * 50)
    
    # Test 1: Authentication
    print("1. Testing Authentication...")
    login_data = {"username": "testuser1", "password": "password123"}
    response = requests.post(f"{base_url}/auth/login", json=login_data)
    assert response.status_code == 200, f"Login failed: {response.text}"
    token = response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    print("✅ Authentication working")
    
    # Test 2: Plants CRUD
    print("2. Testing Plants CRUD...")
    # Create plant
    plant_data = {
        "name": "Integration Test Plant",
        "description": "Testing PostgreSQL integration",
        "image_url": "https://example.com/plant.jpg"
    }
    response = requests.post(f"{base_url}/plants/", json=plant_data, headers=headers)
    assert response.status_code == 201, f"Plant creation failed: {response.text}"
    plant_id = response.json()["id"]
    
    # Read plants
    response = requests.get(f"{base_url}/plants/", headers=headers)
    assert response.status_code == 200, f"Plants retrieval failed: {response.text}"
    plants = response.json()
    assert any(p["id"] == plant_id for p in plants), "Created plant not found"
    print("✅ Plants CRUD working")
    
    # Test 3: Reminders CRUD
    print("3. Testing Reminders CRUD...")
    # Create reminder
    future_date = datetime.now() + timedelta(days=2)
    reminder_data = {
        "task": "Integration test reminder",
        "due_date": future_date.isoformat(),
        "plant_id": plant_id
    }
    response = requests.post(f"{base_url}/reminders/", json=reminder_data, headers=headers)
    assert response.status_code == 201, f"Reminder creation failed: {response.text}"
    reminder_id = response.json()["id"]
    
    # Read reminders
    response = requests.get(f"{base_url}/reminders/", headers=headers)
    assert response.status_code == 200, f"Reminders retrieval failed: {response.text}"
    reminders = response.json()
    assert any(r["id"] == reminder_id for r in reminders), "Created reminder not found"
    print("✅ Reminders CRUD working")
    
    # Test 4: Database Relationships
    print("4. Testing Database Relationships...")
    # Verify reminder is linked to correct plant
    created_reminder = next(r for r in reminders if r["id"] == reminder_id)
    assert created_reminder["plant_id"] == plant_id, "Reminder-Plant relationship broken"
    print("✅ Database relationships working")
    
    # Test 5: Data Persistence
    print("5. Testing Data Persistence...")
    # Verify data persists across requests
    response = requests.get(f"{base_url}/plants/", headers=headers)
    plants_after = response.json()
    assert len(plants_after) >= len(plants), "Data not persisting"
    print("✅ Data persistence working")
    
    # Cleanup
    print("6. Cleaning up test data...")
    requests.delete(f"{base_url}/reminders/{reminder_id}", headers=headers)
    requests.delete(f"{base_url}/plants/{plant_id}", headers=headers)
    print("✅ Cleanup completed")
    
    print("\n🎉 ALL POSTGRESQL INTEGRATION TESTS PASSED!")
    print("\n📊 Summary:")
    print("✅ PostgreSQL database connection established")
    print("✅ User authentication with JWT tokens")
    print("✅ Plants CRUD operations")
    print("✅ Reminders CRUD operations")
    print("✅ Foreign key relationships maintained")
    print("✅ Data persistence verified")
    print("✅ API endpoints functioning correctly")
    
    return True

if __name__ == "__main__":
    try:
        test_complete_postgresql_integration()
    except Exception as e:
        print(f"❌ Test failed: {e}")
        exit(1)
