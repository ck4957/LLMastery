-- LLMastery Database Schema
-- This schema defines the PostgreSQL database structure for the LLMastery learning platform.

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enums
CREATE TYPE lesson_level AS ENUM ('beginner', 'intermediate', 'advanced', 'expert');
CREATE TYPE lesson_category AS ENUM ('fundamentals', 'architecture', 'prompting', 'training', 'evaluation', 'applications', 'ethics', 'advanced-concepts');
CREATE TYPE subscription_status AS ENUM ('active', 'canceled', 'past_due', 'trialing', 'incomplete');
CREATE TYPE payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');
CREATE TYPE payment_method AS ENUM ('credit_card', 'paypal', 'bank_transfer', 'crypto');
CREATE TYPE credit_usage_type AS ENUM ('lesson_purchase', 'subscription_payment', 'individual_lesson');
CREATE TYPE content_format AS ENUM ('markdown', 'html', 'plain_text');
CREATE TYPE feedback_type AS ENUM ('content_issue', 'technical_problem', 'feature_request', 'general');
CREATE TYPE feedback_status AS ENUM ('submitted', 'under_review', 'resolved', 'rejected');
CREATE TYPE access_level AS ENUM ('free', 'premium', 'admin');

-- Badges table
CREATE TABLE IF NOT EXISTS badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  image_url TEXT,
  criteria TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Pricing plans table
CREATE TABLE IF NOT EXISTS pricing_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  interval TEXT NOT NULL DEFAULT 'month',
  features TEXT[] NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  stripe_product_id TEXT,
  stripe_price_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Credit packages table
CREATE TABLE IF NOT EXISTS credit_packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  credits INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  is_active BOOLEAN NOT NULL DEFAULT true,
  stripe_product_id TEXT,
  stripe_price_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Lessons table
CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
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
);

-- Add indexes on lessons
CREATE INDEX IF NOT EXISTS lessons_order_index_idx ON lessons(order_index);
CREATE INDEX IF NOT EXISTS lessons_category_idx ON lessons(category);
CREATE INDEX IF NOT EXISTS lessons_level_idx ON lessons(level);
CREATE INDEX IF NOT EXISTS lessons_is_premium_idx ON lessons(is_premium);

-- Learning paths (curated sequences of lessons)
CREATE TABLE IF NOT EXISTS learning_paths (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  thumbnail_url TEXT,
  is_premium BOOLEAN NOT NULL DEFAULT false,
  credit_cost INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_published BOOLEAN NOT NULL DEFAULT false,
  estimated_completion_time INTEGER -- in minutes
);

-- Learning path lessons (many-to-many relationship)
CREATE TABLE IF NOT EXISTS learning_path_lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  learning_path_id UUID NOT NULL REFERENCES learning_paths(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(learning_path_id, lesson_id),
  UNIQUE(learning_path_id, order_index)
);

-- Quizzes table
CREATE TABLE IF NOT EXISTS quizzes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  options TEXT[] NOT NULL,
  correct_answer_index INTEGER NOT NULL,
  explanation TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Challenges table
CREATE TABLE IF NOT EXISTS challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  example TEXT,
  point_value INTEGER NOT NULL DEFAULT 10,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- User profiles table (extends Supabase Auth)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  bio TEXT,
  avatar_url TEXT,
  points INTEGER NOT NULL DEFAULT 0,
  streak INTEGER NOT NULL DEFAULT 0,
  streak_last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  display_name TEXT,
  theme_preference TEXT DEFAULT 'light',
  email_notifications BOOLEAN DEFAULT true,
  access_level access_level DEFAULT 'free',
  available_credits INTEGER DEFAULT 0,
  lifetime_credits INTEGER DEFAULT 0,
  account_status TEXT DEFAULT 'active',
  last_login TIMESTAMPTZ,
  login_count INTEGER DEFAULT 0,
  marketing_opt_in BOOLEAN DEFAULT false,
  referral_code TEXT UNIQUE DEFAULT encode(gen_random_bytes(8), 'hex'),
  referred_by UUID REFERENCES user_profiles(id)
);

