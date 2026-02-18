'use client';

import React, { useState } from 'react';
import PaymentButton from '@/components/PaymentButton';
import type { RazorpayResponse } from '@/types/payment';

/**
 * Example: Complete Order Flow with Payment
 * 
 * This page demonstrates how to integrate the payment system
 * with your box calculation and order creation flow.
 */

export default function PaymentExamplePage() {
  const [paymentStatus, setPaymentStatus] = useState<string>('');
  const [error, setError] = useState<string>('');

  // Example order data
  const orderId = 1; // Replace with actual order ID
  const amount = 1500; // Amount in INR
  const userDetails = {
    name: 'John Doe',
    email: 'john@example.com',
    contact: '9876543210',
  };

  const handlePaymentSuccess = (response: RazorpayResponse) => {
    console.log('Payment successful:', response);
    setPaymentStatus(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
    setError('');
    
    // You can redirect to success page or show confirmation
    // router.push('/payment-success');
  };

  const handlePaymentError = (error: Error) => {
    console.error('Payment failed:', error);
    setError(error.message);
    setPaymentStatus('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Complete Your Payment</h1>
          
          {/* Order Summary */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-3">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-medium">#{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-medium">₹{amount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Button */}
          <div className="mb-6">
            <PaymentButton
              orderId={orderId}
              amount={amount}
              description="Corrugated Box Order"
              prefill={userDetails}
              notes={{ order_id: orderId }}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
              buttonText="Proceed to Payment"
            />
          </div>

          {/* Status Messages */}
          {paymentStatus && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-sm">{paymentStatus}</p>
            </div>
          )}

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {/* Security Info */}
          <div className="mt-6 text-xs text-gray-500 text-center">
            <p>🔒 Secured by Razorpay</p>
            <p className="mt-1">Your payment information is encrypted and secure</p>
          </div>
        </div>
      </div>
    </div>
  );
}
