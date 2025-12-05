""" 
Copyright (C) Amar Box Company Ltd - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Rishi Shah <rishi@amarboxcompany.com>, 9/11/2025
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.database import get_db
from backend.models.box_calculation import BoxCalculationRequest, BoxCalculationResponse
from backend.services.box_calculator import BoxCalculatorService
from backend.services.user_service import UserService
from backend.core.exceptions import UserNotFoundError, InvalidConfigurationError

router = APIRouter(prefix="/calculate", tags=["calculations"])

@router.post("/", response_model=BoxCalculationResponse)
async def calculate_box_cost(
    calculation_request: BoxCalculationRequest, 
    db: Session = Depends(get_db)
):
    """Calculate corrugated box manufacturing cost based on user tier"""
    try:
        # Get user and their tier
        user = UserService.get_user_by_id(db, calculation_request.user_id)
        
        # Perform calculation
        calculator = BoxCalculatorService()
        result = calculator.calculate_cost(calculation_request.dict(), user.tier)
        
        return BoxCalculationResponse(**result)
        
    except UserNotFoundError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(e))
    except InvalidConfigurationError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
                          detail=f"Calculation error: {str(e)}")
