from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

from . import db, migrate

from flask_jwt_extended import JWTManager

def create_app(config_object=None):
    app = Flask(__name__)
    CORS(app)

    if config_object:
        app.config.from_object(config_object)
    else:
        app.config.from_object('backend.app.config.Config')

    # Disable strict slashes to allow routes with or without trailing slash
    app.url_map.strict_slashes = False

    db.init_app(app)
    migrate.init_app(app, db)

    jwt = JWTManager(app)

    from backend.app.routes.reminders import reminders_bp
    app.register_blueprint(reminders_bp, url_prefix='/api/reminders')

    from backend.app.routes.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    @app.route('/')
    def index():
        return jsonify({"message": "Welcome to the API"})

    return app
