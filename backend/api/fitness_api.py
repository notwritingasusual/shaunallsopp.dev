from typing import List
from ninja import Router
from .models import HealthWeight
from .schemas import HealthWeightOut
from datetime import datetime, timedelta

fitness_router = Router()

@fitness_router.get("/weight", response=List[HealthWeightOut])
def get_weight_data(request, days: int = 90):
    """Get weight data for last N days (default: 90)"""
    cutoff = datetime.now().date() - timedelta(days=days)
    weights = HealthWeight.objects.filter(date__gte=cutoff)
    return weights
