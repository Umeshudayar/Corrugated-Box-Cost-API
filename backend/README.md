# Backend - Corrugated Box Cost Calculator API

FastAPI-based backend for calculating corrugated box manufacturing costs with tier-based pricing.

## Features

- ✅ User management (create, read, list, update tier)
- ✅ Box cost calculation with tier-based pricing
- ✅ Support for multiple box types and paper qualities
- ✅ Manufacturing process cost calculation
- ✅ SQLite database integration
- ✅ CORS enabled for frontend integration
- ✅ Interactive API documentation (Swagger UI)

## Prerequisites

- Python 3.8+
- pip (Python package manager)

## Installation

```bash
# Install dependencies
pip install -r requirements.txt
```

## Running the Backend

### Option 1: Using the startup script (Windows)
```bash
run_backend.bat
```

### Option 2: Using the startup script (Linux/Mac)
```bash
bash run_backend.sh
```

### Option 3: Manual startup
```bash
cd backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

The server will start at: **http://localhost:8000**

## API Documentation

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **Integration Guide**: See `FRONTEND_INTEGRATION_GUIDE.md` in root directory

## Project Structure

```
backend/
├── main.py                 # FastAPI application entry point
├── config.py              # Configuration settings
├── database.py            # Database models and setup
├── requirements.txt       # Python dependencies
├── api/
│   └── endpoints/
│       ├── users.py       # User management endpoints
│       └── calculations.py # Box cost calculation endpoints
├── models/
│   └── box_calculation.py # Pydantic request/response models
├── services/
│   ├── user_service.py    # User business logic
│   └── box_calculator.py  # Calculation logic
└── core/
    └── exceptions.py      # Custom exceptions
```

## Available Endpoints

### Health Check
- `GET /` - Root endpoint
- `GET /health` - Health check

### User Management
- `POST /api/v1/users/` - Create user
- `GET /api/v1/users/{user_id}` - Get user by ID
- `GET /api/v1/users/` - List all users
- `PUT /api/v1/users/{user_id}/tier` - Update user tier

### Calculations
- `POST /api/v1/calculate/` - Calculate box cost

## Database

The application uses SQLite by default with the database file stored at `backend/corrugated_box.db`

### Initialize Database
Database tables are created automatically on first run.

## Configuration

Edit `backend/config.py` to customize:
- Debug mode
- Database URL
- CORS settings
- Other application settings

## Development

- Hot reload is enabled by default
- Changes to files will automatically restart the server
- Check the terminal for any errors

## Troubleshooting

### Port 8000 already in use
```bash
# Kill the process on port 8000 (Windows)
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Or use a different port
python -m uvicorn main:app --port 8001
```

### Import errors
Ensure you're running from the project root directory and all imports are using the `backend.` prefix.

### Database errors
Delete `backend/corrugated_box.db` to reset the database.

---

**Backend is ready for frontend integration!** 🚀
