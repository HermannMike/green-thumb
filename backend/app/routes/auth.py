from flask import Blueprint, request, jsonify
from ..services.auth_service import register, login

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register_user():
    try:
        data = request.get_json()

        email = data.get('email') or data.get('username')  # support both
        password = data.get('password')

        if not email or not password:
            return jsonify({'error': 'Missing email or password'}), 400

        token, err = register(email, password)
        if err:
            return jsonify({'error': err}), 400
        return jsonify({'access_token': token}), 201
    except Exception as e:
        import traceback
        traceback_str = traceback.format_exc()
        print(f"Error in register_user: {traceback_str}")
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login_user():
    try:
        data = request.get_json()

        # ✅ Accept either email or username for login
        identifier = data.get('email') or data.get('username')
        password = data.get('password')

        if not identifier or not password:
            return jsonify({'error': 'Missing email/username or password'}), 400

        token, err = login(identifier, password)
        if err:
            return jsonify({'error': err}), 401
        return jsonify({'access_token': token}), 200
    except Exception as e:
        import traceback
        traceback_str = traceback.format_exc()
        print(f"Error in login_user: {traceback_str}")
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500
