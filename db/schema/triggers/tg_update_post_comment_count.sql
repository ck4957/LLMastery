// filepath: /Users/chiragkular/Documents/Dev/ck4957_Repos/LLMastery/db/schema/triggers/tg_update_post_comment_count.sql
-- Trigger for comment count
CREATE TRIGGER update_post_comment_count
  AFTER INSERT OR DELETE ON post_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_comment_count();