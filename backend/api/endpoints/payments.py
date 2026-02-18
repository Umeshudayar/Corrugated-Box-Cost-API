""" 
Copyright (C) Amar Box Company Ltd - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Rishi Shah <rishi@amarboxcompany.com>, 9/11/2025
"""

from fastapi import APIRouter, Depends, HTTPException, Header, Request
from sqlalchemy.orm import Session
from database import get_db, Payment, Order, User
from services.payment_service import razorpay_service
from pydantic import BaseModel
from typing import Optional, Dict
from datetime import datetime
import json

router = APIRouter(prefix="/payments", tags=["Payments"])

# Pydantic models
class CreatePaymentOrderRequest(BaseModel):
    order_id: int
    amount: float
    notes: Optional[Dict] = None

class CreatePaymentOrderResponse(BaseModel):
    razorpay_order_id: str
    razorpay_key_id: str
    amount: float
    currency: str
    order_id: int

class VerifyPaymentRequest(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str
    order_id: int

class PaymentResponse(BaseModel):
    id: int
    order_id: int
    razorpay_order_id: str
    razorpay_payment_id: Optional[str]
    amount: float
    currency: str
    status: str
    payment_method: Optional[str]
    created_at: datetime
    updated_at: datetime

class RefundRequest(BaseModel):
    payment_id: int
    amount: Optional[float] = None
    notes: Optional[Dict] = None

@router.post("/create-order", response_model=CreatePaymentOrderResponse)
async def create_payment_order(
    request: CreatePaymentOrderRequest,
    db: Session = Depends(get_db)
):
    """
    Create a Razorpay order for payment
    """
    if not razorpay_service:
        raise HTTPException(status_code=500, detail="Razorpay is not configured")
    
    # Verify order exists
    order = db.query(Order).filter(Order.id == request.order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    # Check if payment already exists for this order
    existing_payment = db.query(Payment).filter(
        Payment.order_id == request.order_id,
        Payment.status.in_(["created", "authorized", "captured"])
    ).first()
    
    if existing_payment:
        raise HTTPException(status_code=400, detail="Payment already exists for this order")
    
    try:
        # Create Razorpay order
        receipt = f"order_{request.order_id}_{int(datetime.utcnow().timestamp())}"
        notes = request.notes or {"order_id": request.order_id}
        
        razorpay_order = razorpay_service.create_order(
            amount=request.amount,
            receipt=receipt,
            notes=notes
        )
        
        # Create payment record in database
        payment = Payment(
            order_id=request.order_id,
            user_id=order.user_id,
            razorpay_order_id=razorpay_order["id"],
            amount=request.amount,
            currency=razorpay_order["currency"],
            status="created"
        )
        db.add(payment)
        db.commit()
        db.refresh(payment)
        
        return CreatePaymentOrderResponse(
            razorpay_order_id=razorpay_order["id"],
            razorpay_key_id=razorpay_service.client.auth[0],
            amount=request.amount,
            currency=razorpay_order["currency"],
            order_id=request.order_id
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create payment order: {str(e)}")

@router.post("/verify")
async def verify_payment(
    request: VerifyPaymentRequest,
    db: Session = Depends(get_db)
):
    """
    Verify payment signature and update payment status
    """
    if not razorpay_service:
        raise HTTPException(status_code=500, detail="Razorpay is not configured")
    
    # Find payment record
    payment = db.query(Payment).filter(
        Payment.razorpay_order_id == request.razorpay_order_id,
        Payment.order_id == request.order_id
    ).first()
    
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    
    # Verify signature
    is_valid = razorpay_service.verify_payment_signature(
        request.razorpay_order_id,
        request.razorpay_payment_id,
        request.razorpay_signature
    )
    
    if not is_valid:
        payment.status = "failed"
        db.commit()
        raise HTTPException(status_code=400, detail="Invalid payment signature")
    
    try:
        # Fetch payment details from Razorpay
        payment_details = razorpay_service.fetch_payment(request.razorpay_payment_id)
        
        # Update payment record
        payment.razorpay_payment_id = request.razorpay_payment_id
        payment.razorpay_signature = request.razorpay_signature
        payment.status = payment_details.get("status", "authorized")
        payment.payment_method = payment_details.get("method", None)
        payment.updated_at = datetime.utcnow()
        
        # Update order status
        order = db.query(Order).filter(Order.id == request.order_id).first()
        if order and payment.status == "captured":
            order.status = "Processing"
        
        db.commit()
        
        return {
            "success": True,
            "message": "Payment verified successfully",
            "payment_id": payment.id,
            "status": payment.status
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to verify payment: {str(e)}")

@router.get("/{payment_id}", response_model=PaymentResponse)
async def get_payment(
    payment_id: int,
    db: Session = Depends(get_db)
):
    """
    Get payment details by ID
    """
    payment = db.query(Payment).filter(Payment.id == payment_id).first()
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    
    return payment

@router.get("/order/{order_id}", response_model=list[PaymentResponse])
async def get_payments_by_order(
    order_id: int,
    db: Session = Depends(get_db)
):
    """
    Get all payments for an order
    """
    payments = db.query(Payment).filter(Payment.order_id == order_id).all()
    return payments

@router.post("/refund")
async def refund_payment(
    request: RefundRequest,
    db: Session = Depends(get_db)
):
    """
    Refund a payment (full or partial)
    """
    if not razorpay_service:
        raise HTTPException(status_code=500, detail="Razorpay is not configured")
    
    # Find payment record
    payment = db.query(Payment).filter(Payment.id == request.payment_id).first()
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    
    if not payment.razorpay_payment_id:
        raise HTTPException(status_code=400, detail="Payment ID not found")
    
    if payment.status not in ["captured", "authorized"]:
        raise HTTPException(status_code=400, detail="Payment cannot be refunded")
    
    try:
        # Process refund through Razorpay
        refund = razorpay_service.refund_payment(
            payment.razorpay_payment_id,
            amount=request.amount,
            notes=request.notes
        )
        
        # Update payment status if full refund
        if not request.amount or request.amount >= payment.amount:
            payment.status = "refunded"
            payment.updated_at = datetime.utcnow()
            db.commit()
        
        return {
            "success": True,
            "message": "Refund processed successfully",
            "refund_id": refund.get("id"),
            "amount": refund.get("amount", 0) / 100,  # Convert from paise
            "status": refund.get("status")
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process refund: {str(e)}")

@router.post("/webhook")
async def razorpay_webhook(
    request: Request,
    x_razorpay_signature: Optional[str] = Header(None),
    db: Session = Depends(get_db)
):
    """
    Handle Razorpay webhook events
    """
    if not razorpay_service:
        raise HTTPException(status_code=500, detail="Razorpay is not configured")
    
    # Get raw body
    body = await request.body()
    
    # Verify webhook signature if configured
    if razorpay_service.client and x_razorpay_signature:
        try:
            is_valid = razorpay_service.verify_webhook_signature(
                body.decode('utf-8'),
                x_razorpay_signature
            )
            if not is_valid:
                raise HTTPException(status_code=400, detail="Invalid webhook signature")
        except ValueError:
            # Webhook secret not configured, skip verification
            pass
    
    # Parse webhook payload
    try:
        payload = json.loads(body)
        event = payload.get("event")
        payment_entity = payload.get("payload", {}).get("payment", {}).get("entity", {})
        
        if event == "payment.captured":
            # Update payment status
            razorpay_payment_id = payment_entity.get("id")
            payment = db.query(Payment).filter(
                Payment.razorpay_payment_id == razorpay_payment_id
            ).first()
            
            if payment:
                payment.status = "captured"
                payment.updated_at = datetime.utcnow()
                
                # Update order status
                order = db.query(Order).filter(Order.id == payment.order_id).first()
                if order:
                    order.status = "Processing"
                
                db.commit()
        
        elif event == "payment.failed":
            razorpay_payment_id = payment_entity.get("id")
            payment = db.query(Payment).filter(
                Payment.razorpay_payment_id == razorpay_payment_id
            ).first()
            
            if payment:
                payment.status = "failed"
                payment.updated_at = datetime.utcnow()
                db.commit()
        
        return {"status": "success"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process webhook: {str(e)}")
