from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config.from_object('app.config.Config')

    db.init_app(app)
    migrate.init_app(app, db)

    @app.route('/')
    def index():
        return jsonify({"message": "Welcome to the API"})

    @app.route('/reminders')
    def reminders():
        return jsonify([
            {"id": 1, "title": "Water the plants"},
            {"id": 2, "title": "Feed the cat"}
        ])

    return app
