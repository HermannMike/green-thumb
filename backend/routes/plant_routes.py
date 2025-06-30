from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
import app
from models.plant import Plant

db = app.db

plant_bp = Blueprint('plant_bp', __name__)

@plant_bp.route('/plants', methods=['GET'])
@jwt_required()
def get_plants():
    user = get_jwt_identity()
    plants = Plant.query.filter_by(user_id=user['id']).all()
    return jsonify([{
        'id': plant.id,
        'name': plant.name,
        'species': plant.species,
        'wateringFrequency': plant.watering_frequency
    } for plant in plants])

@plant_bp.route('/plants', methods=['POST'])
@jwt_required()
def add_plant():
    user = get_jwt_identity()
    data = request.get_json()
    name = data.get('name')
    species = data.get('species')
    watering_frequency = data.get('wateringFrequency')

    if not name:
        return jsonify({'message': 'Plant name is required'}), 400

    plant = Plant(user_id=user['id'], name=name, species=species, watering_frequency=watering_frequency)
    db.session.add(plant)
    db.session.commit()
    return jsonify({
        'id': plant.id,
        'name': plant.name,
        'species': plant.species,
        'wateringFrequency': plant.watering_frequency
    }), 201

@plant_bp.route('/plants/<int:id>', methods=['PUT'])
@jwt_required()
def update_plant(id):
    user = get_jwt_identity()
    plant = Plant.query.filter_by(id=id, user_id=user['id']).first()
    if not plant:
        return jsonify({'message': 'Plant not found'}), 404

    data = request.get_json()
    plant.name = data.get('name', plant.name)
    plant.species = data.get('species', plant.species)
    plant.watering_frequency = data.get('wateringFrequency', plant.watering_frequency)
    db.session.commit()
    return jsonify({
        'id': plant.id,
        'name': plant.name,
        'species': plant.species,
        'wateringFrequency': plant.watering_frequency
    })

@plant_bp.route('/plants/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_plant(id):
    user = get_jwt_identity()
    plant = Plant.query.filter_by(id=id, user_id=user['id']).first()
    if not plant:
        return jsonify({'message': 'Plant not found'}), 404

    db.session.delete(plant)
    db.session.commit()
    return '', 204
