// filepath: /Users/chiragkular/Documents/Dev/ck4957_Repos/LLMastery/db/schema/triggers/tg_award_badges_on_lesson_completion.sql
-- Trigger for awarding badges on lesson completion
CREATE TRIGGER award_badges_on_lesson_completion
  AFTER UPDATE OF completed ON lesson_progress
  FOR EACH ROW
  WHEN (OLD.completed = false AND NEW.completed = true)
  EXECUTE FUNCTION check_and_award_badges();