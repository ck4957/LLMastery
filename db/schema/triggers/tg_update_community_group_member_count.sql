// filepath: /Users/chiragkular/Documents/Dev/ck4957_Repos/LLMastery/db/schema/triggers/tg_update_community_group_member_count.sql
-- Trigger for group member count
CREATE TRIGGER update_community_group_member_count
  AFTER INSERT OR DELETE ON group_members
  FOR EACH ROW
  EXECUTE FUNCTION update_group_member_count();