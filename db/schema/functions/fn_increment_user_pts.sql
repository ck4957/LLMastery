-- Function to increment user points
CREATE OR REPLACE FUNCTION increment_user_points(user_id UUID, points_to_add INTEGER)
RETURNS VOID AS $$
BEGIN
  UPDATE user_profiles
  SET points = points + points_to_add
  WHERE user_id = increment_user_points.user_id;
END;
$$ LANGUAGE plpgsql;