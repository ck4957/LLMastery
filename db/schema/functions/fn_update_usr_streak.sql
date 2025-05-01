-- Function to update user streak
CREATE OR REPLACE FUNCTION update_user_streak()
RETURNS TRIGGER AS $$
DECLARE
  last_activity TIMESTAMPTZ;
  current_date DATE := CURRENT_DATE;
BEGIN
  -- Get the date of the user's last activity
  SELECT streak_last_updated INTO last_activity
  FROM user_profiles
  WHERE user_id = NEW.user_id;
  
  -- If it's a new day but within streak continuation window (36 hours)
  IF last_activity < (NOW() - INTERVAL '20 hours') AND last_activity > (NOW() - INTERVAL '48 hours') THEN
    UPDATE user_profiles
    SET 
      streak = streak + 1,
      streak_last_updated = NOW()
    WHERE user_id = NEW.user_id;
  -- If it's been too long, reset streak to 1
  ELSIF last_activity < (NOW() - INTERVAL '48 hours') THEN
    UPDATE user_profiles
    SET 
      streak = 1,
      streak_last_updated = NOW()
    WHERE user_id = NEW.user_id;
  -- Otherwise just update the timestamp (same day)
  ELSE
    UPDATE user_profiles
    SET streak_last_updated = NOW()
    WHERE user_id = NEW.user_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;