-- User subscriptions
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES user_profiles(user_id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES pricing_plans(id),
  status subscription_status NOT NULL DEFAULT 'active',
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,
  cancel_at_period_end BOOLEAN NOT NULL DEFAULT false,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Payment history
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES user_profiles(user_id) ON DELETE CASCADE,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  status payment_status NOT NULL,
  payment_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  payment_method payment_method NOT NULL,
  stripe_payment_id TEXT,
  description TEXT,
  metadata JSONB,
  invoice_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Credit transactions
CREATE TABLE IF NOT EXISTS credit_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES user_profiles(user_id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  type credit_usage_type NOT NULL,
  description TEXT,
  reference_id UUID, -- could be lesson_id, payment_id etc.
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  balance_after INTEGER NOT NULL
);

-- User badges table (many-to-many relationship)
CREATE TABLE IF NOT EXISTS user_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES user_profiles(user_id) ON DELETE CASCADE,
  badge_id UUID NOT NULL REFERENCES badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- User purchased lessons (for individual purchases)
CREATE TABLE IF NOT EXISTS user_purchased_lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES user_profiles(user_id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  purchased_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  credits_spent INTEGER NOT NULL,
  payment_id UUID REFERENCES payments(id),
  UNIQUE(user_id, lesson_id)
);

-- User purchased learning paths
CREATE TABLE IF NOT EXISTS user_purchased_paths (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES user_profiles(user_id) ON DELETE CASCADE,
  learning_path_id UUID NOT NULL REFERENCES learning_paths(id) ON DELETE CASCADE,
  purchased_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  credits_spent INTEGER NOT NULL,
  payment_id UUID REFERENCES payments(id),
  UNIQUE(user_id, learning_path_id)
);

-- Lesson progress tracking
CREATE TABLE IF NOT EXISTS lesson_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES user_profiles(user_id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  quiz_score INTEGER,
  challenge_completed BOOLEAN DEFAULT false,
  completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_position TEXT, -- stores the last section/position in the lesson
  time_spent INTEGER DEFAULT 0, -- time spent in seconds
  notes TEXT,
  UNIQUE(user_id, lesson_id)
);

-- Content feedback
CREATE TABLE IF NOT EXISTS content_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES user_profiles(user_id) ON DELETE CASCADE,
  lesson_id UUID REFERENCES lessons(id) ON DELETE SET NULL,
  feedback_text TEXT NOT NULL,
  is_helpful BOOLEAN,
  reported_issue TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status feedback_status DEFAULT 'submitted',
  admin_response TEXT,
  feedback_type feedback_type DEFAULT 'content_issue',
  resolved_at TIMESTAMPTZ
);

-- Community groups
CREATE TABLE IF NOT EXISTS community_groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  created_by UUID NOT NULL REFERENCES user_profiles(user_id) ON DELETE CASCADE,
  is_private BOOLEAN DEFAULT false,
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  member_count INTEGER DEFAULT 1,
  topic_tags TEXT[]
);

-- Group members
CREATE TABLE IF NOT EXISTS group_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID NOT NULL REFERENCES community_groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES user_profiles(user_id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member', -- member, moderator, admin
  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(group_id, user_id)
);

-- Group posts
CREATE TABLE IF NOT EXISTS group_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  group_id UUID NOT NULL REFERENCES community_groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES user_profiles(user_id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  content_format content_format DEFAULT 'markdown',
  tags TEXT[]
);

-- Post comments
CREATE TABLE IF NOT EXISTS post_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES group_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES user_profiles(user_id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  likes_count INTEGER DEFAULT 0,
  parent_comment_id UUID REFERENCES post_comments(id) ON DELETE CASCADE
);

