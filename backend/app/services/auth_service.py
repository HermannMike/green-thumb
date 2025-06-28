from ..models.user import User
from app.main import db
from flask_jwt_extended import create_access_token

def register(username, password):
    if User.query.filter_by(username=username).first():
        return None, 'Username already taken'
    user = User(username=username)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    token = create_access_token(identity=user.id)
    return token, None

def login(username, password):
    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        token = create_access_token(identity=user.id)
        return token, None
    return None, 'Invalid credentials'
