""" 
Copyright (C) Amar Box Company Ltd - All Rights Reserved
Unauthorized copying of this file, via any medium is strictly prohibited
Proprietary and confidential
Written by Rishi Shah <rishi@amarboxcompany.com>, 9/11/2025
"""

import math
from enum import Enum
from pint import UnitRegistry
from models.box_calculation import PaperQuality as PydanticPaperQuality, BoxType as PydanticBoxType

class PaperQuality(Enum):
    Kraft = 35.50
    Kraft80 = 35.0
    Duplex = 46.0
    Golden = 37.5
    Duplex160 = 38.5
    PrePrinted = 0.0
    Golden180 = 39.5
    KraftImported = 75.0

class BoxType(Enum):
    Universal = 1
    Bottom_Locking = 2
    Mobile_Type = 3
    Ring_Flap = 4

# Constants
PINNING_COST_PER_PIN = 0.1
WASTAGE_PERCENTAGE = 1.03
PUNCHING_COST_MAP = {500: 1.0, 1000: 0.5, 3000: 0.4, float('inf'): 0.3}
HAND_PASTING_COST_MAP = {10: 0.3, 20: 0.4, 30: 1.0, float('inf'): 2.0}
PRINTING_COST_MAP = {
    1000: 1600, 2000: 2000, 3000: 2400, 4000: 2800, 5000: 3200,
    6000: 3600, 7000: 4200, 8000: 4800, 9000: 5400, 10000: 6000
}
LAMINATION_COST_PER_100_SQ_IN = 0.35
CORRUGATION_COST_PER_KG = 8
PASTING_SHEET_COST_PER_KG = 2
NF_CORRUGATION_COST_PER_KG = 10

class BoxCalculatorService:
    def __init__(self):
        self.ureg = UnitRegistry()
        self.ureg.define('INR = [currency]')
        self.cm = self.ureg.cm
        self.inch = self.ureg.inch
        self.m = self.ureg.m
        self.g = self.ureg.g
        self.kg = self.ureg.kg
        self.INR = self.ureg.INR

    def calculate_cost(self, request_data: dict, user_tier: int) -> dict:
        """Main calculation method"""
        # Convert request to internal format
        box_config = self._convert_request_to_config(request_data)
        
        # Perform calculations
        cost_per_box, sheet_weight = self._calculate_manufacturing_cost(box_config)
        
        # Apply tier-based pricing
        final_price = self._apply_tier_pricing(cost_per_box, user_tier)
        
        # Prepare response
        return self._format_response(box_config, cost_per_box, sheet_weight, 
                                   final_price, user_tier, request_data['user_id'])

    def _convert_request_to_config(self, request_data: dict) -> dict:
        """Convert API request format to internal calculation format"""
        # This would contain the logic to convert from the Pydantic models
        # to the internal calculation format
        return {
            'input_type': request_data['input_type'],
            'sheet_size': request_data.get('sheet_size'),
            'box_dimensions': request_data['box_dimensions'],
            'box_type': BoxType[request_data['box_type'].replace('_', '_')],
            'paper_properties': request_data['paper_properties'],
            'order_details': request_data['order_details'],
            'manufacturing_processes': request_data['manufacturing_processes'],
            'costs': request_data['costs']
        }

    def _calculate_manufacturing_cost(self, config: dict) -> tuple:
        """Core cost calculation logic (adapted from original)"""
        # Implementation of the original calculation logic
        # This would be the refactored version of your CorrugatedBox and CostCalculator classes
        
        # For brevity, returning mock values - you'd implement the full logic here
        cost_per_box = 10.50 * self.INR
        sheet_weight = [0.1 * self.kg, 0.05 * self.kg, 0.08 * self.kg]
        
        return cost_per_box, sheet_weight

    def _apply_tier_pricing(self, manufacturing_cost, tier: int) -> float:
        """Apply tier-based pricing"""
        tier_multipliers = {
            0: 1.0,    # Manufacturing cost only
            1: 1.05,   # 5% margin
            2: 1.10,   # 10% margin
            3: 1.15,   # 15% margin
            4: 1.20    # 20% margin
        }
        
        multiplier = tier_multipliers.get(tier, 1.0)
        return manufacturing_cost * multiplier

    def _format_response(self, config, manufacturing_cost, sheet_weight, 
                        final_price, tier, user_id) -> dict:
        """Format the calculation response"""
        return {
            'user_id': user_id,
            'user_tier': tier,
            'input_mode': config['input_type'],
            'cost_per_box': float(final_price.magnitude),
            'manufacturing_cost': float(manufacturing_cost.magnitude),
            'total_order_cost': float(final_price.magnitude * config['order_details']['number_of_boxes']),
            'sheet_weight': {
                'backing': float(sheet_weight[0].magnitude),
                'fluting': float(sheet_weight[1].magnitude),
                'top': float(sheet_weight[2].magnitude)
            }
        }
