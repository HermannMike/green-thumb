from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models.reminder import Reminder

reminder_bp = Blueprint('reminder_bp', __name__)

@reminder_bp.route('/reminders', methods=['GET'])
@jwt_required()
def get_reminders():
    import logging
    logging.basicConfig(level=logging.DEBUG)
    user = get_jwt_identity()
    logging.debug(f"JWT identity: {user}")
    from flask import request
    logging.debug(f"Authorization header: {request.headers.get('Authorization')}")
    if not user or 'id' not in user:
        return jsonify({'message': 'Invalid or missing JWT identity'}), 401
    try:
        reminders = Reminder.query.filter_by(user_id=user['id']).all()
        result = []
        for reminder in reminders:
            try:
                reminder_date = reminder.reminder_date.isoformat() if reminder.reminder_date else None
            except Exception as e:
                logging.error(f"Error serializing reminder_date for reminder id {reminder.id}: {e}")
                reminder_date = None
            result.append({
                'id': reminder.id,
                'plantId': reminder.plant_id,
                'reminderDate': reminder_date,
                'note': reminder.note
            })
        return jsonify(result)
    except Exception as e:
        logging.error(f"Error fetching reminders for user id {user['id']}: {e}")
        return jsonify({'message': 'Error fetching reminders'}), 500

@reminder_bp.route('/reminders', methods=['POST'])
@jwt_required()
def add_reminder():
    user = get_jwt_identity()
    data = request.get_json()
    # plant_id is now optional
    plant_id = data.get('plantId')
    reminder_date_str = data.get('date') or data.get('reminderDate')
    note = data.get('text') or data.get('note')
    # type field is optional and ignored for now

    if not reminder_date_str:
        return jsonify({'message': 'reminderDate is required'}), 400

    from datetime import datetime
    try:
        reminder_date = datetime.fromisoformat(reminder_date_str)
    except ValueError:
        return jsonify({'message': 'Invalid date format for reminderDate'}), 400

    reminder = Reminder(user_id=user['id'], plant_id=plant_id, reminder_date=reminder_date, note=note)
    db.session.add(reminder)
    db.session.commit()
    return jsonify({
        'id': reminder.id,
        'plantId': reminder.plant_id,
        'reminderDate': reminder.reminder_date.isoformat(),
        'note': reminder.note
    }), 201

@reminder_bp.route('/reminders/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_reminder(id):
    user = get_jwt_identity()
    reminder = Reminder.query.filter_by(id=id, user_id=user['id']).first()
    if not reminder:
        return jsonify({'message': 'Reminder not found'}), 404

    db.session.delete(reminder)
    db.session.commit()
    return '', 204
