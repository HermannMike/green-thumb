# Backend Setup and Run Instructions

## Project Structure

- `app.py`: Main Flask application entry point.
- `models/`: Contains SQLAlchemy models for database tables.
- `routes/`: Flask route handlers for API endpoints.
- `migrations/`: Database migration scripts.
- `extensions.py`: Initialization of Flask extensions (DB, JWT, CORS, etc.).
- `requirements.txt`: Python dependencies.

## Setup and Running

1. Create and activate a virtual environment (optional but recommended):

```bash
python3 -m venv venv
source venv/bin/activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Configure the PostgreSQL database connection in `app.py`:

Make sure the `SQLALCHEMY_DATABASE_URI` is set correctly, e.g.:

```
postgresql://postgres:password@localhost:5432/green_thumb
```

4. Run database migrations if any:

```bash
flask db upgrade
```

5. Run the Flask development server:

```bash
python3 app.py
```

The backend server will start on `http://127.0.0.1:5000`.

## Notes

- The backend uses JWT for authentication. Make sure to use the correct JWT secret key configured in `app.py`.
- CORS is configured to allow requests from frontend development servers.
