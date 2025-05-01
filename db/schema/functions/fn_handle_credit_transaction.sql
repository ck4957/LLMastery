// filepath: /Users/chiragkular/Documents/Dev/ck4957_Repos/LLMastery/db/schema/functions/fn_handle_credit_transaction.sql
-- Function to handle credit transactions
CREATE OR REPLACE FUNCTION handle_credit_transaction()
RETURNS TRIGGER AS $$
DECLARE
  current_credits INTEGER;
BEGIN
  -- Get user's current credit balance
  SELECT available_credits INTO current_credits
  FROM user_profiles
  WHERE user_id = NEW.user_id;
  
  -- Set the balance after the transaction
  NEW.balance_after := current_credits + NEW.amount;
  
  -- Update the user's available credits
  UPDATE user_profiles
  SET 
    available_credits = available_credits + NEW.amount,
    lifetime_credits = CASE 
                         WHEN NEW.amount > 0 THEN lifetime_credits + NEW.amount
                         ELSE lifetime_credits
                       END
  WHERE user_id = NEW.user_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;