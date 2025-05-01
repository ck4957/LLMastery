// filepath: /Users/chiragkular/Documents/Dev/ck4957_Repos/LLMastery/db/schema/functions/fn_update_timestamp.sql
-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;