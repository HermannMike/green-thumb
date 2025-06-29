#!/usr/bin/env python3

import requests
import json
from datetime import datetime, timedelta

# Test the reminder functionality with proper authentication
def test_reminder_functionality():
    base_url = "http://localhost:5000/api"
    
    print("🧪 Testing Reminder Functionality Fix")
    print("=" * 50)
    
    # Step 1: Login to get fresh token
    print("1. Logging in...")
    login_data = {
        "username": "testuser1",
        "password": "password123"
    }
    
    response = requests.post(f"{base_url}/auth/login", json=login_data)
    if response.status_code != 200:
        print(f"❌ Login failed: {response.text}")
        return
    
    token = response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    print("✅ Login successful")
    
    # Step 2: Get plants to find a valid plant_id
    print("2. Getting plants...")
    response = requests.get(f"{base_url}/plants/", headers=headers)
    if response.status_code != 200:
        print(f"❌ Failed to get plants: {response.text}")
        return
    
    plants = response.json()
    if not plants:
        print("❌ No plants found")
        return
    
    plant_id = plants[0]["id"]
    print(f"✅ Found plant with ID: {plant_id}")
    
    # Step 3: Create a reminder with proper date format
    print("3. Creating reminder...")
    future_date = datetime.now() + timedelta(days=1)
    reminder_data = {
        "task": "Test reminder from script",
        "due_date": future_date.isoformat(),
        "plant_id": plant_id
    }
    
    response = requests.post(f"{base_url}/reminders/", json=reminder_data, headers=headers)
    if response.status_code != 201:
        print(f"❌ Failed to create reminder: {response.status_code} - {response.text}")
        return
    
    reminder_id = response.json()["id"]
    print(f"✅ Reminder created with ID: {reminder_id}")
    
    # Step 4: Verify reminder was created
    print("4. Verifying reminder...")
    response = requests.get(f"{base_url}/reminders/", headers=headers)
    if response.status_code != 200:
        print(f"❌ Failed to get reminders: {response.text}")
        return
    
    reminders = response.json()
    created_reminder = next((r for r in reminders if r["id"] == reminder_id), None)
    
    if created_reminder:
        print(f"✅ Reminder verified: {created_reminder['task']}")
        print(f"   Due date: {created_reminder['due_date']}")
        print(f"   Plant ID: {created_reminder['plant_id']}")
    else:
        print("❌ Reminder not found in list")
        return
    
    print("\n🎉 All reminder tests passed!")
    print("\nThe issue might be with frontend token management.")
    print("Suggestions:")
    print("1. Check if token expires quickly")
    print("2. Verify frontend is sending correct Authorization header")
    print("3. Check browser console for detailed error messages")

if __name__ == "__main__":
    test_reminder_functionality()
