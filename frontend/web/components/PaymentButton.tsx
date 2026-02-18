'use client';

import React, { useState, useEffect } from 'react';
import type { RazorpayOptions, RazorpayResponse } from '@/types/payment';

interface PaymentButtonProps {
  orderId: number;
  amount: number;
  currency?: string;
  description?: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string | number>;
  onSuccess: (response: RazorpayResponse) => void;
  onError: (error: Error) => void;
  buttonText?: string;
  buttonClassName?: string;
  disabled?: boolean;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  orderId,
  amount,
  currency = 'INR',
  description = 'Corrugated Box Order Payment',
  prefill,
  notes,
  onSuccess,
  onError,
  buttonText = 'Pay Now',
  buttonClassName = '',
  disabled = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    script.onerror = () => {
      console.error('Failed to load Razorpay script');
      onError(new Error('Failed to load payment gateway'));
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [onError]);

  const createPaymentOrder = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_id: orderId,
          amount: amount,
          notes: notes,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Failed to create payment order');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating payment order:', error);
      throw error;
    }
  };

  const verifyPayment = async (response: RazorpayResponse) => {
    try {
      const verifyResponse = await fetch('http://localhost:8000/api/v1/payments/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          order_id: orderId,
        }),
      });

      if (!verifyResponse.ok) {
        const error = await verifyResponse.json();
        throw new Error(error.detail || 'Payment verification failed');
      }

      return await verifyResponse.json();
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  };

  const handlePayment = async () => {
    if (!scriptLoaded) {
      onError(new Error('Payment gateway not loaded yet. Please try again.'));
      return;
    }

    setLoading(true);

    try {
      // Step 1: Create Razorpay order
      const orderData = await createPaymentOrder();

      // Step 2: Initialize Razorpay checkout
      const options: RazorpayOptions = {
        key: orderData.razorpay_key_id,
        amount: orderData.amount * 100, // Amount in paise
        currency: currency || orderData.currency,
        name: 'Amar Box Company',
        description: description,
        order_id: orderData.razorpay_order_id,
        handler: async (response: RazorpayResponse) => {
          try {
            // Step 3: Verify payment on backend
            await verifyPayment(response);
            onSuccess(response);
          } catch (error) {
            onError(error as Error);
          } finally {
            setLoading(false);
          }
        },
        prefill: prefill,
        notes: notes,
        theme: {
          color: '#3399cc',
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      setLoading(false);
      onError(error as Error);
    }
  };

  const defaultClassName = `
    px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold
    hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed
    transition-colors duration-200
  `;

  return (
    <button
      onClick={handlePayment}
      disabled={disabled || loading || !scriptLoaded}
      className={buttonClassName || defaultClassName}
    >
      {loading ? 'Processing...' : buttonText}
    </button>
  );
};

export default PaymentButton;
