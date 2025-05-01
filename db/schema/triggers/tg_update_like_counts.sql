// filepath: /Users/chiragkular/Documents/Dev/ck4957_Repos/LLMastery/db/schema/triggers/tg_update_like_counts.sql
-- Trigger for like count
CREATE TRIGGER update_like_counts
  AFTER INSERT OR DELETE ON post_likes
  FOR EACH ROW
  EXECUTE FUNCTION update_like_count();