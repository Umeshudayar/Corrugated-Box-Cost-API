""" 
Copyright (C) Amar Box Company Ltd - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Rishi Shah <rishi@amarboxcompany.com>, 9/11/2025
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from database import get_db
from models.box_calculation import UserCreateRequest, UserResponse, UserLoginRequest, Token
from services.user_service import UserService
from core.exceptions import UserAlreadyExistsError, UserNotFoundError
from core.security import create_access_token

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(user_data: UserCreateRequest, db: Session = Depends(get_db)):
    """Create a new user with specified tier"""
    try:
        user = UserService.create_user(db, user_data.dict())
        return UserResponse(
            user_id=user.user_id,
            name=user.name,
            email=user.email,
            tier=user.tier,
            created_at=user.created_at.isoformat()
        )
    except UserAlreadyExistsError as e:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(e))

@router.post("/login", response_model=Token)
async def login(login_data: UserLoginRequest, db: Session = Depends(get_db)):
    """Login user and return JWT token"""
    user = UserService.authenticate_user(db, login_data.email, login_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(subject=user.email)
    return Token(
        access_token=access_token,
        token_type="bearer",
        user=UserResponse(
            user_id=user.user_id,
            name=user.name,
            email=user.email,
            tier=user.tier,
            created_at=user.created_at.isoformat()
        )
    )

@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: str, db: Session = Depends(get_db)):
    """Get user by ID"""
    try:
        user = UserService.get_user_by_id(db, user_id)
        return UserResponse(
            user_id=user.user_id,
            name=user.name,
            email=user.email,
            tier=user.tier,
            created_at=user.created_at.isoformat()
        )
    except UserNotFoundError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))

@router.put("/{user_id}/tier")
async def update_user_tier(user_id: str, tier: int, db: Session = Depends(get_db)):
    """Update user's pricing tier"""
    if tier < 0 or tier > 4:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, 
                          detail="Tier must be between 0 and 4")
    
    try:
        user = UserService.update_user_tier(db, user_id, tier)
        return {"message": f"User {user_id} tier updated to {tier}"}
    except UserNotFoundError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))

@router.get("/{user_id}/stats")
async def get_user_stats(user_id: str, db: Session = Depends(get_db)):
    """Get user stats for dashboard"""
    try:
        stats = UserService.get_user_stats(db, user_id)
        return stats
    except UserNotFoundError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))

@router.get("/{user_id}/quotes")
async def get_user_quotes(user_id: str, db: Session = Depends(get_db)):
    """Get all quotes for a user"""
    return UserService.get_user_quotes(db, user_id)

@router.post("/orders")
async def create_order(order_data: dict, db: Session = Depends(get_db)):
    """Create a new order"""
    from database import Order
    new_order = Order(
        user_id=order_data['user_id'],
        status="Processing",
        quantity=order_data['quantity'],
        total_amount=order_data['total_amount']
    )
    db.add(new_order)
    db.commit()
    db.refresh(new_order)
    return {"message": "Order created", "order_id": new_order.id}

@router.get("/", response_model=List[UserResponse])
async def list_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """List all users"""
    users = UserService.list_users(db, skip, limit)
    return [UserResponse(
        user_id=user.user_id,
        name=user.name,
        email=user.email,
        tier=user.tier,
        created_at=user.created_at.isoformat()
    ) for user in users]
