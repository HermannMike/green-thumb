import json
from datetime import datetime
from app.main import create_app
from app import db
from app.models import User, Plant, Reminder

def migrate_data():
    app = create_app()
    
    with app.app_context():
        # Read data from db.json
        with open('db.json', 'r') as f:
            data = json.load(f)
        
        # Migrate users with proper password hashing
        user_mapping = {}
        for user_data in data.get('users', []):
            existing_user = User.query.filter_by(username=user_data['username']).first()
            if not existing_user:
                user = User(username=user_data['username'])
                # Set a default password for testing
                user.set_password('password123')
                db.session.add(user)
                db.session.flush()  # Flush to get the ID
                user_mapping[user_data['id']] = user.id
                print(f"Added user: {user.username} with default password: password123")
            else:
                user_mapping[user_data['id']] = existing_user.id
        
        db.session.commit()
        
        # Migrate plants
        plant_mapping = {}
        for plant_data in data.get('plants', []):
            new_user_id = user_mapping.get(plant_data['user_id'])
            if new_user_id:
                existing_plant = Plant.query.filter_by(name=plant_data['name'], user_id=new_user_id).first()
                if not existing_plant:
                    plant = Plant(
                        name=plant_data['name'],
                        description=plant_data.get('description'),
                        image_url=plant_data.get('image_url'),
                        user_id=new_user_id
                    )
                    db.session.add(plant)
                    db.session.flush()  # Flush to get the ID
                    plant_mapping[plant_data['id']] = plant.id
                    print(f"Added plant: {plant.name}")
                else:
                    plant_mapping[plant_data['id']] = existing_plant.id
        
        db.session.commit()
        
        # Migrate reminders
        for reminder_data in data.get('reminders', []):
            new_plant_id = plant_mapping.get(reminder_data['plant_id'])
            if new_plant_id:
                due_date = datetime.fromisoformat(reminder_data['due_date'].replace('Z', '+00:00'))
                existing_reminder = Reminder.query.filter_by(
                    task=reminder_data['task'], 
                    plant_id=new_plant_id
                ).first()
                if not existing_reminder:
                    reminder = Reminder(
                        task=reminder_data['task'],
                        due_date=due_date,
                        plant_id=new_plant_id
                    )
                    db.session.add(reminder)
                    print(f"Added reminder: {reminder.task}")
        
        db.session.commit()
        print("Data migration completed successfully!")

if __name__ == '__main__':
    migrate_data()