-- Post likes
CREATE TABLE IF NOT EXISTS post_likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES group_posts(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES post_comments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES user_profiles(user_id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK ((post_id IS NOT NULL AND comment_id IS NULL) OR (post_id IS NULL AND comment_id IS NOT NULL)),
  UNIQUE(user_id, post_id, comment_id)
);

-- Learning resources (additional content)
CREATE TABLE IF NOT EXISTS learning_resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  resource_url TEXT NOT NULL,
  resource_type TEXT NOT NULL, -- video, article, paper, etc.
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_premium BOOLEAN DEFAULT false,
  credit_cost INTEGER DEFAULT 0
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updating timestamps
CREATE TRIGGER update_lessons_timestamp BEFORE UPDATE ON lessons FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_quizzes_timestamp BEFORE UPDATE ON quizzes FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_challenges_timestamp BEFORE UPDATE ON challenges FOR EACH ROW EXECUTE FUNCTION update_timestamp();
CREATE TRIGGER update_user_profiles_timestamp BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- Create function to set up user profile after sign up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (user_id, username, display_name, avatar_url)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', NULL)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to create user profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;




-- Function to update comment counts
CREATE OR REPLACE FUNCTION update_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE group_posts
    SET comments_count = comments_count + 1
    WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE group_posts
    SET comments_count = comments_count - 1
    WHERE id = OLD.post_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger for comment count
CREATE TRIGGER update_post_comment_count
  AFTER INSERT OR DELETE ON post_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_comment_count();

-- Function to update like counts
CREATE OR REPLACE FUNCTION update_like_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.post_id IS NOT NULL THEN
      UPDATE group_posts
      SET likes_count = likes_count + 1
      WHERE id = NEW.post_id;
    ELSIF NEW.comment_id IS NOT NULL THEN
      UPDATE post_comments
      SET likes_count = likes_count + 1
      WHERE id = NEW.comment_id;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.post_id IS NOT NULL THEN
      UPDATE group_posts
      SET likes_count = likes_count - 1
      WHERE id = OLD.post_id;
    ELSIF OLD.comment_id IS NOT NULL THEN
      UPDATE post_comments
      SET likes_count = likes_count - 1
      WHERE id = OLD.comment_id;
    END IF;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger for like count
CREATE TRIGGER update_like_counts
  AFTER INSERT OR DELETE ON post_likes
  FOR EACH ROW
  EXECUTE FUNCTION update_like_count();

-- Function to check and award badges
CREATE OR REPLACE FUNCTION check_and_award_badges()
RETURNS TRIGGER AS $$
DECLARE
  badge_id UUID;
  complete_count INTEGER;
  current_streak INTEGER;
BEGIN
  -- Get current user streak
  SELECT streak INTO current_streak
  FROM user_profiles
  WHERE user_id = NEW.user_id;

  -- Count completed lessons
  SELECT COUNT(*) INTO complete_count
  FROM lesson_progress
  WHERE user_id = NEW.user_id AND completed = true;

  -- Check for badges based on various criteria
  -- LLM Novice badge (first lesson completed)
  IF NEW.completed = true AND NOT EXISTS (
    SELECT 1 FROM user_badges 
    WHERE user_id = NEW.user_id AND badge_id = '00000000-0000-0000-0000-000000000001'
  ) THEN
    INSERT INTO user_badges (user_id, badge_id)
    VALUES (NEW.user_id, '00000000-0000-0000-0000-000000000001');
  END IF;
  
  -- More badges based on lesson completion logic
  -- ... existing badge logic ...

  -- Streak badges
  IF current_streak >= 5 AND NOT EXISTS (
    SELECT 1 FROM user_badges 
    WHERE user_id = NEW.user_id AND badge_id = '00000000-0000-0000-0000-000000000003'
  ) THEN
    INSERT INTO user_badges (user_id, badge_id)
    VALUES (NEW.user_id, '00000000-0000-0000-0000-000000000003'); -- 5-Day Streak badge
  END IF;
  
  -- Add more streak badges as needed
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for badge awards
CREATE TRIGGER award_badges_on_lesson_completion
  AFTER UPDATE OF completed ON lesson_progress
  FOR EACH ROW
  WHEN (OLD.completed = false AND NEW.completed = true)
  EXECUTE FUNCTION check_and_award_badges();

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

-- Trigger for credit transactions
CREATE TRIGGER process_credit_transaction
  BEFORE INSERT ON credit_transactions
  FOR EACH ROW
  EXECUTE FUNCTION handle_credit_transaction();

-- Function to update group member count
CREATE OR REPLACE FUNCTION update_group_member_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE community_groups
    SET member_count = member_count + 1
    WHERE id = NEW.group_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE community_groups
    SET member_count = member_count - 1
    WHERE id = OLD.group_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger for group member count
CREATE TRIGGER update_community_group_member_count
  AFTER INSERT OR DELETE ON group_members
  FOR EACH ROW
  EXECUTE FUNCTION update_group_member_count();

-- Row Level Security Policies

-- Public tables - allow select for everyone
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_path_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published lessons" 
  ON lessons FOR SELECT 
  USING (is_published = true);

CREATE POLICY "Public can read quizzes for published lessons" 
  ON quizzes FOR SELECT 
  USING ((SELECT is_published FROM lessons WHERE id = quizzes.lesson_id) = true);

CREATE POLICY "Public can read challenges for published lessons" 
  ON challenges FOR SELECT 
  USING ((SELECT is_published FROM lessons WHERE id = challenges.lesson_id) = true);

CREATE POLICY "Public can read badges"
  ON badges FOR SELECT
  USING (true);

CREATE POLICY "Public can read pricing plans"
  ON pricing_plans FOR SELECT
  USING (is_active = true);

CREATE POLICY "Public can read credit packages"
  ON credit_packages FOR SELECT
  USING (is_active = true);

CREATE POLICY "Public can read published learning paths"
  ON learning_paths FOR SELECT
  USING (is_published = true);

CREATE POLICY "Public can read learning path lessons"
  ON learning_path_lessons FOR SELECT
  USING ((SELECT is_published FROM learning_paths WHERE id = learning_path_lessons.learning_path_id) = true);

CREATE POLICY "Public can read free learning resources"
  ON learning_resources FOR SELECT
  USING (is_premium = false OR (SELECT is_published FROM lessons WHERE id = learning_resources.lesson_id) = true);

-- User-specific tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_purchased_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_purchased_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_feedback ENABLE ROW LEVEL SECURITY;

-- User profile policies
CREATE POLICY "Users can read any profile"
  ON user_profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- User badge policies
CREATE POLICY "Users can read their own badges"
  ON user_badges FOR SELECT
  USING (auth.uid() = user_id);

-- Lesson progress policies
CREATE POLICY "Users can read their own lesson progress"
  ON lesson_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own lesson progress"
  ON lesson_progress FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert their own lesson progress"
  ON lesson_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- User purchased lessons policies
CREATE POLICY "Users can read their purchased lessons"
  ON user_purchased_lessons FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert purchased lessons"
  ON user_purchased_lessons FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- User purchased paths policies
CREATE POLICY "Users can read their purchased paths"
  ON user_purchased_paths FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert purchased paths"
  ON user_purchased_paths FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- User subscriptions policies
CREATE POLICY "Users can read their subscriptions"
  ON user_subscriptions FOR SELECT
  USING (auth.uid() = user_id);

-- Payments policies
CREATE POLICY "Users can read their payment history"
  ON payments FOR SELECT
  USING (auth.uid() = user_id);

-- Credit transactions policies
CREATE POLICY "Users can read their credit transactions"
  ON credit_transactions FOR SELECT
  USING (auth.uid() = user_id);

-- Content feedback policies
CREATE POLICY "Users can submit and read their feedback"
  ON content_feedback FOR ALL
  USING (auth.uid() = user_id);

-- Community tables
ALTER TABLE community_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;

-- Community groups policies
CREATE POLICY "Public can read public groups"
  ON community_groups FOR SELECT
  USING (is_private = false);

CREATE POLICY "Members can read private groups"
  ON community_groups FOR SELECT
  USING (
    is_private = false OR 
    EXISTS (
      SELECT 1 FROM group_members 
      WHERE group_id = community_groups.id AND user_id = auth.uid()
    )
  );

-- Group members policies
CREATE POLICY "Public can read group members"
  ON group_members FOR SELECT
  USING (
    (SELECT is_private FROM community_groups WHERE id = group_members.group_id) = false OR
    EXISTS (
      SELECT 1 FROM group_members 
      WHERE group_id = group_members.group_id AND user_id = auth.uid()
    )
  );

-- Group posts policies
CREATE POLICY "Members can read group posts"
  ON group_posts FOR SELECT
  USING (
    (SELECT is_private FROM community_groups WHERE id = group_posts.group_id) = false OR
    EXISTS (
      SELECT 1 FROM group_members 
      WHERE group_id = group_posts.group_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Members can create posts in their groups"
  ON group_posts FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM group_members 
      WHERE group_id = group_posts.group_id AND user_id = auth.uid()
    )
  );

-- Admin policies (add these for admin users)
-- These would typically be implemented with a function to check if user is an admin
-- For example: CREATE FUNCTION is_admin() RETURNS BOOLEAN AS $$ SELECT (SELECT access_level FROM user_profiles WHERE user_id = auth.uid()) = 'admin' $$ LANGUAGE SQL SECURITY DEFINER;