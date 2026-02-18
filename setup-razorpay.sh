#!/bin/bash

# Razorpay Integration Setup Script
# This script helps you set up the Razorpay payment integration

set -e

echo "=================================="
echo "Razorpay Integration Setup"
echo "=================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo -e "${RED}Error: Please run this script from the project root directory${NC}"
    exit 1
fi

echo "Step 1: Installing Backend Dependencies"
echo "========================================"
cd backend

if [ ! -d "venv" ]; then
    echo -e "${YELLOW}Virtual environment not found. Creating one...${NC}"
    python3 -m venv venv
fi

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing Python packages..."
pip install -q razorpay requests

echo -e "${GREEN}✓ Backend dependencies installed${NC}"
echo ""

# Check if .env exists
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}Creating .env file from example...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✓ .env file created${NC}"
    echo -e "${YELLOW}⚠ Please edit backend/.env and add your Razorpay credentials${NC}"
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi

cd ..

echo ""
echo "Step 2: Installing Frontend Dependencies"
echo "========================================"
cd frontend/web

echo "Installing npm packages..."
npm install --silent

echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
echo ""

cd ../..

echo ""
echo "=================================="
echo "Setup Complete!"
echo "=================================="
echo ""
echo "Next steps:"
echo "1. Get your Razorpay credentials:"
echo "   - Sign up at https://dashboard.razorpay.com/"
echo "   - Go to Settings > API Keys"
echo "   - Generate Test keys"
echo ""
echo "2. Edit backend/.env and add:"
echo "   RAZORPAY_KEY_ID=your_key_id"
echo "   RAZORPAY_KEY_SECRET=your_key_secret"
echo ""
echo "3. Start the backend:"
echo "   cd backend"
echo "   source venv/bin/activate"
echo "   python main.py"
echo ""
echo "4. Start the frontend (in a new terminal):"
echo "   cd frontend/web"
echo "   npm run dev"
echo ""
echo "5. Test the integration:"
echo "   Visit http://localhost:3000/payment-example"
echo ""
echo "For complete documentation, see:"
echo "  - RAZORPAY_QUICKSTART.md"
echo "  - RAZORPAY_INTEGRATION.md"
echo ""
