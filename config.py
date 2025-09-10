""" 
Copyright (C) Amar Box Company Ltd - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Rishi Shah <rishi@amarboxcompany.com>, 9/11/2025
"""

from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    database_url: str = "sqlite:///./corrugated_box.db"
    secret_key: str = "dev-secret-key-change-in-production"
    debug: bool = True
    
    class Config:
        env_file = ".env"

settings = Settings()
