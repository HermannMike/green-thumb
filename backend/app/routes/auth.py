from flask import Blueprint, request, jsonify
from ..services.auth_service import register, login

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register_user():
    try:
        data = request.get_json()
        token, err = register(data['username'], data['password'])
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
        token, err = login(data['username'], data['password'])
        if err:
            return jsonify({'error': err}), 401
        return jsonify({'access_token': token}), 200
    except Exception as e:
        import traceback
        traceback_str = traceback.format_exc()
        print(f"Error in login_user: {traceback_str}")
        return jsonify({'error': 'Internal server error', 'details': str(e)}), 500
