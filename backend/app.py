from flask import Flask
from extensions import db, bcrypt, jwt, cors

app = Flask(__name__, static_url_path='', static_folder='static')
import os

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://green_thumb_user:StHbRSOhRLCjYqoo5z94vaB1bBjb6tQI@dpg-d1ikcoer433s73aq1a2g-a/green_thumb')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret'

app.config['CORS_ORIGINS'] = [
    'https://green-thumb13.vercel.app',
    'https://green-thumb13-fps41zcah-sudi67s-projects.vercel.app',
    'https://green-thumb13-2v43t9nna-sudi67s-projects.vercel.app',
    'https://green-thumb-1xau.onrender.com',
    'http://localhost:3000',
    'http://localhost:5173'
]

db.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)
from flask_cors import CORS

cors = CORS()

cors.init_app(app, resources={r"/*": {"origins": app.config['CORS_ORIGINS']}}, supports_credentials=True)

import logging
import traceback
from flask import jsonify, send_from_directory, request, make_response

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
    app.run(debug=True, port=5000, host='0.0.0.0')
