from fastapi import Request
from slowapi.util import get_remote_address


def get_user_or_ip(request: Request) -> str:
    """Rate limit by user ID when present, fallback to IP."""
    user_id = request.state.__dict__.get("user_id")
    if user_id:
        return f"user:{user_id}"
    return get_remote_address(request)
