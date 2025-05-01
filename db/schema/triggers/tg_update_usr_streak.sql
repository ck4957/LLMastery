-- Trigger to update streak when a lesson is completed
CREATE TRIGGER update_user_streak_on_completion
  AFTER UPDATE OF completed ON lesson_progress
  FOR EACH ROW
  WHEN (OLD.completed = false AND NEW.completed = true)
  EXECUTE FUNCTION update_user_streak();
