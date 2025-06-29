from app.main import create_app
from app import db
from app.models import User

app = create_app()

with app.app_context():
    if User.query.filter_by(username='admin').first() is None:
        admin = User(username='admin')
        admin.set_password('secret')
        db.session.add(admin)
        db.session.commit()
        print("Admin user created successfully.")
    else:
        print("Admin user already exists.")
