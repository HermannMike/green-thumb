from flask import Flask, jsonify, request
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

    @app.route('/plants')
    def plants():
        return jsonify([
            {"id": 1, "name": "Aloe Vera", "needsWatering": False},
            {"id": 2, "name": "Snake Plant", "needsWatering": True},
        ])

    @app.route('/auth/login', methods=['POST'])
    def login():
         data = request.get_json(force=True, silent=True)
         if not data:
           return jsonify({"error": "Missing JSON data"}), 400

         username = data.get('username')
         password = data.get('password')

         if not username or not password:
            return jsonify({"error": "Username and password are required"}), 400

    # Placeholder logic for demonstration — replace with actual user validation
         if username == 'admin' and password == 'secret':
            return jsonify({"message": "Login successful", "token": "fake-jwt-token"})
         else:
            return jsonify({"error": "Invalid credentials"}), 401


    return app
