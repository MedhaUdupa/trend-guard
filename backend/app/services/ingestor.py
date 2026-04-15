import json
import os

import tweepy

from app.services.validator import validate_tweet_batch

BEARER_TOKEN = os.getenv("TWITTER_BEARER_TOKEN")


class TweetStreamListener(tweepy.StreamingClient):
    def __init__(self, *args, redis_client=None, **kwargs):
        super().__init__(*args, **kwargs)
        self.redis = redis_client
        self.buffer = []
        self.batch_size = 50

    def on_tweet(self, tweet):
        enriched = {
            "id": tweet.id,
            "text": tweet.text,
            "created_at": str(tweet.created_at),
            "author_id": tweet.author_id,
        }
        self.buffer.append(enriched)
        if len(self.buffer) >= self.batch_size:
            self._flush_buffer()

    def _flush_buffer(self):
        if validate_tweet_batch(self.buffer) and self.redis:
            self.redis.lpush("tweet_stream", json.dumps(self.buffer))
        self.buffer.clear()

    def on_errors(self, errors):
        print(f"Stream error: {errors}")
        return True


def start_stream(keywords: list[str], redis_client=None):
    stream = TweetStreamListener(BEARER_TOKEN, redis_client=redis_client)
    rules = stream.get_rules()
    if rules.data:
        stream.delete_rules([rule.id for rule in rules.data])

    clean_keywords = [k[:50] for k in keywords if k.isalnum() or " " in k]
    for keyword in clean_keywords[:5]:
        stream.add_rules(tweepy.StreamRule(keyword))

    stream.filter(tweet_fields=["created_at", "author_id", "public_metrics"])
