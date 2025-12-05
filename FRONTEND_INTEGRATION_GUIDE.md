# 🎯 Corrugated Box Cost Calculator API - Frontend Integration Guide

## 📌 Quick Start

### Base URL
```
http://localhost:8000
```

### API Documentation (Interactive)
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

---

## 🏥 Health Check Endpoints

### 1. Root Endpoint
```http
GET /
```

**Response:**
```json
{
  "message": "Corrugated Box Cost Calculator API",
  "version": "1.0.0"
}
```

### 2. Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "healthy"
}
```

---

## 👥 User Management APIs

### 1. Create User
```http
POST /api/v1/users/
```

**Request Body:**
```json
{
  "user_id": "USER001",
  "name": "John Doe",
  "email": "john@example.com",
  "tier": 0
}
```

**Response (201 Created):**
```json
{
  "user_id": "USER001",
  "name": "John Doe",
  "email": "john@example.com",
  "tier": 0,
  "created_at": "2025-12-05T10:30:00"
}
```

**Error Responses:**
- `409 Conflict`: User already exists
```json
{
  "detail": "User with email already exists"
}
```

---

### 2. Get User by ID
```http
GET /api/v1/users/{user_id}
```

**Example:**
```http
GET /api/v1/users/USER001
```

**Response (200 OK):**
```json
{
  "user_id": "USER001",
  "name": "John Doe",
  "email": "john@example.com",
  "tier": 0,
  "created_at": "2025-12-05T10:30:00"
}
```

**Error Responses:**
- `404 Not Found`: User doesn't exist
```json
{
  "detail": "User not found"
}
```

---

### 3. List All Users
```http
GET /api/v1/users/?skip=0&limit=100
```

**Query Parameters:**
- `skip` (optional): Number of records to skip (default: 0)
- `limit` (optional): Maximum records to return (default: 100)

**Response (200 OK):**
```json
[
  {
    "user_id": "USER001",
    "name": "John Doe",
    "email": "john@example.com",
    "tier": 0,
    "created_at": "2025-12-05T10:30:00"
  },
  {
    "user_id": "USER002",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "tier": 2,
    "created_at": "2025-12-05T11:15:00"
  }
]
```

---

### 4. Update User Tier
```http
PUT /api/v1/users/{user_id}/tier?tier={tier_value}
```

**Example:**
```http
PUT /api/v1/users/USER001/tier?tier=2
```

**Response (200 OK):**
```json
{
  "message": "User USER001 tier updated to 2"
}
```

**Error Responses:**
- `400 Bad Request`: Invalid tier (must be 0-4)
```json
{
  "detail": "Tier must be between 0 and 4"
}
```

- `404 Not Found`: User doesn't exist
```json
{
  "detail": "User not found"
}
```

---

## 📦 Box Cost Calculation API

### Calculate Box Cost
```http
POST /api/v1/calculate/
```

**Request Body:**
```json
{
  "user_id": "USER001",
  "box_type": "Universal",
  "paper_quality": "Kraft",
  "length": 100,
  "width": 50,
  "height": 30,
  "quantity": 1000,
  "processes": ["pasting", "printing"]
}
```

**Supported Values:**

#### Box Types:
- `Universal`
- `BottomLocking`
- `MobileType`
- `RingFlap`

#### Paper Quality:
- `Kraft`
- `Kraft80`
- `Duplex`
- `Golden`
- `Duplex160`
- `PrePrinted`
- `Golden180`

#### Processes (array - select applicable ones):
- `pasting`
- `punching`
- `scoring`
- `lamination`
- `printing`
- `die_cutting`

**Response (200 OK):**
```json
{
  "user_id": "USER001",
  "box_type": "Universal",
  "paper_quality": "Kraft",
  "dimensions": {
    "length": 100,
    "width": 50,
    "height": 30
  },
  "quantity": 1000,
  "unit_cost": 2.45,
  "total_cost": 2450.00,
  "profit_margin": 20,
  "tier": 0,
  "calculated_at": "2025-12-05T10:45:00"
}
```

**Error Responses:**
- `400 Bad Request`: Invalid input
```json
{
  "detail": "Invalid box configuration"
}
```

- `404 Not Found`: User not found
```json
{
  "detail": "User not found"
}
```

- `500 Internal Server Error`: Calculation error
```json
{
  "detail": "Calculation error: [error details]"
}
```

---

## 💻 Frontend Code Examples

### JavaScript/Fetch API

#### Create User
```javascript
const createUser = async () => {
  const response = await fetch('http://localhost:8000/api/v1/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: 'USER001',
      name: 'John Doe',
      email: 'john@example.com',
      tier: 0
    })
  });
  
  const data = await response.json();
  console.log(data);
  return data;
};
```

#### Get User
```javascript
const getUser = async (userId) => {
  const response = await fetch(`http://localhost:8000/api/v1/users/${userId}`);
  const data = await response.json();
  console.log(data);
  return data;
};
```

#### Calculate Box Cost
```javascript
const calculateCost = async () => {
  const response = await fetch('http://localhost:8000/api/v1/calculate/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: 'USER001',
      box_type: 'Universal',
      paper_quality: 'Kraft',
      length: 100,
      width: 50,
      height: 30,
      quantity: 1000,
      processes: ['pasting', 'printing']
    })
  });
  
  const data = await response.json();
  console.log(data);
  return data;
};
```

#### List Users
```javascript
const listUsers = async () => {
  const response = await fetch('http://localhost:8000/api/v1/users/?skip=0&limit=100');
  const data = await response.json();
  console.log(data);
  return data;
};
```

#### Update User Tier
```javascript
const updateUserTier = async (userId, tier) => {
  const response = await fetch(`http://localhost:8000/api/v1/users/${userId}/tier?tier=${tier}`, {
    method: 'PUT'
  });
  
  const data = await response.json();
  console.log(data);
  return data;
};
```

---

### React Example Component

```jsx
import React, { useState } from 'react';

