#!/usr/bin/env python3
"""
Test script to verify PostgreSQL connection and API functionality
"""
import requests
import json

BASE_URL = "http://localhost:5000"

def test_login():
    """Test user login"""
    response = requests.post(f"{BASE_URL}/api/auth/login", 
                           json={"username": "testuser1", "password": "password123"})
    if response.status_code == 200:
        token = response.json()["access_token"]
        print("✅ Login successful")
        return token
    else:
        print("❌ Login failed")
        return None

def test_plants(token):
    """Test plants endpoint"""
    headers = {"Authorization": f"Bearer {token}"}
    
    # Get plants
    response = requests.get(f"{BASE_URL}/api/plants/", headers=headers)
    if response.status_code == 200:
        plants = response.json()
        print(f"✅ Plants retrieved: {len(plants)} plants found")
        return plants
    else:
        print("❌ Failed to get plants")
        return []

def test_reminders(token):
    """Test reminders endpoint"""
    headers = {"Authorization": f"Bearer {token}"}
    
    # Get reminders
    response = requests.get(f"{BASE_URL}/api/reminders/", headers=headers)
    if response.status_code == 200:
        reminders = response.json()
        print(f"✅ Reminders retrieved: {len(reminders)} reminders found")
        return reminders
    else:
        print("❌ Failed to get reminders")
        return []

def test_add_reminder(token, plant_id):
    """Test adding a new reminder"""
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    
    reminder_data = {
        "task": "Test reminder from script",
        "due_date": "2024-07-03T15:00:00",
        "plant_id": plant_id
    }
    
    response = requests.post(f"{BASE_URL}/api/reminders/", 
                           headers=headers, 
                           json=reminder_data)
    
    if response.status_code == 201:
        reminder_id = response.json()["id"]
        print(f"✅ Reminder created successfully with ID: {reminder_id}")
        return reminder_id
    else:
        print(f"❌ Failed to create reminder: {response.status_code}")
        return None

def main():
    print("🧪 Testing PostgreSQL Connection and API Functionality")
    print("=" * 60)
    
    # Test login
    token = test_login()
    if not token:
        return
    
    # Test plants
    plants = test_plants(token)
    
    # Test reminders
    reminders = test_reminders(token)
    
    # Test adding a reminder if we have plants
    if plants:
        plant_id = plants[0]["id"]
        test_add_reminder(token, plant_id)
        
        # Get reminders again to verify
        print("\n📋 Final reminder count:")
        test_reminders(token)
    
    print("\n🎉 All tests completed!")

if __name__ == "__main__":
    main()
