# Razorpay Payment Integration Guide

## Overview
This project now includes full Razorpay payment integration for processing orders. The integration includes both backend API endpoints and frontend React components.

## Prerequisites

### Backend Setup
1. **Install Dependencies**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

2. **Configure Razorpay Credentials**
   Create a `.env` file in the `backend` directory with the following:
   ```env
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   RAZORPAY_WEBHOOK_SECRET=your_webhook_secret  # Optional, for webhook verification
   ```

   To get your Razorpay credentials:
   - Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com/)
   - Go to Settings > API Keys
   - Generate Test/Live API keys

### Frontend Setup
1. **Install Dependencies**
   ```bash
   cd frontend/web
   npm install
   ```

2. **Configure API URL** (Optional)
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

## Backend API Endpoints

### 1. Create Payment Order
**POST** `/api/v1/payments/create-order`

Creates a Razorpay order for payment processing.

**Request Body:**
```json
{
  "order_id": 1,
  "amount": 1500.00,
  "notes": {
    "customer_name": "John Doe",
    "product": "Corrugated Boxes"
  }
}
```

**Response:**
```json
{
  "razorpay_order_id": "order_xyz123",
  "razorpay_key_id": "rzp_test_123",
  "amount": 1500.00,
  "currency": "INR",
  "order_id": 1
}
```

### 2. Verify Payment
**POST** `/api/v1/payments/verify`

Verifies the payment signature after successful payment.

**Request Body:**
```json
{
  "razorpay_order_id": "order_xyz123",
  "razorpay_payment_id": "pay_abc456",
  "razorpay_signature": "signature_hash",
  "order_id": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment verified successfully",
  "payment_id": 1,
  "status": "captured"
}
```

### 3. Get Payment Details
**GET** `/api/v1/payments/{payment_id}`

Retrieves payment details by payment ID.

### 4. Get Payments by Order
**GET** `/api/v1/payments/order/{order_id}`

Retrieves all payments associated with an order.

### 5. Refund Payment
**POST** `/api/v1/payments/refund`

Processes a full or partial refund.

**Request Body:**
```json
{
  "payment_id": 1,
  "amount": 500.00,  // Optional, omit for full refund
  "notes": {
    "reason": "Customer request"
  }
}
```

### 6. Webhook Handler
**POST** `/api/v1/payments/webhook`

Handles Razorpay webhook events (payment.captured, payment.failed, etc.)

**Headers:**
- `X-Razorpay-Signature`: Webhook signature for verification

## Frontend Implementation

### PaymentButton Component
A reusable React component that handles the complete payment flow.

**Basic Usage:**
```tsx
import PaymentButton from '@/components/PaymentButton';

function CheckoutPage() {
  const handleSuccess = (response) => {
    console.log('Payment successful:', response);
    // Redirect to success page or show confirmation
  };

  const handleError = (error) => {
    console.error('Payment failed:', error);
    // Show error message to user
  };

  return (
    <PaymentButton
      orderId={1}
      amount={1500}
      description="Corrugated Box Order"
      prefill={{
        name: "John Doe",
        email: "john@example.com",
        contact: "9876543210"
      }}
      notes={{ order_id: 1 }}
      onSuccess={handleSuccess}
      onError={handleError}
      buttonText="Pay Now"
    />
  );
}
```

**Props:**
- `orderId`: Order ID from your system
- `amount`: Amount in INR
- `currency`: Currency code (default: "INR")
- `description`: Payment description
- `prefill`: User details for auto-filling form
- `notes`: Additional metadata
- `onSuccess`: Callback on successful payment
- `onError`: Callback on payment failure
- `buttonText`: Custom button text
- `buttonClassName`: Custom button styling
- `disabled`: Disable button

### API Client Methods
The `api.ts` file includes payment-related methods:

