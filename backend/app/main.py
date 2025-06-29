from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from .routes.auth import auth_bp
from .routes.reminders import reminders_bp
from .routes.plants import plants_bp

from . import db, migrate

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config.from_object('app.config.Config')

    db.init_app(app)
    migrate.init_app(app, db)

    jwt = JWTManager(app)

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(reminders_bp, url_prefix='/api/reminders')
    app.register_blueprint(plants_bp, url_prefix='/api/plants')

    @app.route('/')
    def index():
        return jsonify({"message": "Welcome to the simplified GreenThumb API"})

    @app.route('/test', methods=['GET'])
    def test():
        return jsonify({"message": "Test route working"})

    return app
