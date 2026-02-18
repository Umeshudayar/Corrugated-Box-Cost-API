#!/bin/bash

# Quick Test Script for Razorpay Integration
# Run this to verify your Razorpay integration is working

echo "🧪 Testing Razorpay Integration"
echo "================================"
echo ""

# Check if backend dependencies are installed
echo "1. Checking backend setup..."
if [ -f "backend/venv/bin/python" ]; then
    if backend/venv/bin/python -c "import razorpay" 2>/dev/null; then
        echo "   ✅ Razorpay package installed"
    else
        echo "   ❌ Razorpay package not found"
        echo "   Run: cd backend && source venv/bin/activate && pip install razorpay"
        exit 1
    fi
else
    echo "   ❌ Virtual environment not found"
    echo "   Run: cd backend && python3 -m venv venv"
    exit 1
fi

# Check if .env file exists and has Razorpay credentials
echo "2. Checking configuration..."
if [ -f "backend/.env" ]; then
    if grep -q "RAZORPAY_KEY_ID=" backend/.env && grep -q "RAZORPAY_KEY_SECRET=" backend/.env; then
        echo "   ✅ Razorpay credentials configured"
    else
        echo "   ⚠️  Razorpay credentials not set in .env"
        echo "   Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to backend/.env"
    fi
else
    echo "   ❌ .env file not found"
    echo "   Copy backend/.env.example to backend/.env and add your credentials"
    exit 1
fi

# Check if frontend dependencies are installed
echo "3. Checking frontend setup..."
if [ -d "frontend/web/node_modules" ]; then
    if [ -d "frontend/web/node_modules/axios" ]; then
        echo "   ✅ Frontend dependencies installed"
    else
        echo "   ❌ Axios not installed"
        echo "   Run: cd frontend/web && npm install"
        exit 1
    fi
else
    echo "   ❌ node_modules not found"
    echo "   Run: cd frontend/web && npm install"
    exit 1
fi

# Check if critical files exist
echo "4. Checking integration files..."
FILES=(
    "backend/services/payment_service.py"
    "backend/api/endpoints/payments.py"
    "frontend/web/components/PaymentButton.tsx"
    "frontend/web/types/payment.ts"
)

all_good=true
for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "   ✅ $file"
    else
        echo "   ❌ $file missing"
        all_good=false
    fi
done

if [ "$all_good" = false ]; then
    echo ""
    echo "   Some files are missing. Integration may be incomplete."
    exit 1
fi

echo ""
echo "================================"
echo "✅ All checks passed!"
echo "================================"
echo ""
echo "Your Razorpay integration is ready to test!"
echo ""
echo "To start testing:"
echo "1. Terminal 1: cd backend && source venv/bin/activate && python main.py"
echo "2. Terminal 2: cd frontend/web && npm run dev"
echo "3. Visit: http://localhost:3000/payment-example"
echo ""
echo "Test cards:"
echo "  Card: 4111 1111 1111 1111"
echo "  CVV: Any 3 digits"
echo "  Expiry: Any future date"
echo ""