```typescript
import { api } from '@/lib/api';

// Create payment order
const order = await api.createPaymentOrder(orderId, amount, notes);

// Verify payment
const result = await api.verifyPayment(
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
  orderId
);

// Get payment details
const payment = await api.getPayment(paymentId);

// Get payments by order
const payments = await api.getPaymentsByOrder(orderId);

// Process refund
const refund = await api.refundPayment(paymentId, amount, notes);
```

## Payment Flow

1. **User initiates payment**
   - Clicks "Pay Now" button
   - Frontend calls `/payments/create-order` endpoint

2. **Backend creates Razorpay order**
   - Validates order in database
   - Creates Razorpay order via API
   - Stores payment record with status "created"

3. **Razorpay checkout opens**
   - User enters payment details
   - Completes payment

4. **Payment verification**
   - Razorpay sends response to frontend
   - Frontend calls `/payments/verify` endpoint
   - Backend verifies signature
   - Updates payment status to "captured"
   - Updates order status to "Processing"

5. **Webhook handling (optional)**
   - Razorpay sends webhook events
   - Backend updates payment status automatically

## Database Schema

### Payment Table
```sql
CREATE TABLE payments (
    id INTEGER PRIMARY KEY,
    order_id INTEGER,
    user_id VARCHAR,
    razorpay_order_id VARCHAR UNIQUE,
    razorpay_payment_id VARCHAR UNIQUE,
    razorpay_signature VARCHAR,
    amount FLOAT,
    currency VARCHAR DEFAULT 'INR',
    status VARCHAR DEFAULT 'created',
    payment_method VARCHAR,
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
)
```

**Payment Status Values:**
- `created`: Order created, payment pending
- `authorized`: Payment authorized, not captured
- `captured`: Payment successfully captured
- `failed`: Payment failed
- `refunded`: Payment refunded

## Testing

### Test Mode
Use Razorpay test credentials for development:
- Test Card: 4111 1111 1111 1111
- CVV: Any 3 digits
- Expiry: Any future date
- OTP: Any 6 digits

### Test Webhook Locally
Use ngrok to expose your local server:
```bash
ngrok http 8000
```

Configure webhook URL in Razorpay Dashboard:
```
https://your-ngrok-url.ngrok.io/api/v1/payments/webhook
```

## Security Best Practices

1. **Never expose secrets**: Keep `RAZORPAY_KEY_SECRET` and `RAZORPAY_WEBHOOK_SECRET` in `.env` file
2. **Verify signatures**: Always verify payment signatures on backend
3. **Use HTTPS**: In production, use HTTPS for all API calls
4. **Validate amounts**: Verify order amounts match before creating payments
5. **Handle webhooks**: Implement webhook handlers for better reliability
6. **Log transactions**: Keep detailed logs of all payment transactions

## Production Checklist

- [ ] Replace test API keys with live keys
- [ ] Configure webhook URL
- [ ] Enable HTTPS
- [ ] Set up error monitoring
- [ ] Test payment flows thoroughly
- [ ] Configure proper CORS settings
- [ ] Set up payment reconciliation
- [ ] Add rate limiting to payment endpoints
- [ ] Implement proper error handling
- [ ] Add payment status notifications

## Troubleshooting

### Common Issues

**1. "Razorpay is not configured"**
- Ensure `.env` file has `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`
- Restart the backend server after adding credentials

**2. Payment verification fails**
- Check if signature verification is working
- Ensure order_id matches in both create and verify calls
- Verify network connectivity

**3. Webhook not receiving events**
- Check webhook URL is publicly accessible
- Verify webhook secret is correctly configured
- Check webhook signature verification

**4. CORS errors in frontend**
- Ensure backend CORS settings allow frontend origin
- Check API base URL in frontend configuration

## Support

For Razorpay-specific issues, refer to:
- [Razorpay Documentation](https://razorpay.com/docs/)
- [Razorpay API Reference](https://razorpay.com/docs/api/)
- [Razorpay Support](https://razorpay.com/support/)

## Example Implementation

See `/app/payment-example/page.tsx` for a complete working example of the payment flow.
