from flask import Blueprint, request, jsonify
from ..services.auth_service import register, login

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    token, err = register(data['username'], data['password'])
    if err:
        return jsonify({'error': err}), 400
    return jsonify({'access_token': token}), 201

@auth_bp.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    token, err = login(data['username'], data['password'])
    if err:
        return jsonify({'error': err}), 401
    return jsonify({'access_token': token}), 200
