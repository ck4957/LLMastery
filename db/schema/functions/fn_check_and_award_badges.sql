// filepath: /Users/chiragkular/Documents/Dev/ck4957_Repos/LLMastery/db/schema/functions/fn_check_and_award_badges.sql
-- Function to check and award badges
CREATE OR REPLACE FUNCTION check_and_award_badges()
RETURNS TRIGGER AS $$
DECLARE
  badge_id UUID;
  complete_count INTEGER;
  current_streak INTEGER;
BEGIN
  -- Get current user streak
  SELECT streak INTO current_streak
  FROM user_profiles
  WHERE user_id = NEW.user_id;

  -- Count completed lessons
  SELECT COUNT(*) INTO complete_count
  FROM lesson_progress
  WHERE user_id = NEW.user_id AND completed = true;

  -- Check for badges based on various criteria
  -- LLM Novice badge (first lesson completed)
  IF NEW.completed = true AND NOT EXISTS (
    SELECT 1 FROM user_badges 
    WHERE user_id = NEW.user_id AND badge_id = '00000000-0000-0000-0000-000000000001'
  ) THEN
    INSERT INTO user_badges (user_id, badge_id)
    VALUES (NEW.user_id, '00000000-0000-0000-0000-000000000001');
  END IF;
  
  -- More badges based on lesson completion logic
  -- ... existing badge logic ...

  -- Streak badges
  IF current_streak >= 5 AND NOT EXISTS (
    SELECT 1 FROM user_badges 
    WHERE user_id = NEW.user_id AND badge_id = '00000000-0000-0000-0000-000000000003'
  ) THEN
    INSERT INTO user_badges (user_id, badge_id)
    VALUES (NEW.user_id, '00000000-0000-0000-0000-000000000003'); -- 5-Day Streak badge
  END IF;
  
  -- Add more streak badges as needed
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;