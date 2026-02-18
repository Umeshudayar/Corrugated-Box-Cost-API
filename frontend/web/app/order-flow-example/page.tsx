'use client';

import React, { useState } from 'react';
import PaymentButton from '@/components/PaymentButton';
import { api } from '@/lib/api';

/**
 * Example: Complete Order Flow with Payment
 * 
 * This page demonstrates how to integrate the payment system
 * with your box calculation and order creation flow.
 */

export default function CompleteOrderFlowPage() {
  const [step, setStep] = useState(1);
  const [calculationResult, setCalculationResult] = useState<any>(null);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // Step 1: Calculate box cost
  const handleCalculate = async () => {
    setLoading(true);
    setError('');

    try {
      // Example calculation request
      const calculationRequest = {
        user_id: "user_123",
        input_type: "box_dimensions",
        box_dimensions: {
          length: 10,
          width: 8,
          height: 6,
          units: "inch"
        },
        box_type: "Universal",
        paper_properties: {
          paper_weight: [120, 150, 120],
          paper_quality: ["Kraft", "Duplex", "Kraft"],
          ply_num: 3
        },
        order_details: {
          number_of_boxes: 1000,
          box_per_sheet: 1
        }
      };

      const result = await api.calculateBoxCost(calculationRequest);
      setCalculationResult(result);
      setStep(2);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Create order
  const handleCreateOrder = async () => {
    setLoading(true);
    setError('');

    try {
      // In a real implementation, you'd have an order creation endpoint
      // For this example, we'll simulate creating an order
      const mockOrderId = Math.floor(Math.random() * 10000);
      setOrderId(mockOrderId);
      setStep(3);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Handle payment success
  const handlePaymentSuccess = (response: any) => {
    console.log('Payment successful:', response);
    setStep(4);
  };

  // Handle payment error
  const handlePaymentError = (error: Error) => {
    console.error('Payment failed:', error);
    setError(error.message);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-semibold
                    ${step >= s ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}
                  `}
                >
                  {s}
                </div>
                {s < 4 && (
                  <div
                    className={`
                      w-24 h-1 mx-2
                      ${step > s ? 'bg-blue-600' : 'bg-gray-300'}
                    `}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span>Calculate</span>
            <span>Review</span>
            <span>Payment</span>
            <span>Complete</span>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Step 1: Calculate */}
        {step === 1 && (
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Step 1: Calculate Box Cost</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded">
                <h3 className="font-semibold mb-2">Box Specifications</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Dimensions: 10" × 8" × 6"</li>
                  <li>• Type: Universal</li>
                  <li>• 3-Ply (Kraft-Duplex-Kraft)</li>
                  <li>• Quantity: 1000 boxes</li>
                </ul>
              </div>
              <button
                onClick={handleCalculate}
                disabled={loading}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold
                         hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
              >
                {loading ? 'Calculating...' : 'Calculate Cost'}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Review Order */}
        {step === 2 && calculationResult && (
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Step 2: Review Order</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded">
                <h3 className="font-semibold mb-3">Cost Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cost per box:</span>
                    <span className="font-medium">₹{calculationResult.cost_per_box?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-medium">1000 boxes</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span>Total Amount:</span>
                    <span className="text-blue-600">₹{calculationResult.total_order_cost?.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold
                           hover:bg-gray-300 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleCreateOrder}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold
                           hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                >
                  {loading ? 'Creating Order...' : 'Proceed to Payment'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {step === 3 && orderId && calculationResult && (
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Step 3: Complete Payment</h2>
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded">
                <h3 className="font-semibold mb-3">Order Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order ID:</span>
                    <span className="font-medium">#{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Amount:</span>
                    <span className="font-medium text-lg text-blue-600">
                      ₹{calculationResult.total_order_cost?.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <PaymentButton
                  orderId={orderId}
                  amount={calculationResult.total_order_cost}
                  description="Corrugated Box Order"
                  prefill={{
                    name: "John Doe",
                    email: "john@example.com",
                    contact: "9876543210"
                  }}
                  notes={{ 
                    order_id: orderId,
                    quantity: 1000,
                    box_type: "Universal"
                  }}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                  buttonText="Pay Now"
                />

                <button
                  onClick={() => setStep(2)}
                  className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold
                           hover:bg-gray-300 transition-colors"
                >
                  Back to Review
                </button>
              </div>

              <div className="text-xs text-gray-500 text-center">
                <p>🔒 Secured by Razorpay</p>
                <p className="mt-1">Your payment information is encrypted and secure</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="bg-white shadow-lg rounded-lg p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
              <p className="text-gray-600">Your order has been confirmed and is being processed.</p>
            </div>

            <div className="p-4 bg-gray-50 rounded mb-6">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-medium">#{orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount Paid:</span>
                  <span className="font-medium">₹{calculationResult?.total_order_cost?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-green-600">Processing</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setStep(1);
                  setCalculationResult(null);
                  setOrderId(null);
                  setError('');
                }}
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold
                         hover:bg-blue-700 transition-colors"
              >
                Place Another Order
              </button>
              <button
                onClick={() => window.location.href = '/dashboard'}
                className="w-full px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold
                         hover:bg-gray-300 transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
