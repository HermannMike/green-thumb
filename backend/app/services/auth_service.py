from app.models import User
from app import db
from flask_jwt_extended import create_access_token

def register(username, password):
    try:
        if User.query.filter_by(username=username).first():
            return None, 'Username already taken'
        user = User(username=username)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()
        token = create_access_token(identity=user.id)
        return token, None
    except Exception as e:
        import traceback
        traceback_str = traceback.format_exc()
        print(f"Error in register function: {traceback_str}")
        db.session.rollback()
        return None, 'Internal server error'

def login(username, password):
    try:
        user = User.query.filter_by(username=username).first()
        if user and user.check_password(password):
            token = create_access_token(identity=user.id)
            return token, None
        return None, 'Invalid credentials'
    except Exception as e:
        import traceback
        traceback_str = traceback.format_exc()
        print(f"Error in login function: {traceback_str}")
        return None, 'Internal server error'
