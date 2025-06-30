# API Service

This directory contains the API service configuration for the frontend application.

## api.js

The `api.js` file creates an Axios instance that is used throughout the frontend to communicate with the backend server.

### Key Features:

- **Base URL Configuration:**  
  The base URL for the backend API is set using the environment variable `VITE_BACKEND_API_URL`. If this variable is not set, it defaults to `http://localhost:5000`. This allows flexibility to point to different backend environments (development, staging, production).

- **JSON Content-Type:**  
  All requests made using this Axios instance include the `Content-Type: application/json` header by default.

- **JWT Authentication:**  
  A request interceptor is added to include a JWT token stored in `localStorage` under the key `token`. If a token is present, it is added to the `Authorization` header as a Bearer token. This enables authenticated requests to protected backend routes.

### Usage:

Other service files in the frontend (e.g., `auth.js`, `plants.js`, `reminders.js`) import this Axios instance to make HTTP requests to the backend API endpoints.

This setup ensures a centralized and consistent way to handle API communication and authentication between the frontend and backend.

---
