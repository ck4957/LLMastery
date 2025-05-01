-- filepath: /Users/chiragkular/Documents/Dev/ck4957_Repos/LLMastery/db/schema/enums/enums.sql
----------------------------------------------
-- LLMastery Database Enums
-- Created: May 1, 2025
-- Description: Contains all enum type definitions
----------------------------------------------

-- Lesson categorization
CREATE TYPE lesson_category AS ENUM (
  'fundamentals', 
  'prompting', 
  'fine_tuning', 
  'embeddings', 
  'rag', 
  'agents',
  'evaluation',
  'tools',
  'ethics',
  'business',
  'research'
);

-- Difficulty levels
CREATE TYPE lesson_level AS ENUM (
  'beginner', 
  'intermediate', 
  'advanced', 
  'expert'
);

-- Content format types
CREATE TYPE content_format AS ENUM (
  'markdown',
  'html',
  'jupyter',
  'text'
);

-- Credit transaction types
CREATE TYPE credit_transaction_type AS ENUM (
  'purchase',
  'reward',
  'refund',
  'gift',
  'subscription_bonus',
  'spend',
  'expire'
);