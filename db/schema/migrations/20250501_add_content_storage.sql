-- filepath: /Users/chiragkular/Documents/Dev/ck4957_Repos/LLMastery/db/schema/migrations/20250501_add_content_storage.sql
----------------------------------------------
-- Migration: Add Content Storage Support to Lessons
-- Created: 2025-05-01
-- Description: Adds support for storing lesson content in Supabase Storage
----------------------------------------------

-- Alter the lessons table to add content storage path and content sourcing fields
ALTER TABLE lessons
  -- Make content column optional as we'll be moving to storage for some content
  ALTER COLUMN content DROP NOT NULL,
  
  -- Add storage path for content stored in Supabase Storage
  ADD COLUMN content_storage_path TEXT,
  
  -- Add content source tracking fields
  ADD COLUMN source_type TEXT, -- 'expert', 'ai-assisted', 'external', 'community'
  ADD COLUMN external_source_url TEXT, -- For content from external sources
  ADD COLUMN contributor_id UUID REFERENCES user_profiles(user_id), -- For community-contributed content
  
  -- Add content licensing and attribution information
  ADD COLUMN license_type TEXT, -- 'MIT', 'CC-BY', 'proprietary', etc.
  ADD COLUMN attribution_text TEXT; -- Credit information for external content

-- Create index for the new storage path column
CREATE INDEX IF NOT EXISTS lessons_content_path_idx ON lessons(content_storage_path);

-- Update RLS policy to account for content source permissions
CREATE OR REPLACE POLICY "Public can read published lessons" 
  ON lessons FOR SELECT 
  USING (is_published = true);

-- Add function to check if content is available in storage
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

-- Comment to document the change
COMMENT ON COLUMN lessons.content IS 'Lesson content text. For smaller content or fallback. May be NULL if content_storage_path is used.';
COMMENT ON COLUMN lessons.content_storage_path IS 'Path to lesson content file in Supabase Storage, typically following pattern: /lessons/{category}/{level}/{lesson_id}_v{version}.{format}';