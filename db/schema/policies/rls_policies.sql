-- filepath: /Users/chiragkular/Documents/Dev/ck4957_Repos/LLMastery/db/schema/policies/rls_policies.sql
----------------------------------------------
-- LLMastery Database RLS Policies
-- Created: May 1, 2025
-- Description: Contains all Row Level Security policies
----------------------------------------------

-- User Profiles Policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view any profile"
  ON user_profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Lessons Policies
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published lessons"
  ON lessons FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admin users can CRUD lessons"
  ON lessons FOR ALL
  USING (EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_id = auth.uid() AND (role = 'admin' OR role = 'content_creator')
  ));

-- Lesson Progress Policies
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own lesson progress"
  ON lesson_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own lesson progress"
  ON lesson_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own lesson progress"
  ON lesson_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- Community Group Policies
ALTER TABLE community_groups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view public groups"
  ON community_groups FOR SELECT
  USING (is_private = false OR EXISTS (
    SELECT 1 FROM group_members
    WHERE group_id = community_groups.id AND user_id = auth.uid()
  ));

CREATE POLICY "Group members can update group they are admin of"
  ON community_groups FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM group_members
    WHERE group_id = community_groups.id AND user_id = auth.uid() AND is_admin = true
  ));

-- Add more policies as needed