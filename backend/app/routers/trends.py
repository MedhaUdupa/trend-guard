from fastapi import APIRouter, Request

from app.models.schemas import TrendQueryParams
from app.services.bot_detector import AccountMetadata, calculate_bot_score

router = APIRouter(tags=["trends"])

TREND_DATA = [
    {"keyword": "#AIGenerated", "volume": 48200, "platform": "twitter"},
    {"keyword": "#BreakingNews", "volume": 32100, "platform": "twitter"},
    {"keyword": "#ElectionFraud", "volume": 21700, "platform": "twitter"},
    {"keyword": "#CryptoMoon", "volume": 19400, "platform": "reddit"},
    {"keyword": "#TechNews", "volume": 14800, "platform": "reddit"},
]


@router.get("/")
async def get_trends(
    request: Request,
    keyword: str,
    platform: str = "all",
    limit: int = 20,
    sort_by: str = "score",
) -> dict:
    params = TrendQueryParams(
        keyword=keyword,
        platform=platform,
        limit=limit,
        sort_by=sort_by,
    )
    request.app.state.limiter

    filtered = [
        row
        for row in TREND_DATA
        if params.keyword.lower() in row["keyword"].lower()
        and (params.platform == "all" or row["platform"] == params.platform)
    ][: params.limit]

    scored = []
    for row in filtered:
        bot_score = calculate_bot_score(
            AccountMetadata(
                account_age_days=8,
                post_frequency_per_hour=24.0,
                follower_count=120,
                following_count=400,
                bio_length=10,
                profile_has_image=True,
                text_similarity_score=0.66,
            )
        )
        scored.append({**row, "score": bot_score.score, "flags": bot_score.flags})

    return {"count": len(scored), "items": scored}


@router.get("/live")
async def get_live_trends() -> dict:
    # Simulate live trends data
    import random
    from datetime import datetime, timezone

    live_data = [
        {
            "id": f"live-{i+1}",
            "keyword": TREND_DATA[i % len(TREND_DATA)]["keyword"],
            "score": round(random.uniform(0.5, 0.9), 2),
            "timestamp": datetime.now(timezone.utc).isoformat(),
        }
        for i in range(10)
    ]
    return {"data": live_data}

@router.get("/live")
async def get_live_trends() -> dict:
    import random
    from datetime import datetime, timezone
    live_data = [
        {
            "id": f"live-{i+1}",
            "keyword": TREND_DATA[i % len(TREND_DATA)]["keyword"],
            "score": round(random.uniform(0.5, 0.9), 2),
            "timestamp": datetime.now(timezone.utc).isoformat(),
        }
        for i in range(10)
    ]
    return {"data": live_data}

