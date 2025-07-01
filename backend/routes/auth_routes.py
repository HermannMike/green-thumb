from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import create_access_token
from extensions import db, bcrypt, jwt
from models.user import User
from sqlalchemy.exc import IntegrityError

auth_bp = Blueprint('auth_bp', __name__)
from sqlalchemy import inspect

def email_column_exists():
    inspector = inspect(db.engine)
    if 'users' not in inspector.get_table_names():
        return False
    columns = [col['name'] for col in inspector.get_columns('users')]
    return 'email' in columns

@auth_bp.route('/auth/register', methods=['POST'])
def register():
    from flask_cors import cross_origin
    @cross_origin(origins=[
        'https://green-thumb12.vercel.app',
        'https://frontend-5sqfnhsa8-sudi67s-projects.vercel.app',
        'https://green-thumb13.vercel.app',
        'https://green-thumb13-o9h4d2xqy-sudi67s-projects.vercel.app',
        'https://green-thumb13-by949yu4s-sudi67s-projects.vercel.app'
    ], supports_credentials=True)
    def inner_register():
        import logging
        logging.info("Received registration request")
        data = request.get_json()
        logging.info(f"Request data: {data}")
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        if not username or not password:
            logging.warning("Username or password missing in request")
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
            logging.info(f"User registered successfully: {response}")
            return jsonify(response), 201
        except IntegrityError as e:
            db.session.rollback()
            logging.error(f"IntegrityError during registration: {e}")
            if 'username' in str(e.orig):
                return jsonify({'message': 'Username already exists. Please choose a different username.'}), 409
            elif 'email' in str(e.orig):
                return jsonify({'message': 'Email already exists. Please use a different email.'}), 409
            else:
                return jsonify({'message': 'Integrity error', 'error': str(e)}), 409
        except Exception as e:
            import traceback
            traceback.print_exc()
            logging.error(f"Exception during registration: {e}")
            return jsonify({'message': 'Server error', 'error': str(e)}), 500
    return inner_register()

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
