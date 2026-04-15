from app.services.validator import validate_tweet_batch


def test_validate_tweet_batch_passes_required_schema():
    rows = [{"id": "1", "text": "hi", "created_at": "now", "author_id": "a"}]
    assert validate_tweet_batch(rows) is True
