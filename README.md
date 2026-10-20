# Restaverse-Assignment

# Employee Directory Search System

A simple full-stack web application to search and view employee details.

## Live Demo

**Frontend:** https://restraverse-assignment.vercel.app

## Features

- Search employees by name or department.
- View employee details, including email, department, designation, and joining date.
- Debounced search to reduce unnecessary API requests.
- Loading, error, and no-results messages.
- Responsive dark-themed interface.

## Tech Stack

- **Frontend:** React, Vite, CSS
- **Backend:** Python, FastAPI
- **Database:** PostgreSQL
- **Deployment:** Vercel (frontend), Render (backend)

## Project Structure

```text
Restraverse-Assignment/
├── frontend/
│   ├── src/
│   ├── package.json
│   └── .env
└── backend/
    ├── main.py
    ├── requirements.txt
    └── .env
```

*Folder names may differ depending on your repository structure.*

## Frontend Setup

### 1. Open the frontend folder

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the frontend folder:

```env
VITE_API_BASE_URL="Your Deployment URL"
```

### 4. Run the frontend

```bash
npm run dev
```

Open the local URL shown in your terminal, usually `http://localhost:5173`.

## Backend Setup

### 1. Open the backend folder

```bash
cd backend
```

### 2. Create a virtual environment

```bash
mkvirtualenv my_env

```

Activate it on Windows:

```bash
workon my_env
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

Create a `.env` file with your PostgreSQL database connection settings. Use the variable names expected by your backend code.

```env
DATABASE_URL=your_postgresql_connection_string
```

Do not commit database passwords or other secrets to GitHub.

### 5. Run the backend

If your FastAPI application is defined in `main.py` as `app`:

```bash
uvicorn main:app --reload
```

Open `http://127.0.0.1:8000/docs` to explore the API.

## Deployment

- The frontend is deployed on Vercel.
- The backend is deployed on Render.
- PostgreSQL stores the employee data.
- The backend must allow requests from the frontend domain through CORS.

## How It Works

1. Enter an employee name or department in the search box.
2. The frontend sends a request to the backend API.
3. The backend retrieves matching employee records.
4. The frontend displays the results.

## Author

Isha Parte
