""" 
Copyright (C) Amar Box Company Ltd - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Rishi Shah <rishi@amarboxcompany.com>, 9/11/2025
"""

from pydantic import BaseModel, Field
from typing import List, Optional
from enum import Enum

class PaperQuality(str, Enum):
    Kraft = "Kraft"
    Kraft80 = "Kraft80"
    Duplex = "Duplex"
    Golden = "Golden"
    Duplex160 = "Duplex160"
    PrePrinted = "PrePrinted"
    Golden180 = "Golden180"
    KraftImported = "KraftImported"

class BoxType(str, Enum):
    Universal = "Universal"
    Bottom_Locking = "Bottom_Locking"
    Mobile_Type = "Mobile_Type"
    Ring_Flap = "Ring_Flap"

class BoxDimensions(BaseModel):
    length: float
    width: float
    height: float
    units: str = "inch"

class SheetSize(BaseModel):
    length: float
    width: float
    units: str = "cm"

class PaperProperties(BaseModel):
    paper_weight: List[float] = Field(..., min_items=3, max_items=3)
    paper_quality: List[PaperQuality] = Field(..., min_items=3, max_items=3)
    ply_num: int = Field(..., ge=1)

class OrderDetails(BaseModel):
    number_of_boxes: int = Field(..., gt=0)
    box_per_sheet: int = Field(default=1, gt=0)

class ManufacturingProcesses(BaseModel):
    is_pasting: bool = False
    is_punching: bool = False
    is_scoring: bool = False
    is_laminated: bool = False
    is_printed: bool = False
    is_hand_pasted: bool = False
    is_nf: bool = False
    pins_per_box: int = 0

class Costs(BaseModel):
    transportation_cost_per_box: float = 0.0

class BoxCalculationRequest(BaseModel):
    user_id: str = Field(..., description="User ID for tier-based pricing")
    input_type: str = Field(..., pattern="^(sheet_size|box_dimensions)$")
    sheet_size: Optional[SheetSize] = None
    box_dimensions: BoxDimensions
    box_type: BoxType
    paper_properties: PaperProperties
    order_details: OrderDetails
    manufacturing_processes: ManufacturingProcesses = ManufacturingProcesses()
    costs: Costs = Costs()

class BoxCalculationResponse(BaseModel):
    user_id: str
    user_tier: int
    input_mode: str
    box_dimensions: dict
    sheet_size: dict
    sheet_area: float
    sheet_weight: dict
    cost_breakdown: dict
    cost_per_box: float
    total_order_cost: float
    suggested_prices: Optional[List[dict]] = None

class UserCreateRequest(BaseModel):
    user_id: str = Field(..., description="Unique business user ID")
    name: str
    email: str
    tier: int = Field(default=0, ge=0, le=4)

class UserResponse(BaseModel):
    user_id: str
    name: str
    email: str
    tier: int
    created_at: str
