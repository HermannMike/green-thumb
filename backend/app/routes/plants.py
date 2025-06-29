from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import Plant

plants_bp = Blueprint('plants', __name__)

@plants_bp.route('/', methods=['GET'], strict_slashes=False)
@jwt_required()
def get_plants():
    user_id = get_jwt_identity()
    plants = Plant.query.filter_by(user_id=user_id).all()
    return jsonify([{
        'id': p.id,
        'name': p.name,
        'description': p.description,
        'image_url': p.image_url
    } for p in plants])

@plants_bp.route('/', methods=['POST'], strict_slashes=False)
@jwt_required()
def add_plant():
    data = request.get_json()
    plant = Plant(
        name=data['name'],
        description=data.get('description'),
        image_url=data.get('image_url'),
        user_id=get_jwt_identity()
    )
    db.session.add(plant)
    db.session.commit()
    return jsonify({'id': plant.id}), 201

@plants_bp.route('/<int:id>', methods=['GET'])
@jwt_required()
def get_plant(id):
    user_id = get_jwt_identity()
    plant = Plant.query.filter_by(id=id, user_id=user_id).first_or_404()
    return jsonify({
        'id': plant.id,
        'name': plant.name,
        'description': plant.description,
        'image_url': plant.image_url
    })

@plants_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_plant(id):
    user_id = get_jwt_identity()
    plant = Plant.query.filter_by(id=id, user_id=user_id).first_or_404()
    data = request.get_json()
    plant.name = data['name']
    plant.description = data.get('description')
    plant.image_url = data.get('image_url')
    db.session.commit()
    return jsonify({'message': 'Plant updated'})

@plants_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_plant(id):
    user_id = get_jwt_identity()
    plant = Plant.query.filter_by(id=id, user_id=user_id).first_or_404()
    db.session.delete(plant)
    db.session.commit()
    return jsonify({'message': 'Plant deleted'})
