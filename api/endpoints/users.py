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
from models.box_calculation import UserCreateRequest, UserResponse
from services.user_service import UserService
from core.exceptions import UserAlreadyExistsError, UserNotFoundError

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
