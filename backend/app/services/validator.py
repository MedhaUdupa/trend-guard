def validate_tweet_batch(tweets: list[dict]) -> bool:
    """
    Placeholder for Great Expectations runtime checkpoint.
    Returns True when all required keys exist for each tweet row.
    """
    required = {"id", "text", "created_at", "author_id"}
    return all(required.issubset(row.keys()) for row in tweets)
