from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import os

from .routes.auth import auth_bp
from .routes.reminders import reminders_bp
from .routes.plants import plants_bp

from . import db, migrate

def create_app():
    app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
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
        return app.send_static_file('index.html')

    @app.route('/<path:path>')
    def static_proxy(path):
        file_path = os.path.join(app.static_folder, path)
        if os.path.exists(file_path):
            return send_from_directory(app.static_folder, path)
        else:
            return app.send_static_file('index.html')

    @app.route('/test', methods=['GET'])
    def test():
        return jsonify({"message": "Test route working"})

    return app
