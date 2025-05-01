-- filepath: /Users/chiragkular/Documents/Dev/ck4957_Repos/LLMastery/db/schema/indexes/indexes.sql
----------------------------------------------
-- LLMastery Database Indexes
-- Created: May 1, 2025
-- Description: Contains all index definitions
----------------------------------------------

-- User profile indexes
CREATE INDEX IF NOT EXISTS user_profiles_username_idx ON user_profiles(username);
CREATE INDEX IF NOT EXISTS user_profiles_points_idx ON user_profiles(points DESC);
CREATE INDEX IF NOT EXISTS user_profiles_streak_idx ON user_profiles(streak DESC);

-- Lesson indexes
CREATE INDEX IF NOT EXISTS lessons_category_idx ON lessons(category);
CREATE INDEX IF NOT EXISTS lessons_level_idx ON lessons(level);
CREATE INDEX IF NOT EXISTS lessons_is_published_idx ON lessons(is_published);
CREATE INDEX IF NOT EXISTS lessons_order_index_idx ON lessons(order_index);
CREATE INDEX IF NOT EXISTS lessons_premium_idx ON lessons(is_premium);
CREATE INDEX IF NOT EXISTS lessons_author_idx ON lessons(author_id);

-- Learning path indexes
CREATE INDEX IF NOT EXISTS learning_paths_category_idx ON learning_paths(category);
CREATE INDEX IF NOT EXISTS learning_paths_level_idx ON learning_paths(level);

-- Community group indexes
CREATE INDEX IF NOT EXISTS community_groups_name_idx ON community_groups(name);
CREATE INDEX IF NOT EXISTS community_groups_category_idx ON community_groups(category);
CREATE INDEX IF NOT EXISTS community_groups_member_count_idx ON community_groups(member_count DESC);

-- Group post indexes
CREATE INDEX IF NOT EXISTS group_posts_group_id_idx ON group_posts(group_id);
CREATE INDEX IF NOT EXISTS group_posts_created_by_idx ON group_posts(created_by);
CREATE INDEX IF NOT EXISTS group_posts_created_at_idx ON group_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS group_posts_likes_count_idx ON group_posts(likes_count DESC);

-- Credit transaction indexes
CREATE INDEX IF NOT EXISTS credit_transactions_user_id_idx ON credit_transactions(user_id);
CREATE INDEX IF NOT EXISTS credit_transactions_created_at_idx ON credit_transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS credit_transactions_type_idx ON credit_transactions(transaction_type);