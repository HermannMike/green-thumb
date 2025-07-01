from flask import Flask
from extensions import db, bcrypt, jwt, cors

app = Flask(__name__, static_url_path='', static_folder='static')
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost:5432/green_thumb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret'

app.config['CORS_ORIGINS'] = ['https://green-thumb12.vercel.app']

db.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)
cors.init_app(app, resources={r"/*": {"origins": app.config['CORS_ORIGINS']}})

import logging
import traceback
from flask import jsonify, send_from_directory

@app.errorhandler(Exception)
def handle_exception(e):
    logging.error(f"Unhandled exception: {e}")
    logging.error(traceback.format_exc())
    return jsonify({'message': 'Internal server error'}), 500

@app.route('/')
def index():
    return "Welcome to the Green Thumb API"

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(app.static_folder, 'favicon.ico')

import models.user
import models.plant
import models.reminder

import routes.auth_routes as auth_routes
import routes.plant_routes as plant_routes
import routes.reminder_routes as reminder_routes

app.register_blueprint(auth_routes.auth_bp)
app.register_blueprint(plant_routes.plant_bp)
app.register_blueprint(reminder_routes.reminder_bp)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
