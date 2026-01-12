""" 
    Copyright (C) Amar Box Company Ltd - All Rights Reserved
    Unauthorized copying of this file, via any medium is strictly prohibited
    Proprietary and confidential
    Written by Rishi Shah <rishi@amarboxcompany.com>, 9/11/2025

"""

from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from database import User
from core.exceptions import UserAlreadyExistsError, UserNotFoundError

from core.security import get_password_hash, verify_password

class UserService:
    @staticmethod
    def create_user(db: Session, user_data: dict) -> User:
        """Create a new user"""
        try:
            user_id = user_data.get('user_id')
            if not user_id:
                user_id = f"USR-{user_data['email'].split('@')[0]}-{datetime.now().strftime('%M%S')}"

            db_user = User(
                user_id=user_id,
                name=user_data['name'],
                email=user_data['email'],
                hashed_password=get_password_hash(user_data['password']),
                tier=user_data.get('tier', 0)
            )
            db.add(db_user)
            db.commit()
            db.refresh(db_user)
            return db_user
        except IntegrityError:
            db.rollback()
            raise UserAlreadyExistsError(f"User with email {user_data['email']} or ID {user_data['user_id']} already exists")

    @staticmethod
    def get_user_by_email(db: Session, email: str) -> User:
        """Get user by email"""
        user = db.query(User).filter(User.email == email).first()
        return user

    @staticmethod
    def authenticate_user(db: Session, email: str, password: str) -> User:
        """Authenticate user by email and password"""
        user = UserService.get_user_by_email(db, email)
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user

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

    @staticmethod
    def get_user_stats(db: Session, user_id: str) -> dict:
        """Get user statistics for dashboard"""
        from database import Quote, Order
        
        quote_count = db.query(Quote).filter(Quote.user_id == user_id).count()
        order_count = db.query(Order).filter(Order.user_id == user_id, Order.status != "Delivered").count()
        
        user = UserService.get_user_by_id(db, user_id)
        
        return {
            "total_quotes": quote_count,
            "active_orders": order_count,
            "tier": user.tier
        }

    @staticmethod
    def get_user_quotes(db: Session, user_id: str):
        """Get all quotes for a user"""
        from database import Quote
        return db.query(Quote).filter(Quote.user_id == user_id).order_by(Quote.created_at.desc()).all()
