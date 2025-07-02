from datetime import datetime
from extensions import db

class Plant(db.Model):
    __tablename__ = 'plants'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    species = db.Column(db.String(255))
    watering_frequency = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
