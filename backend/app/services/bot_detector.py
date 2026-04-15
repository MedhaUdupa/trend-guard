import math
from dataclasses import dataclass
from typing import NamedTuple


@dataclass
class AccountMetadata:
    account_age_days: int
    post_frequency_per_hour: float
    follower_count: int
    following_count: int
    bio_length: int
    profile_has_image: bool
    text_similarity_score: float


class BotScore(NamedTuple):
    score: float
    confidence: float
    flags: list[str]


def calculate_bot_score(meta: AccountMetadata) -> BotScore:
    flags: list[str] = []
    score_components: list[float] = []

    if meta.account_age_days < 7:
        score_components.append(0.9)
        flags.append("very_new_account")
    elif meta.account_age_days < 30:
        score_components.append(0.5)
        flags.append("new_account")
    else:
        score_components.append(max(0, 1 - math.log10(meta.account_age_days) / 3))

    if meta.post_frequency_per_hour > 50:
        score_components.append(0.95)
        flags.append("superhuman_post_rate")
    elif meta.post_frequency_per_hour > 20:
        score_components.append(0.6)
        flags.append("high_post_rate")
    else:
        score_components.append(meta.post_frequency_per_hour / 50)

    if meta.follower_count == 0:
        score_components.append(0.7)
        flags.append("no_followers")
    elif meta.following_count > 0:
        ratio = meta.follower_count / meta.following_count
        if ratio < 0.01 or ratio > 100:
            score_components.append(0.6)
            flags.append("extreme_follow_ratio")
        else:
            score_components.append(0.1)
    else:
        score_components.append(0.6)

    if meta.text_similarity_score > 0.85:
        score_components.append(0.9)
        flags.append("high_text_similarity")
    else:
        score_components.append(meta.text_similarity_score)

    if not meta.profile_has_image or meta.bio_length == 0:
        score_components.append(0.5)
        flags.append("incomplete_profile")
    else:
        score_components.append(0.1)

    final_score = sum(score_components) / len(score_components)
    confidence = min(1.0, len(score_components) / 5.0)
    return BotScore(score=round(final_score, 3), confidence=confidence, flags=flags)
