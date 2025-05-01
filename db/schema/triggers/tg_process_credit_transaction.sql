// filepath: /Users/chiragkular/Documents/Dev/ck4957_Repos/LLMastery/db/schema/triggers/tg_process_credit_transaction.sql
-- Trigger for credit transactions
CREATE TRIGGER process_credit_transaction
  BEFORE INSERT ON credit_transactions
  FOR EACH ROW
  EXECUTE FUNCTION handle_credit_transaction();