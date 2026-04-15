from fastapi import APIRouter

from app.models.schemas import AnalyticsRequest

router = APIRouter(tags=["analytics"])


@router.post("/")
async def get_analytics(payload: AnalyticsRequest) -> dict:
    score = 0.72 if payload.window_hours <= 24 else 0.64
    return {
        "trend_id": payload.trend_id,
        "window_hours": payload.window_hours,
        "bot_activity_index": score,
        "risk_level": "high" if score >= 0.7 else "medium",
    }
