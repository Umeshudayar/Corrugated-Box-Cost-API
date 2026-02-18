""" 
Copyright (C) Amar Box Company Ltd - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Rishi Shah <rishi@amarboxcompany.com>, 9/11/2025
"""

import razorpay
from config import settings
from typing import Optional, Dict
import hmac
import hashlib

class RazorpayService:
    def __init__(self):
        if not settings.razorpay_key_id or not settings.razorpay_key_secret:
            raise ValueError("Razorpay credentials not configured. Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env file")
        
        self.client = razorpay.Client(auth=(settings.razorpay_key_id, settings.razorpay_key_secret))
        self.client.set_app_details({"title": "Corrugated Box Cost Calculator", "version": "1.0.0"})
    
    def create_order(
        self, 
        amount: float, 
        currency: str = "INR",
        receipt: Optional[str] = None,
        notes: Optional[Dict] = None
    ) -> Dict:
        """
        Create a Razorpay order
        
        Args:
            amount: Amount in INR (will be converted to paise)
            currency: Currency code (default: INR)
            receipt: Receipt ID for reference
            notes: Additional metadata
        
        Returns:
            Dict containing order details including order_id
        """
        # Convert amount to paise (smallest currency unit)
        amount_in_paise = int(amount * 100)
        
        order_data = {
            "amount": amount_in_paise,
            "currency": currency,
            "payment_capture": 1  # Auto capture payment
        }
        
        if receipt:
            order_data["receipt"] = receipt
        
        if notes:
            order_data["notes"] = notes
        
        try:
            order = self.client.order.create(data=order_data)
            return order
        except Exception as e:
            raise Exception(f"Failed to create Razorpay order: {str(e)}")
    
    def verify_payment_signature(
        self,
        razorpay_order_id: str,
        razorpay_payment_id: str,
        razorpay_signature: str
    ) -> bool:
        """
        Verify Razorpay payment signature for security
        
        Args:
            razorpay_order_id: Order ID from Razorpay
            razorpay_payment_id: Payment ID from Razorpay
            razorpay_signature: Signature from Razorpay
        
        Returns:
            Boolean indicating if signature is valid
        """
        try:
            params_dict = {
                'razorpay_order_id': razorpay_order_id,
                'razorpay_payment_id': razorpay_payment_id,
                'razorpay_signature': razorpay_signature
            }
            self.client.utility.verify_payment_signature(params_dict)
            return True
        except razorpay.errors.SignatureVerificationError:
            return False
    
    def fetch_payment(self, payment_id: str) -> Dict:
        """
        Fetch payment details from Razorpay
        
        Args:
            payment_id: Razorpay payment ID
        
        Returns:
            Dict containing payment details
        """
        try:
            payment = self.client.payment.fetch(payment_id)
            return payment
        except Exception as e:
            raise Exception(f"Failed to fetch payment: {str(e)}")
    
    def fetch_order(self, order_id: str) -> Dict:
        """
        Fetch order details from Razorpay
        
        Args:
            order_id: Razorpay order ID
        
        Returns:
            Dict containing order details
        """
        try:
            order = self.client.order.fetch(order_id)
            return order
        except Exception as e:
            raise Exception(f"Failed to fetch order: {str(e)}")
    
    def refund_payment(
        self,
        payment_id: str,
        amount: Optional[float] = None,
        notes: Optional[Dict] = None
    ) -> Dict:
        """
        Refund a payment (full or partial)
        
        Args:
            payment_id: Razorpay payment ID
            amount: Amount to refund in INR (None for full refund)
            notes: Additional metadata
        
        Returns:
            Dict containing refund details
        """
        try:
            refund_data = {}
            
            if amount:
                refund_data["amount"] = int(amount * 100)  # Convert to paise
            
            if notes:
                refund_data["notes"] = notes
            
            refund = self.client.payment.refund(payment_id, refund_data)
            return refund
        except Exception as e:
            raise Exception(f"Failed to refund payment: {str(e)}")
    
    def verify_webhook_signature(self, body: str, signature: str) -> bool:
        """
        Verify webhook signature from Razorpay
        
        Args:
            body: Raw request body
            signature: X-Razorpay-Signature header value
        
        Returns:
            Boolean indicating if signature is valid
        """
        if not settings.razorpay_webhook_secret:
            raise ValueError("Razorpay webhook secret not configured")
        
        try:
            expected_signature = hmac.new(
                settings.razorpay_webhook_secret.encode('utf-8'),
                body.encode('utf-8'),
                hashlib.sha256
            ).hexdigest()
            
            return hmac.compare_digest(expected_signature, signature)
        except Exception:
            return False

# Global instance
razorpay_service = RazorpayService() if settings.razorpay_key_id and settings.razorpay_key_secret else None
