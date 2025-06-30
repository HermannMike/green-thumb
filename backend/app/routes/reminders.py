from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import Reminder, Plant
from datetime import datetime

reminders_bp = Blueprint('reminders', __name__)

@reminders_bp.route('/', methods=['GET'], strict_slashes=False)
@jwt_required()
def get_reminders():
    user_id = get_jwt_identity()
    reminders = Reminder.query.filter(Reminder.plant_name.in_(
        db.session.query(Plant.name).filter(Plant.user_id == user_id)
    )).all()
    return jsonify([{
        'id': r.id,
        'task': r.task,
        'due_date': r.due_date.isoformat(),
        'plant_name': r.plant_name,
        'plant_image_url': Plant.query.filter_by(name=r.plant_name).first().image_url if Plant.query.filter_by(name=r.plant_name).first() else None
    } for r in reminders])

@reminders_bp.route('/', methods=['POST'], strict_slashes=False)
@jwt_required()
def add_reminder():
    data = request.get_json()
    plant = Plant.query.filter_by(name=data['plant_name'], user_id=get_jwt_identity()).first_or_404()
    reminder = Reminder(
        task=data['task'],
        due_date=datetime.fromisoformat(data['due_date']),
        plant_id=plant.id,
        plant_name=plant.name
    )
    db.session.add(reminder)
    db.session.commit()
    return jsonify({'id': reminder.id}), 201

@reminders_bp.route('/test', methods=['POST'])
def test_post():
    return jsonify({"message": "Test POST route working"}), 200

@reminders_bp.route('/<int:id>', methods=['PUT', 'DELETE'])
@jwt_required()
def update_or_delete_reminder(id):
    user_id = get_jwt_identity()
    reminder = Reminder.query.filter_by(id=id).first_or_404()
    plant = Plant.query.filter_by(name=reminder.plant_name, user_id=user_id).first_or_404()

    if request.method == 'PUT':
        data = request.get_json()
        reminder.task = data['task']
        reminder.due_date = datetime.fromisoformat(data['due_date'])
        db.session.commit()
        return jsonify({'message': 'Reminder updated'})

    if request.method == 'DELETE':
        db.session.delete(reminder)
        db.session.commit()
        return jsonify({'message': 'Reminder deleted'})
