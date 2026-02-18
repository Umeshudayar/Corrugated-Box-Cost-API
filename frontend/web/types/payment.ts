// Razorpay Payment Types

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string | number>;
  theme?: {
    color?: string;
    hide_topbar?: boolean;
  };
  modal?: {
    ondismiss?: () => void;
    escape?: boolean;
    backdropclose?: boolean;
  };
  readonly?: {
    contact?: boolean;
    email?: boolean;
    name?: boolean;
  };
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface CreatePaymentOrderRequest {
  order_id: number;
  amount: number;
  notes?: Record<string, string | number>;
}

export interface CreatePaymentOrderResponse {
  razorpay_order_id: string;
  razorpay_key_id: string;
  amount: number;
  currency: string;
  order_id: number;
}

export interface VerifyPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  order_id: number;
}

export interface VerifyPaymentResponse {
  success: boolean;
  message: string;
  payment_id: number;
  status: string;
}

export interface PaymentDetails {
  id: number;
  order_id: number;
  user_id: string;
  razorpay_order_id: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  payment_method?: string;
  created_at: string;
  updated_at: string;
}

export type PaymentStatus = 'created' | 'authorized' | 'captured' | 'failed' | 'refunded';

export interface RefundRequest {
  payment_id: number;
  amount?: number;
  notes?: Record<string, string | number>;
}

export interface RefundResponse {
  success: boolean;
  message: string;
  refund_id: string;
  amount: number;
  status: string;
}

export interface PaymentError {
  code: string;
  description: string;
  source: string;
  step: string;
  reason: string;
  metadata: Record<string, string | number | boolean>;
}

// Extend Window interface for Razorpay
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
      on: (event: string, callback: (response: RazorpayResponse | PaymentError) => void) => void;
    };
  }
}
