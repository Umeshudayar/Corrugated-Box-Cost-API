""" 
    Copyright (C) Amar Box Company Ltd - All Rights Reserved
    Unauthorized copying of this file, via any medium is strictly prohibited
    Proprietary and confidential
    Written by Rishi Shah <rishi@amarboxcompany.com>, 9/11/2025

"""

from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from database import User
from core.exceptions import UserAlreadyExistsError, UserNotFoundError

class UserService:
    @staticmethod
    def create_user(db: Session, user_data: dict) -> User:
        """Create a new user"""
        try:
            db_user = User(
                user_id=user_data['user_id'],
                name=user_data['name'],
                email=user_data['email'],
                tier=user_data['tier']
            )
            db.add(db_user)
            db.commit()
            db.refresh(db_user)
            return db_user
        except IntegrityError:
            db.rollback()
            raise UserAlreadyExistsError(f"User with ID {user_data['user_id']} already exists")

    @staticmethod
    def get_user_by_id(db: Session, user_id: str) -> User:
        """Get user by user_id"""
        user = db.query(User).filter(User.user_id == user_id).first()
        if not user:
            raise UserNotFoundError(f"User with ID {user_id} not found")
        return user

    @staticmethod
    def update_user_tier(db: Session, user_id: str, new_tier: int) -> User:
        """Update user tier"""
        user = UserService.get_user_by_id(db, user_id)
        user.tier = new_tier
        db.commit()
        db.refresh(user)
        return user

    @staticmethod
    def list_users(db: Session, skip: int = 0, limit: int = 100):
        """List all users with pagination"""
        return db.query(User).offset(skip).limit(limit).all()
