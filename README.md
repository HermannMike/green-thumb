# Green Thumb Project

## Overview

This project consists of a **frontend** React application and a **backend** Python Flask API server. The frontend and backend communicate via HTTP API calls to provide a full-stack plant management and reminder system.

---

## Frontend

- Built with React.
- Located in the `frontend/` directory.
- Uses Axios for HTTP requests to the backend API.
- The main API service is configured in `frontend/src/services/api.js`.
- The backend API base URL is set via the environment variable `VITE_BACKEND_API_URL` (defaults to `http://localhost:5000`).
- JWT tokens are stored in `localStorage` and included in API requests for authentication.
- Frontend service files (e.g., `auth.js`, `plants.js`, `reminders.js`) use the centralized Axios instance to communicate with backend endpoints.
- React context (`AuthContext.jsx`) manages authentication state and protected routes.

---

## Backend

- Built with Python Flask.
- Located in the `backend/` directory.
- Provides RESTful API endpoints under `backend/app/routes/` for authentication, plants, and reminders.
- Uses JWT for authentication and authorization.
- Connects to a database (SQLite by default) for persistent storage.
- Handles business logic in `backend/app/services/`.
- Supports migrations via Alembic in `backend/migrations/`.

---

## Frontend-Backend Connection

- The frontend sends HTTP requests to the backend API using Axios.
- The backend API URL is configurable via environment variables to support different deployment environments.
- Authentication is handled via JWT tokens:
  - The backend issues JWT tokens upon successful login.
  - The frontend stores the token and includes it in the `Authorization` header of subsequent requests.
- API endpoints cover user authentication, plant management, and reminder management.
- This setup enables a secure and modular full-stack application.

---

## Running the Project

1. Start the backend server (default port 5000).
2. Configure the frontend environment variable `VITE_BACKEND_API_URL` to point to the backend server URL.
3. Start the frontend development server.
4. Access the frontend in a browser; it will communicate with the backend API for data and authentication.

---

## Environment Variables

- `VITE_BACKEND_API_URL`: URL of the backend API server (frontend).
- Backend environment variables are configured in `backend/app/config.py` or environment.

---

This README provides a high-level overview of the project architecture and how the frontend and backend are connected and communicate.
