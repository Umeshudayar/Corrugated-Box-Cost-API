""" 
Copyright (C) Amar Box Company Ltd - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Rishi Shah <rishi@amarboxcompany.com>, 9/11/2025
"""

class BoxCalculationError(Exception):
    """Base exception for box calculation errors"""
    pass

class UserNotFoundError(BoxCalculationError):
    """Raised when user is not found"""
    pass

class UserAlreadyExistsError(BoxCalculationError):
    """Raised when trying to create a user that already exists"""
    pass

class InvalidConfigurationError(BoxCalculationError):
    """Raised when box configuration is invalid"""
    pass
