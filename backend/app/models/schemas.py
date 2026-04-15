import re
from typing import Literal

import bleach
from pydantic import BaseModel, Field, field_validator, model_validator

MAX_QUERY_LEN = 100
MAX_PAGE_SIZE = 50


class TrendQueryParams(BaseModel):
    keyword: str = Field(..., min_length=1, max_length=MAX_QUERY_LEN)
    platform: Literal["twitter", "reddit", "all"] = "all"
    limit: int = Field(20, ge=1, le=MAX_PAGE_SIZE)
    sort_by: str = Field("score", pattern="^(score|volume|time)$")

    @field_validator("keyword")
    @classmethod
    def sanitize_keyword(cls, value: str) -> str:
        clean = bleach.clean(value, tags=[], strip=True)
        clean = re.sub(r"[^\w\s\-#@]", "", clean).strip()
        if not clean:
            raise ValueError("keyword contains no valid characters")
        return clean

    @model_validator(mode="before")
    @classmethod
    def reject_extra_fields(cls, data):
        allowed = {"keyword", "platform", "limit", "sort_by"}
        extra = set(data.keys()) - allowed
        if extra:
            raise ValueError(f"Unexpected fields: {extra}")
        return data


class AnalyticsRequest(BaseModel):
    trend_id: str = Field(..., min_length=8, max_length=64, pattern=r"^[a-zA-Z0-9_-]+$")
    window_hours: int = Field(24, ge=1, le=168)
