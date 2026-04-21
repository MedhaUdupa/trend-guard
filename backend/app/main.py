import asyncio
import os
from datetime import datetime, timezone

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from prometheus_fastapi_instrumentator import Instrumentator
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

from app.middleware.sanitizer import SanitizationMiddleware
from app.routers import analytics, health, trends

limiter = Limiter(key_func=get_remote_address, default_limits=["200/minute"])

app = FastAPI(
    title="TrendGuard API",
    docs_url=None if os.getenv("ENV") == "production" else "/docs",
    redoc_url=None,
)

app.add_middleware(
    TrustedHostMiddleware,
    allowed_hosts=["trendguard.io", "localhost", "127.0.0.1", "*.localhost", "testserver", "*.vercel.app"],
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("FRONTEND_URL", "http://localhost:5173")],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Authorization", "Content-Type"],
)
app.add_middleware(SanitizationMiddleware)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
Instrumentator().instrument(app).expose(app, endpoint="/metrics")

app.include_router(trends.router, prefix="/api/v1/trends")
app.include_router(analytics.router, prefix="/api/v1/analytics")
app.include_router(health.router, prefix="/api/v1/health")
