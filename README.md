# 📦 Corrugated Box Cost Calculator API

A modern, tier-based REST API for calculating corrugated box manufacturing costs with user management and flexible pricing tiers.

![Python](https://img.shields.io/badge/python-v3.8+-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-green.svg)
![License](https://img.shields.io/badge/license-Proprietary-red.svg)

## 🚀 Features

- **🧮 Accurate Cost Calculations**: Comprehensive manufacturing cost calculations including materials, labor, and processes
- **👥 User Management**: Complete user registration and tier-based access control
- **💰 Flexible Pricing Tiers**: 5-tier pricing system (0-4) with customizable profit margins
- **📊 Multiple Box Types**: Support for Universal, Bottom Locking, Mobile Type, and Ring Flap boxes
- **🔧 Manufacturing Processes**: Handles pasting, punching, scoring, lamination, printing, and more
- **📝 Auto Documentation**: Built-in OpenAPI/Swagger documentation
- **🛡️ Input Validation**: Robust request validation with Pydantic models
- **🗄️ Database Integration**: SQLAlchemy ORM with SQLite (easily switchable to PostgreSQL)

## 🏗️ Project Structure

```
corrugated_box_api/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI application entry point
│   ├── config.py              # Application configuration
│   ├── database.py            # Database setup and models
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py            # User database model
│   │   └── box_calculation.py # Pydantic models for API
│   ├── services/
│   │   ├── __init__.py
│   │   ├── box_calculator.py  # Core calculation business logic
│   │   └── user_service.py    # User management operations
│   ├── api/
│   │   ├── __init__.py
│   │   ├── endpoints/
│   │   │   ├── __init__.py
│   │   │   ├── users.py       # User management endpoints
│   │   │   └── calculations.py # Box calculation endpoints
│   │   └── deps.py            # API dependencies
│   └── core/
│       ├── __init__.py
│       └── exceptions.py      # Custom exception handling
├── requirements.txt
├── .env.example
├── README.md
└── docker-compose.yml
```

## 🛠️ Installation & Setup

### Prerequisites
- Python 3.8+
- pip

### 1. Clone the Repository
```bash
git clone <repository-url>
cd corrugated_box_api
```

### 2. Create Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Environment Configuration
```bash
cp .env.example .env
# Edit .env with your configuration
```

### 5. Run the Application
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

## 📚 API Documentation

Once running, visit:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`
- **OpenAPI JSON**: `http://localhost:8000/openapi.json`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=sqlite:///./corrugated_box.db
SECRET_KEY=your-secret-key-here
DEBUG=True
```

### Pricing Tiers

| Tier | Description | Margin |
|------|-------------|--------|
| 0    | Manufacturing Cost Only | 0% |
| 1    | Basic | 5% |
| 2    | Standard | 10% |
| 3    | Premium | 15% |
| 4    | Enterprise | 20% |

## 🚦 API Endpoints

### User Management

#### Create User
```http
POST /api/v1/users/
Content-Type: application/json

{
  "user_id": "company_123",
  "name": "Acme Corporation",
  "email": "contact@acme.com",
  "tier": 2
}
```

#### Get User
```http
GET /api/v1/users/{user_id}
```

#### Update User Tier
```http
PUT /api/v1/users/{user_id}/tier?tier=3
```

#### List Users
```http
GET /api/v1/users/?skip=0&limit=10
```

### Box Cost Calculation

#### Calculate Manufacturing Cost
```http
POST /api/v1/calculate/
Content-Type: application/json

{
  "user_id": "company_123",
  "input_type": "box_dimensions",
  "box_dimensions": {
    "length": 19.25,
    "width": 16,
    "height": 15,
    "units": "inch"
  },
  "box_type": "Universal",
  "paper_properties": {
    "paper_weight": [230, 100, 285],
    "paper_quality": ["Duplex", "Kraft", "Duplex"],
    "ply_num": 3
  },
  "order_details": {
    "number_of_boxes": 5000,
    "box_per_sheet": 1
  },
  "manufacturing_processes": {
    "is_pasting": true,
    "is_punching": true,
    "is_scoring": false,
    "is_laminated": false,
    "is_printed": false,
    "is_hand_pasted": false,
    "is_nf": false,
    "pins_per_box": 0
  },
  "costs": {
    "transportation_cost_per_box": 0
  }
}
```

## 📊 Usage Examples

### Python Client Example

```python
import requests

# Create a user
user_data = {
    "user_id": "client_001",
    "name": "Test Company",
    "email": "test@company.com",
    "tier": 2
}

response = requests.post("http://localhost:8000/api/v1/users/", json=user_data)
print(f"User created: {response.json()}")

# Calculate box cost
calculation_data = {
    "user_id": "client_001",
    "input_type": "box_dimensions",
    "box_dimensions": {
        "length": 20,
        "width": 15,
        "height": 10,
        "units": "inch"
    },
    "box_type": "Universal",
    "paper_properties": {
        "paper_weight": [200, 90, 250],
        "paper_quality": ["Duplex", "Kraft", "Duplex"],
        "ply_num": 3
    },
    "order_details": {
        "number_of_boxes": 1000
    }
}

response = requests.post("http://localhost:8000/api/v1/calculate/", json=calculation_data)
result = response.json()
print(f"Cost per box: ₹{result['cost_per_box']:.2f}")
print(f"Total order cost: ₹{result['total_order_cost']:.2f}")
```

### JavaScript/Node.js Example

```javascript
const axios = require('axios');

const baseURL = 'http://localhost:8000/api/v1';

// Create user
async function createUser() {
    try {
        const response = await axios.post(`${baseURL}/users/`, {
            user_id: "web_client_001",
            name: "Web Company",
            email: "web@company.com",
            tier: 1
        });
        console.log('User created:', response.data);
    } catch (error) {
        console.error('Error:', error.response.data);
    }
}

// Calculate cost
async function calculateCost() {
    try {
        const response = await axios.post(`${baseURL}/calculate/`, {
            user_id: "web_client_001",
            input_type: "box_dimensions",
            box_dimensions: {
                length: 25,
                width: 20,
                height: 12,
                units: "inch"
            },
            box_type: "Universal",
            paper_properties: {
                paper_weight: [220, 95, 270],
                paper_quality: ["Duplex", "Kraft", "Duplex"],
                ply_num: 3
            },
            order_details: {
                number_of_boxes: 2500
            }
        });
        
        console.log('Calculation result:', response.data);
    } catch (error) {
        console.error('Error:', error.response.data);
    }
}
```

## 🧪 Testing

### Run Tests
```bash
# Install test dependencies
pip install pytest pytest-asyncio httpx

# Run tests
pytest
```

### Manual Testing with curl

```bash
# Health check
curl http://localhost:8000/health

# Create user
curl -X POST "http://localhost:8000/api/v1/users/" \
     -H "Content-Type: application/json" \
     -d '{"user_id":"test_001","name":"Test User","email":"test@test.com","tier":1}'

# Get user
curl http://localhost:8000/api/v1/users/test_001
```

## 🐳 Docker Support

### Using Docker Compose
```bash
docker-compose up -d
```

### Manual Docker Build
```bash
docker build -t corrugated-box-api .
docker run -p 8000:8000 corrugated-box-api
```

## 📈 Performance Considerations

- **Database**: Consider PostgreSQL for production with connection pooling
- **Caching**: Implement Redis for frequently calculated configurations
- **Rate Limiting**: Add rate limiting for public APIs
- **Monitoring**: Integration with monitoring tools (Prometheus, Grafana)

## 🔒 Security

- **Authentication**: Currently uses user_id validation, consider JWT for production
- **Authorization**: Tier-based access control implemented
- **Input Validation**: Comprehensive validation with Pydantic
- **CORS**: Configured for cross-origin requests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup

```bash
# Install development dependencies
pip install -r requirements-dev.txt

# Run with auto-reload
uvicorn app.main:app --reload --log-level debug

# Format code
black app/
isort app/

# Type checking
mypy app/
```

## 📋 Roadmap

- [ ] Authentication & JWT implementation
- [ ] Redis caching for calculations
- [ ] Batch calculation endpoints
- [ ] Export to PDF/Excel
- [ ] Real-time cost tracking
- [ ] Historical cost analysis
- [ ] API rate limiting
- [ ] Webhook notifications
- [ ] Multi-currency support

## 🐛 Known Issues

- Sheet size calculations need validation for extreme dimensions
- Large batch calculations may timeout (consider async processing)
- Paper quality enum needs expansion for regional variations

## 📞 Support

- **Documentation**: Available at `/docs` endpoint
- **Issues**: Please use GitHub Issues for bug reports
- **Email**: support@yourcompany.com

## 📄 License

This project and all its source code are proprietary and confidential to Amar Box Company Ltd. Unauthorized copying, distribution, or use of any part of this software, via any medium, is strictly prohibited. All rights reserved.

Copyright (C) Amar Box Company Ltd. For internal use only.

## 🙏 Acknowledgments

- Original calculation logic contributors
- FastAPI community for excellent documentation
- Pydantic for robust data validation
- SQLAlchemy for seamless database integration

---

**Happy Calculating!** 📦✨