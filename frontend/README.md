# Frontend Setup and Run Instructions

## Prerequisites

- Node.js (version 14 or higher recommended)
- npm or yarn package manager

## Folder Structure

```
frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx
│   │   │   └── RegisterForm.jsx
│   │   ├── plants/
│   │   │   ├── PlantList.jsx
│   │   │   ├── PlantCard.jsx
│   │   │   └── PlantForm.jsx
│   │   ├── reminders/
│   │   │   ├── ReminderList.jsx
│   │   │   ├── ReminderCalendar.jsx
│   │   │   ├── ReminderItem.jsx
│   │   │   └── ReminderForm.jsx
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   └── ui/
│   │       ├── Alert.jsx
│   │       └── Loader.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── PlantsPage.jsx
│   │   └── RemindersPage.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── auth.js
│   │   ├── plants.js
│   │   └── reminders.js
│   ├── App.jsx
│   ├── index.jsx
│   └── App.css
├── package.json
└── .env
```

## Setup

1. Install dependencies:

```bash
npm install
```

or

```bash
yarn install
```

2. Start the development server:

```bash
npm run dev
```

or

```bash
yarn dev
```

3. The frontend development server will start, typically on `http://localhost:5173`.

## Proxy Configuration

- API requests to `/auth` and `/reminders` are proxied to the backend server at `http://localhost:5000`.
- This is configured in `vite.config.js`.

## Notes

- Authentication is handled using React Context and localStorage for persistence.
- Future improvements planned include real-time notifications, plant image upload support, PWA support, and backend API & DB integration.
