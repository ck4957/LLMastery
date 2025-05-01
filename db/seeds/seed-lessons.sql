-- Seed Data for LLMastery Database

-- Sample lessons with content_storage_path
INSERT INTO lessons (
  title,
  description,
  content,
  content_storage_path,
  level,
  category,
  duration,
  points,
  xp_reward,
  order_index,
  is_published,
  is_premium,
  credit_cost,
  content_format,
  content_version,
  source_type,
  author_id
) VALUES 
(
  'Introduction to LLMs',
  'Learn the fundamentals of Large Language Models and how they work',
  NULL, -- No inline content, using storage instead
  'lessons/fundamentals/beginner/intro_to_llms_v1.md',
  'beginner',
  'fundamentals',
  20,
  50,
  100,
  1,
  true,
  false,
  0,
  'markdown',
  1,
  'expert',
  '00000000-0000-0000-0000-000000000001' -- Sample author ID
),
(
  'Prompt Engineering Basics',
  'Master the art of crafting effective prompts for LLMs',
  NULL, -- No inline content, using storage instead
  'lessons/prompting/beginner/prompt_engineering_basics_v1.md',
  'beginner',
  'prompting',
  25,
  75,
  150,
  1,
  true,
  false,
  0,
  'markdown',
  1,
  'expert',
  '00000000-0000-0000-0000-000000000001' -- Sample author ID
),
(
  'Advanced RAG Techniques',
  'Learn advanced techniques for Retrieval Augmented Generation',
  NULL, -- No inline content, using storage instead
  'lessons/rag/advanced/advanced_rag_techniques_v1.md',
  'advanced',
  'rag',
  45,
  150,
  300,
  1,
  true,
  true,
  5,
  'markdown',
  1,
  'expert',
  '00000000-0000-0000-0000-000000000002' -- Sample author ID
),
(
  'Ethical Considerations in AI',
  'Explore the ethical implications of using LLMs in production',
  NULL, -- No inline content, using storage instead
  'lessons/ethics/intermediate/ethical_considerations_v1.md',
  'intermediate',
  'ethics',
  30,
  100,
  200,
  1,
  true,
  false,
  0,
  'markdown',
  1,
  'ai-assisted',
  '00000000-0000-0000-0000-000000000003' -- Sample author ID
);

-- Example of a lesson with community-contributed content
INSERT INTO lessons (
  title,
  description,
  content,
  content_storage_path,
  level,
  category,
  duration,
  points,
  xp_reward,
  order_index,
  is_published,
  is_premium,
  credit_cost,
  content_format,
  content_version,
  source_type,
  contributor_id
) VALUES 
(
  'Building LLM-powered Customer Support Bots',
  'A practical guide to implementing customer support bots with LLMs',
  NULL, -- No inline content, using storage instead
  'lessons/business/advanced/customer_support_bots_v1.md',
  'advanced',
  'business',
  60,
  200,
  400,
  1,
  true,
  true,
  10,
  'markdown',
  1,
  'community',
  '00000000-0000-0000-0000-000000000010' -- Community contributor ID
);