const BoxCalculator = () => {
  const [formData, setFormData] = useState({
    user_id: 'USER001',
    box_type: 'Universal',
    paper_quality: 'Kraft',
    length: 100,
    width: 50,
    height: 30,
    quantity: 1000,
    processes: ['pasting', 'printing']
  });
  
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: isNaN(value) ? value : parseFloat(value)
    }));
  };

  const handleCalculate = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8000/api/v1/calculate/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="calculator">
      <h1>Box Cost Calculator</h1>
      
      <form>
        <input 
          name="user_id" 
          value={formData.user_id}
          onChange={handleInputChange}
          placeholder="User ID"
        />
        
        <select name="box_type" value={formData.box_type} onChange={handleInputChange}>
          <option>Universal</option>
          <option>BottomLocking</option>
          <option>MobileType</option>
          <option>RingFlap</option>
        </select>
        
        <select name="paper_quality" value={formData.paper_quality} onChange={handleInputChange}>
          <option>Kraft</option>
          <option>Kraft80</option>
          <option>Duplex</option>
          <option>Golden</option>
          <option>Duplex160</option>
          <option>Golden180</option>
        </select>
        
        <input 
          name="length" 
          type="number"
          value={formData.length}
          onChange={handleInputChange}
          placeholder="Length"
        />
        
        <input 
          name="width" 
          type="number"
          value={formData.width}
          onChange={handleInputChange}
          placeholder="Width"
        />
        
        <input 
          name="height" 
          type="number"
          value={formData.height}
          onChange={handleInputChange}
          placeholder="Height"
        />
        
        <input 
          name="quantity" 
          type="number"
          value={formData.quantity}
          onChange={handleInputChange}
          placeholder="Quantity"
        />
        
        <button type="button" onClick={handleCalculate} disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate Cost'}
        </button>
      </form>
      
      {error && <p className="error">{error}</p>}
      
      {result && (
        <div className="result">
          <h2>Calculation Result</h2>
          <p>Unit Cost: ${result.unit_cost}</p>
          <p>Total Cost: ${result.total_cost}</p>
          <p>Profit Margin: {result.profit_margin}%</p>
          <p>Tier: {result.tier}</p>
        </div>
      )}
    </div>
  );
};

export default BoxCalculator;
```

---

## 📋 HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (invalid input) |
| 404 | Not Found |
| 409 | Conflict (duplicate entry) |
| 500 | Server Error |

---

## 🔧 Error Handling Best Practices

```javascript
const handleApiCall = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'API Error');
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
```

---

## 🚀 Testing the APIs

Use the interactive API documentation at:
- **http://localhost:8000/docs** (Swagger UI)
- **http://localhost:8000/redoc** (ReDoc)

Or use curl commands:

```bash
# Health Check
curl http://localhost:8000/health

# Create User
curl -X POST http://localhost:8000/api/v1/users/ \
  -H "Content-Type: application/json" \
  -d '{"user_id":"USER001","name":"John","email":"john@example.com","tier":0}'

# Get User
curl http://localhost:8000/api/v1/users/USER001

# Calculate Cost
curl -X POST http://localhost:8000/api/v1/calculate/ \
  -H "Content-Type: application/json" \
  -d '{"user_id":"USER001","box_type":"Universal","paper_quality":"Kraft","length":100,"width":50,"height":30,"quantity":1000,"processes":["pasting"]}'
```

---

## ✅ Ready for Frontend Development!

Your API is fully documented and ready to integrate with:
- **React**
- **Vue**
- **Angular**
- **Vanilla JavaScript**
- **Mobile Apps**
- **Any frontend framework**

Happy coding! 🎉
