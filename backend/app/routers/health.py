from datetime import datetime, timezone

from fastapi import APIRouter

router = APIRouter(tags=["health"])


@router.get("/")
async def healthcheck() -> dict:
    return {"status": "ok", "timestamp": datetime.now(timezone.utc).isoformat()}
