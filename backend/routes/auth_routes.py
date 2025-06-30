from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
import app
from models.user import User
from sqlalchemy.exc import IntegrityError

db = app.db
bcrypt = app.bcrypt
jwt = app.jwt

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/auth/check_username', methods=['GET'])
def check_username():
    username = request.args.get('username')
    if not username:
        return jsonify({'message': 'Username parameter is required'}), 400
    # Query only username column to avoid email column error
    user = User.query.with_entities(User.username).filter_by(username=username).first()
    if user:
        return jsonify({'available': False, 'message': 'Username is already taken'}), 200
    else:
        return jsonify({'available': True, 'message': 'Username is available'}), 200

from sqlalchemy import inspect

def email_column_exists():
    inspector = inspect(db.engine)
    columns = [col['name'] for col in inspector.get_columns('users')]
    return 'email' in columns

@auth_bp.route('/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    if not username or not password:
        return jsonify({'message': 'Username and password required'}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    try:
        if email_column_exists() and email:
            new_user = User(username=username, password=hashed_password, email=email)
        else:
            new_user = User(username=username, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        response = {'id': new_user.id, 'username': new_user.username}
        if email_column_exists():
            response['email'] = getattr(new_user, 'email', None)
        return jsonify(response), 201
    except IntegrityError as e:
        db.session.rollback()
        if 'username' in str(e.orig):
            return jsonify({'message': 'Username already exists. Please choose a different username.'}), 409
        elif 'email' in str(e.orig):
            return jsonify({'message': 'Email already exists. Please use a different email.'}), 409
        else:
            return jsonify({'message': 'Integrity error', 'error': str(e)}), 409
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'message': 'Server error', 'error': str(e)}), 500

@auth_bp.route('/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'message': 'Username and password required'}), 400

    user = User.query.filter_by(username=username).first()
    if not user or not bcrypt.check_password_hash(user.password, password):
        return jsonify({'message': 'Invalid credentials'}), 401

    access_token = create_access_token(identity={'id': user.id, 'username': user.username})
    return jsonify({'token': access_token})
