// filepath: /Users/chiragkular/Documents/Dev/ck4957_Repos/LLMastery/db/schema/triggers/tg_on_auth_user_created.sql
-- Create trigger to create user profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();