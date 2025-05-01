-- filepath: /Users/chiragkular/Documents/Dev/ck4957_Repos/LLMastery/db/schema/tables/tables.sql
----------------------------------------------
-- LLMastery Database Tables
-- Created: May 1, 2025
-- Description: Contains all table definitions
----------------------------------------------

-- Users & Profiles
CREATE TABLE IF NOT EXISTS user_profiles (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  points INTEGER NOT NULL DEFAULT 0,
  streak INTEGER NOT NULL DEFAULT 0,
  streak_last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  level INTEGER NOT NULL DEFAULT 1,
  available_credits INTEGER NOT NULL DEFAULT 0,
  lifetime_credits INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Lessons
CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT, -- Optional now, can be NULL if content_storage_path is used
  level lesson_level NOT NULL,
  category lesson_category NOT NULL,
  duration INTEGER NOT NULL, -- in minutes
  points INTEGER NOT NULL DEFAULT 0,
  xp_reward INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  order_index INTEGER NOT NULL,
  next_lesson_id UUID REFERENCES lessons(id),
  previous_lesson_id UUID REFERENCES lessons(id),
  is_published BOOLEAN NOT NULL DEFAULT false,
  is_premium BOOLEAN NOT NULL DEFAULT false,
  credit_cost INTEGER NOT NULL DEFAULT 0,
  content_format content_format NOT NULL DEFAULT 'markdown',
  thumbnail_url TEXT,
  content_version INTEGER NOT NULL DEFAULT 1,
  author_id UUID,
  estimated_completion_time INTEGER, -- in minutes
  difficulty_rating DECIMAL(3, 2) CHECK (difficulty_rating >= 1 AND difficulty_rating <= 5)
  -- Additional columns will be added in migrations
);

-- Include the rest of your tables here
-- ...

-- Credit Transactions
CREATE TABLE IF NOT EXISTS credit_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES user_profiles(user_id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  transaction_type credit_transaction_type NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  balance_after INTEGER,
  related_entity_id UUID, -- For purchases, this could be the lesson_id or item_id
  related_entity_type TEXT -- 'lesson', 'challenge', 'purchase', etc.
);

-- Learning Resources
CREATE TABLE IF NOT EXISTS learning_resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  resource_type TEXT NOT NULL, -- 'article', 'video', 'book', etc.
  category lesson_category NOT NULL,
  level lesson_level NOT NULL,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_premium BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Community Groups
CREATE TABLE IF NOT EXISTS community_groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  created_by UUID NOT NULL REFERENCES user_profiles(user_id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_private BOOLEAN NOT NULL DEFAULT false,
  member_count INTEGER NOT NULL DEFAULT 0,
  category TEXT,
  thumbnail_url TEXT
);

-- Group Members
CREATE TABLE IF NOT EXISTS group_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID NOT NULL REFERENCES community_groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES user_profiles(user_id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_admin BOOLEAN NOT NULL DEFAULT false,
  UNIQUE(group_id, user_id)
);

-- Add more tables as needed...