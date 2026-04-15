from app.services.bot_detector import AccountMetadata, calculate_bot_score


def test_calculate_bot_score_flags_obvious_bot():
    meta = AccountMetadata(
        account_age_days=1,
        post_frequency_per_hour=120,
        follower_count=0,
        following_count=500,
        bio_length=0,
        profile_has_image=False,
        text_similarity_score=0.95,
    )
    result = calculate_bot_score(meta)
    assert result.score >= 0.7
    assert "very_new_account" in result.flags
    assert "superhuman_post_rate" in result.flags
