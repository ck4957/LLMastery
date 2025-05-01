CREATE OR REPLACE FUNCTION is_content_available(lesson_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  result BOOLEAN;
BEGIN
  SELECT 
    CASE 
      WHEN content IS NOT NULL THEN true
      WHEN content_storage_path IS NOT NULL THEN true
      ELSE false
    END INTO result
  FROM lessons
  WHERE id = lesson_id;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;