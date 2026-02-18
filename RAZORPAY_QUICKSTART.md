# Razorpay Integration - Quick Start Guide

## What Was Integrated

### Backend (Python/FastAPI)
✅ Added Razorpay Python SDK to requirements.txt
✅ Created Payment model in database
✅ Created RazorpayService for payment operations
✅ Created Payment API endpoints
✅ Added webhook handler for real-time updates
✅ Integrated with existing Order system

### Frontend (Next.js/React/TypeScript)
✅ Added axios for API calls
✅ Created PaymentButton component
✅ Updated API client with payment methods
✅ Created example payment page

## Quick Setup

### 1. Backend Setup
```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Copy example env file
cp .env.example .env

# Edit .env and add your Razorpay credentials
# Get them from: https://dashboard.razorpay.com/app/keys
```

### 2. Frontend Setup
```bash
cd frontend/web

# Install dependencies
npm install
```

### 3. Get Razorpay Credentials
1. Sign up at https://dashboard.razorpay.com/
2. Go to Settings > API Keys
3. Generate Test keys for development
4. Copy Key ID and Key Secret to backend/.env

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # or activate your virtual environment
python main.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend/web
npm run dev
```

### 5. Test Payment Integration
Visit: http://localhost:3000/payment-example

Use Razorpay test cards:
- Card: 4111 1111 1111 1111
- CVV: Any 3 digits
- Expiry: Any future date

## API Endpoints Created

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/v1/payments/create-order` | POST | Create payment order |
| `/api/v1/payments/verify` | POST | Verify payment signature |
| `/api/v1/payments/{payment_id}` | GET | Get payment details |
| `/api/v1/payments/order/{order_id}` | GET | Get order payments |
| `/api/v1/payments/refund` | POST | Process refund |
| `/api/v1/payments/webhook` | POST | Handle Razorpay webhooks |

## Files Created/Modified

### Backend
- ✨ `backend/services/payment_service.py` - Razorpay service
- ✨ `backend/api/endpoints/payments.py` - Payment endpoints
- ✨ `backend/.env.example` - Configuration template
- 📝 `backend/requirements.txt` - Added razorpay>=1.4.2
- 📝 `backend/config.py` - Added Razorpay config
- 📝 `backend/database.py` - Added Payment model
- 📝 `backend/main.py` - Registered payment router

### Frontend
- ✨ `frontend/web/components/PaymentButton.tsx` - Payment component
- ✨ `frontend/web/app/payment-example/page.tsx` - Example page
- 📝 `frontend/web/lib/api.ts` - Added payment methods
- 📝 `frontend/web/package.json` - Added axios

### Documentation
- ✨ `RAZORPAY_INTEGRATION.md` - Complete integration guide

## Using PaymentButton Component

```tsx
import PaymentButton from '@/components/PaymentButton';

<PaymentButton
  orderId={1}
  amount={1500}
  description="Corrugated Box Order"
  prefill={{
    name: "Customer Name",
    email: "customer@example.com",
    contact: "9876543210"
  }}
  onSuccess={(response) => {
    console.log('Payment successful:', response);
    // Handle success
  }}
  onError={(error) => {
    console.error('Payment failed:', error);
    // Handle error
  }}
/>
```

## Payment Flow
1. User clicks "Pay Now"
2. Backend creates Razorpay order
3. Razorpay checkout modal opens
4. User completes payment
5. Backend verifies payment signature
6. Order status updated to "Processing"
7. Success/error callback executed

## Next Steps

1. **Get Razorpay Account**: Sign up at razorpay.com
2. **Configure Credentials**: Add keys to backend/.env
3. **Test Integration**: Use test mode for development
4. **Customize UI**: Style PaymentButton as needed
5. **Add to Checkout**: Integrate into your order flow
6. **Setup Webhooks**: Configure for production
7. **Go Live**: Switch to live API keys

## Support
- 📚 Full docs: `RAZORPAY_INTEGRATION.md`
- 🔧 Razorpay docs: https://razorpay.com/docs/
- 💬 Razorpay support: https://razorpay.com/support/

## Production Checklist
- [ ] Get live Razorpay API keys
- [ ] Update .env with live keys
- [ ] Configure webhook URL
- [ ] Enable HTTPS
- [ ] Test all payment flows
- [ ] Set up error monitoring
- [ ] Configure payment reconciliation
