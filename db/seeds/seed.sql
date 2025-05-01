-- LLMastery Seed Data
-- This script populates the database with initial content for the learning platform

-- Seed Data for LLMastery Database


-- Create the quiz questions for the lessons
INSERT INTO quizzes (lesson_id, question, options, correct_answer_index, explanation)
VALUES
  ('00000000-0000-0000-0000-000000000001', 
   'What is the primary architecture used in modern Large Language Models?', 
   ARRAY['Convolutional Neural Networks', 'Recurrent Neural Networks', 'Transformer Architecture', 'Generative Adversarial Networks'], 
   2, 
   'Modern Large Language Models primarily use the Transformer architecture, which was introduced in the paper "Attention is All You Need" and allows for parallel processing of text and better handling of long-range dependencies.'),
   
  ('00000000-0000-0000-0000-000000000001', 
   'What does the "large" in Large Language Models primarily refer to?', 
   ARRAY['The physical size of the computing infrastructure', 'The amount of text the model can generate', 'The number of parameters in the model', 'The size of the company that created it'], 
   2, 
   'The "large" in Large Language Models refers to the number of parameters (weights and biases) in the model, which can range from billions to trillions.'),
   
  ('00000000-0000-0000-0000-000000000001', 
   'Which of the following is NOT a common application of LLMs?', 
   ARRAY['Content creation', 'Translation between languages', 'Physical robot control without additional systems', 'Code generation'], 
   2, 
   'While LLMs excel at text-based tasks, they cannot directly control physical robots without additional systems and interfaces. The other options are common applications of LLMs.'),
   
  ('00000000-0000-0000-0000-000000000002', 
   'What is "chain of thought" prompting?', 
   ARRAY['Breaking a complex prompt into multiple separate prompts', 'Asking the LLM to work through a problem step-by-step', 'Linking multiple LLMs together', 'Creating a decision tree of potential responses'], 
   1, 
   'Chain of thought prompting involves asking the LLM to work through a problem step-by-step, showing its reasoning process. This technique often improves performance on complex reasoning tasks.'),
   
  ('00000000-0000-0000-0000-000000000002', 
   'Which of these is an example of good prompting practice?', 
   ARRAY['Keeping prompts as short as possible', 'Using vague language to allow creative interpretation', 'Providing relevant context and specific instructions', 'Asking multiple unrelated questions in one prompt'], 
   2, 
   'Providing relevant context and specific instructions is a good prompting practice as it helps the LLM understand exactly what you''re looking for and produce more useful results.'),
   
  ('00000000-0000-0000-0000-000000000003', 
   'Which of these is NOT typically a criterion for evaluating LLM outputs?', 
   ARRAY['Factual accuracy', 'Relevance to the query', 'Processing speed of generation', 'Coherence and fluency'], 
   2, 
   'While factual accuracy, relevance, and coherence are important evaluation criteria for LLM outputs, the processing speed of generation is more related to the model''s performance characteristics rather than output quality.'),
   
  ('00000000-0000-0000-0000-000000000003', 
   'What is the main purpose of the "Traffic Light" evaluation system mentioned in the lesson?', 
   ARRAY['To measure the reading level of the output', 'To categorize outputs for simple decision-making about their usability', 'To evaluate the emotional tone of responses', 'To count the number of factual errors'], 
   1, 
   'The Traffic Light system (green/yellow/red) provides a simple framework for categorizing outputs based on their quality and usability, helping users quickly decide whether to accept, revise, or reject the output.'),
   
  ('00000000-0000-0000-0000-000000000004', 
   'What is Parameter-Efficient Fine-tuning (PEFT)?', 
   ARRAY['Using as few parameters as possible in the base model', 'Updating only a small subset of model parameters during fine-tuning', 'Reducing the number of training examples needed', 'Pre-selecting the most important parameters before training'], 
   1, 
   'Parameter-Efficient Fine-tuning refers to techniques that update only a small subset of model parameters during fine-tuning, such as LoRA or adapters, which significantly reduces computational and storage requirements.'),
   
  ('00000000-0000-0000-0000-000000000004', 
   'What is a common sign of overfitting in a fine-tuned model?', 
   ARRAY['Poor performance on both training and test data', 'Perfect performance on training data but poor generalization to new examples', 'Consistent performance across all data types', 'Faster inference times than the base model'], 
   1, 
   'A key sign of overfitting is when a model performs extremely well on its training data but fails to generalize to new examples, indicating it has memorized the training data rather than learning the underlying patterns.'),
   
  ('00000000-0000-0000-0000-000000000005', 
   'Which of the following is NOT a common capability of multimodal LLMs?', 
   ARRAY['Describing the content of images', 'Answering questions about visual content', 'Physically manipulating objects based on visual input', 'Generating images from text descriptions'], 
   2, 
   'While multimodal LLMs can process and generate content across different modalities like text and images, they cannot physically manipulate objects in the real world, as this would require robotics and other physical systems.'),
   
  ('00000000-0000-0000-0000-000000000005', 
   'What is "late fusion" in the context of multimodal LLMs?', 
   ARRAY['Delaying the release of a model until all modalities are perfected', 'Processing different modalities separately and combining them at a later stage', 'Adding new modalities to an existing model after initial training', 'Introducing visual elements only at the end of text generation'], 
   1, 
   'Late fusion refers to an architectural approach where different modalities (like text and images) are processed separately through their respective encoders, and their representations are combined at a later stage in the model architecture.');

-- Insert challenges for each lesson
INSERT INTO challenges (lesson_id, prompt, example, point_value)
VALUES
  ('00000000-0000-0000-0000-000000000001', 
   'Explain in your own words what makes LLMs "large" and why this is significant for their capabilities.', 
   'Your explanation should include references to parameters, training data, and how scale contributes to emergent abilities.', 
   20),
   
  ('00000000-0000-0000-0000-000000000002', 
   'Create three different prompts for the same task using different prompting techniques discussed in the lesson.', 
   'Task example: Getting advice on improving a resume. Show basic prompting, role-based prompting, and chain-of-thought prompting approaches.', 
   25),
   
  ('00000000-0000-0000-0000-000000000003', 
   'Evaluate the following LLM output using the criteria discussed in the lesson and suggest specific improvements.', 
   'LLM output to evaluate: "The first airplane flight was conducted by Leonardo da Vinci in 1523 using a prototype he designed after studying birds. This historic achievement revolutionized transportation, though it would be centuries before commercial air travel became common."', 
   25),
   
  ('00000000-0000-0000-0000-000000000004', 
   'Design a fine-tuning dataset of 5 example pairs for teaching an LLM to summarize research papers in your field of interest.', 
   'For each example, provide an input (portion of a research paper) and the desired output (a structured summary). Explain why you structured your examples this way.', 
   30),
   
  ('00000000-0000-0000-0000-000000000005', 
   'Describe three potential applications of multimodal LLMs that could have significant real-world impact, and explain the ethical considerations for each.', 
   'Consider applications in healthcare, education, accessibility, or another domain of your choice. For each application, identify both benefits and potential risks.', 
   35);

-- Insert badges
INSERT INTO badges (id, name, description, image_url, criteria)
VALUES
  ('00000000-0000-0000-0000-000000000001', 
   'LLM Novice', 
   'Completed your first lesson on Large Language Models.', 
   '/badges/llm_novice.png', 
   'Complete one lesson'),
   
  ('00000000-0000-0000-0000-000000000002', 
   'Prompt Engineer', 
   'Mastered the art of creating effective prompts.', 
   '/badges/prompt_engineer.png', 
   'Complete the Prompting Techniques lesson with a perfect quiz score'),
   
  ('00000000-0000-0000-0000-000000000003', 
   'Critical Thinker', 
   'Demonstrated the ability to critically evaluate AI outputs.', 
   '/badges/critical_thinker.png', 
   'Complete the Evaluating LLM Outputs lesson and its challenge'),
   
  ('00000000-0000-0000-0000-000000000004', 
   'Fine-tuning Specialist', 
   'Gained expertise in adapting models to specific domains.', 
   '/badges/fine_tuning_specialist.png', 
   'Complete the Fine-tuning LLMs lesson and its challenge'),
   
  ('00000000-0000-0000-0000-000000000005', 
   'Multimodal Master', 
   'Explored the cutting edge of AI across multiple modalities.', 
   '/badges/multimodal_master.png', 
   'Complete the Multimodal LLMs lesson with a perfect quiz score');

-- Create functions for triggers

-- Function to create user profile after auth.user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to check and award badges
CREATE OR REPLACE FUNCTION check_and_award_badges()
RETURNS TRIGGER AS $$
DECLARE
  badge_id UUID;
BEGIN
  -- Check for LLM Novice badge (first lesson completed)
  IF NEW.completed = true AND NOT EXISTS (
    SELECT 1 FROM user_badges 
    WHERE user_id = NEW.user_id AND badge_id = '00000000-0000-0000-0000-000000000001'
  ) AND NOT EXISTS (
    SELECT 1 FROM user_badges 
    WHERE user_id = NEW.user_id
  ) THEN
    INSERT INTO user_badges (user_id, badge_id)
    VALUES (NEW.user_id, '00000000-0000-0000-0000-000000000001');
  END IF;
  
  -- Check for Prompt Engineer badge
  IF NEW.completed = true AND NEW.lesson_id = '00000000-0000-0000-0000-000000000002' 
     AND NEW.quiz_score = 100 AND NOT EXISTS (
    SELECT 1 FROM user_badges 
    WHERE user_id = NEW.user_id AND badge_id = '00000000-0000-0000-0000-000000000002'
  ) THEN
    INSERT INTO user_badges (user_id, badge_id)
    VALUES (NEW.user_id, '00000000-0000-0000-0000-000000000002');
  END IF;
  
  -- Check for Critical Thinker badge
  IF NEW.completed = true AND NEW.lesson_id = '00000000-0000-0000-0000-000000000003'
     AND NEW.challenge_completed = true AND NOT EXISTS (
    SELECT 1 FROM user_badges 
    WHERE user_id = NEW.user_id AND badge_id = '00000000-0000-0000-0000-000000000003'
  ) THEN
    INSERT INTO user_badges (user_id, badge_id)
    VALUES (NEW.user_id, '00000000-0000-0000-0000-000000000003');
  END IF;
  
  -- Check for Fine-tuning Specialist badge
  IF NEW.completed = true AND NEW.lesson_id = '00000000-0000-0000-0000-000000000004'
     AND NEW.challenge_completed = true AND NOT EXISTS (
    SELECT 1 FROM user_badges 
    WHERE user_id = NEW.user_id AND badge_id = '00000000-0000-0000-0000-000000000004'
  ) THEN
    INSERT INTO user_badges (user_id, badge_id)
    VALUES (NEW.user_id, '00000000-0000-0000-0000-000000000004');
  END IF;
  
  -- Check for Multimodal Master badge
  IF NEW.completed = true AND NEW.lesson_id = '00000000-0000-0000-0000-000000000005'
     AND NEW.quiz_score = 100 AND NOT EXISTS (
    SELECT 1 FROM user_badges 
    WHERE user_id = NEW.user_id AND badge_id = '00000000-0000-0000-0000-000000000005'
  ) THEN
    INSERT INTO user_badges (user_id, badge_id)
    VALUES (NEW.user_id, '00000000-0000-0000-0000-000000000005');
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Insert pricing plans for subscriptions
INSERT INTO pricing_plans (id, name, description, price, currency, interval, features, is_active, stripe_product_id, stripe_price_id)
VALUES
  ('00000000-0000-0000-0000-000000000101', 
   'Free Plan', 
   'Access to foundational content to start your LLM learning journey.', 
   0.00, 
   'USD', 
   'month', 
   ARRAY['Access to beginner-level lessons', '5 quizzes per month', 'Community forum access', 'Progress tracking'], 
   true, 
   'prod_free', 
   'price_free'),
   
  ('00000000-0000-0000-0000-000000000102', 
   'Premium Monthly', 
   'Full access to all content with monthly billing.', 
   14.99, 
   'USD', 
   'month', 
   ARRAY['All lessons and learning paths', 'Unlimited quizzes and challenges', 'Priority community support', 'Progress certification', 'Ad-free experience', 'Download resources'], 
   true, 
   'prod_premium_monthly', 
   'price_premium_monthly'),
   
  ('00000000-0000-0000-0000-000000000103', 
   'Premium Annual', 
   'Full access to all content with annual billing at a discounted rate.', 
   149.99, 
   'USD', 
   'year', 
   ARRAY['All lessons and learning paths', 'Unlimited quizzes and challenges', 'Priority community support', 'Progress certification', 'Ad-free experience', 'Download resources', '2 months free compared to monthly'], 
   true, 
   'prod_premium_annual', 
   'price_premium_annual'),
   
  ('00000000-0000-0000-0000-000000000104', 
   'Enterprise', 
   'Team access with advanced analytics and custom content.', 
   499.99, 
   'USD', 
   'month', 
   ARRAY['All Premium features', 'Team management dashboard', 'Custom learning paths', 'Progress analytics', 'Private community groups', 'Priority support', 'Custom API access'], 
   true, 
   'prod_enterprise', 
   'price_enterprise');

-- Insert credit packages
INSERT INTO credit_packages (id, name, description, credits, price, currency, is_active, stripe_product_id, stripe_price_id)
VALUES
  ('00000000-0000-0000-0000-000000000201', 
   'Starter Pack', 
   '50 credits to access premium lessons individually', 
   50, 
   4.99, 
   'USD', 
   true, 
   'prod_credits_starter', 
   'price_credits_starter'),
   
  ('00000000-0000-0000-0000-000000000202', 
   'Standard Pack', 
   '125 credits to access premium lessons individually', 
   125, 
   9.99, 
   'USD', 
   true, 
   'prod_credits_standard', 
   'price_credits_standard'),
   
  ('00000000-0000-0000-0000-000000000203', 
   'Value Pack', 
   '300 credits to access premium lessons individually', 
   300, 
   19.99, 
   'USD', 
   true, 
   'prod_credits_value', 
   'price_credits_value'),
   
  ('00000000-0000-0000-0000-000000000204', 
   'Ultimate Pack', 
   '700 credits to access premium lessons individually', 
   700, 
   39.99, 
   'USD', 
   true, 
   'prod_credits_ultimate', 
   'price_credits_ultimate');

-- Create premium lessons with credit costs
INSERT INTO lessons (id, title, description, content, level, category, duration, points, xp_reward, order_index, is_published, is_premium, credit_cost)
VALUES
  ('00000000-0000-0000-0000-000000000006', 
   'Advanced LLM Architecture Deep Dive', 
   'An in-depth exploration of cutting-edge LLM architectures and their implementations.',
   '# Advanced LLM Architecture Deep Dive

## Understanding Model Structure at Scale

This premium lesson provides a comprehensive exploration of modern LLM architectures, implementation details, and the technical decisions behind today''s most powerful models.

## Architecture Components

### Attention Mechanisms Beyond Self-Attention
- Multi-query attention
- Grouped-query attention
- Sliding window attention 
- Local attention patterns

### Positional Encodings
- Absolute vs relative position embeddings
- Rotary position embeddings (RoPE)
- ALiBi (Attention with Linear Biases)
- Learned position embeddings

### Model Parallelism Strategies
- Tensor parallelism
- Pipeline parallelism
- Sequence parallelism
- Hybrid approaches

## Scaling Laws and Efficiency

Learn about the mathematical relationships between model size, dataset size, compute budget, and performance. Understand how researchers derive optimal training regimes and architecture decisions.

## Case Studies

Detailed analysis of architecture decisions in:
- GPT-4 and Claude 3
- Open source models like Llama, Mistral, and Falcon
- Specialized architectures optimized for different tasks

## Implementation Details

- KV cache optimization techniques
- Attention implementation efficiency
- Memory management strategies
- Quantization approaches

This premium content includes interactive diagrams, code examples, and expert commentary from AI researchers.',
   'advanced',
   'architecture',
   45,
   50,
   100,
   6,
   true,
   true,
   10),
    
  ('00000000-0000-0000-0000-000000000007', 
   'Enterprise LLM Deployment Strategies', 
   'Learn how organizations are deploying LLMs in production with security, compliance, and scalability.',
   '# Enterprise LLM Deployment Strategies

## Bringing AI into Production Environments

This premium lesson covers the end-to-end process of deploying Large Language Models in enterprise settings, addressing the unique challenges of security, compliance, scalability, and integration.

## Deployment Architectures

### On-Premises vs Cloud
- Trade-offs in control, cost, and performance
- Hybrid approaches and air-gapped deployments
- Hardware considerations and optimization

### Containerization and Orchestration
- Docker configurations for LLM services
- Kubernetes for model orchestration
- Auto-scaling and load balancing strategies

### API Design Patterns
- Synchronous vs asynchronous inference
- Streaming responses
- Graceful degradation under load

## Security and Privacy

### Data Protection
- Prompt isolation and sanitization
- Data lineage tracking
- PII detection and redaction

### Model Security
- Prompt injection defenses
- Jailbreak prevention
- Rate limiting and abuse detection

### Regulatory Compliance
- GDPR, HIPAA, and financial regulations
- Audit trails and explainability
- Data sovereignty considerations

## Performance Optimization

### Inference Optimization
- Quantization for production
- Caching strategies
- Batching requests
- Hardware acceleration (GPUs, TPUs, custom silicon)

### Cost Management
- Resource allocation strategies
- Usage monitoring and quotas
- Cost attribution models

## Integration Patterns

### Enterprise Systems
- ERP and CRM integration
- Knowledge management systems
- Identity and access management

### Monitoring and Observability
- Metrics collection
- Performance dashboards
- Anomaly detection

This premium content includes deployment templates, security checklists, and case studies from various industries.',
   'advanced',
   'applications',
   50,
   60,
   120,
   7,
   true,
   true,
   15);

-- Add tags to lessons for better categorization
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS tags TEXT[];

UPDATE lessons 
SET tags = ARRAY['fundamentals', 'introduction', 'basics']
WHERE id = '00000000-0000-0000-0000-000000000001';

UPDATE lessons 
SET tags = ARRAY['prompting', 'techniques', 'best-practices']
WHERE id = '00000000-0000-0000-0000-000000000002';

UPDATE lessons 
SET tags = ARRAY['evaluation', 'quality', 'assessment']
WHERE id = '00000000-0000-0000-0000-000000000003';

UPDATE lessons 
SET tags = ARRAY['fine-tuning', 'customization', 'training']
WHERE id = '00000000-0000-0000-0000-000000000004';

UPDATE lessons 
SET tags = ARRAY['multimodal', 'vision', 'advanced']
WHERE id = '00000000-0000-0000-0000-000000000005';

UPDATE lessons 
SET tags = ARRAY['architecture', 'technical', 'premium', 'advanced']
WHERE id = '00000000-0000-0000-0000-000000000006';

UPDATE lessons 
SET tags = ARRAY['deployment', 'enterprise', 'production', 'premium', 'security']
WHERE id = '00000000-0000-0000-0000-000000000007';

-- Create community groups
INSERT INTO community_groups (id, name, description, created_by, is_private, member_count, topic_tags)
VALUES
  ('00000000-0000-0000-0000-000000000301', 
   'LLM Beginners', 
   'A friendly community for those just starting their journey into Large Language Models. Ask basic questions and learn together!', 
   '00000000-0000-0000-0000-000000000401', -- Admin user ID
   false, 
   1, 
   ARRAY['beginners', 'questions', 'learning']),
   
  ('00000000-0000-0000-0000-000000000302', 
   'Prompt Engineering Lab', 
   'Share and discuss advanced prompting techniques, patterns, and best practices. Show off your most creative prompts!', 
   '00000000-0000-0000-0000-000000000401', -- Admin user ID
   false, 
   1, 
   ARRAY['prompts', 'techniques', 'engineering']),
   
  ('00000000-0000-0000-0000-000000000303', 
   'AI Ethics Discussion', 
   'A space for thoughtful conversation about the ethical implications of LLMs and AI development.', 
   '00000000-0000-0000-0000-000000000401', -- Admin user ID 
   false, 
   1, 
   ARRAY['ethics', 'society', 'philosophy']),
   
  ('00000000-0000-0000-0000-000000000304', 
   'LLM Developers', 
   'Technical discussions about model architecture, training, and implementation. For those who build and deploy LLMs.', 
   '00000000-0000-0000-0000-000000000401', -- Admin user ID
   false, 
   1, 
   ARRAY['technical', 'development', 'coding']),
   
  ('00000000-0000-0000-0000-000000000305', 
   'Premium Members Lounge', 
   'Exclusive group for premium subscribers with special content, events, and direct access to experts.', 
   '00000000-0000-0000-0000-000000000401', -- Admin user ID
   true, 
   1, 
   ARRAY['premium', 'exclusive', 'events']);

-- Create administrative user for initial setup
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, last_sign_in_at, raw_user_meta_data, created_at, updated_at)
VALUES
  ('00000000-0000-0000-0000-000000000401', 
   'admin@llmastery.com',
   '$2a$10$AbcDefGhIjKlMnOpQrStUvWxYzAbCdEfGhIjKlMnOpQrStUvW', -- This is not a real hash, just a placeholder
   now(),
   now(),
   '{"full_name": "Admin User", "role": "admin"}',
   now(),
   now())
ON CONFLICT DO NOTHING;

INSERT INTO user_profiles (id, user_id, username, display_name, avatar_url, points, streak, access_level)
VALUES
  ('00000000-0000-0000-0000-000000000501',
   '00000000-0000-0000-0000-000000000401',
   'admin',
   'LLMastery Admin',
   '/avatars/admin.png',
   1000,
   30,
   'admin')
ON CONFLICT DO NOTHING;

-- Create feedback templates
INSERT INTO content_feedback (id, user_id, lesson_id, feedback_text, feedback_type, status)
VALUES
  ('00000000-0000-0000-0000-000000000601',
   '00000000-0000-0000-0000-000000000401',
   '00000000-0000-0000-0000-000000000001',
   'The explanation of transformer architecture could be more detailed with a diagram.',
   'content_issue',
   'resolved'),
   
  ('00000000-0000-0000-0000-000000000602',
   '00000000-0000-0000-0000-000000000401',
   '00000000-0000-0000-0000-000000000002',
   'Some additional examples would be helpful for the section on role-based prompting.',
   'feature_request',
   'under_review');

-- Learning paths for structured progression
INSERT INTO learning_paths (id, title, description, is_premium, credit_cost, is_published)
VALUES
  ('00000000-0000-0000-0000-000000000701',
   'LLM Foundations',
   'Master the fundamentals of large language models, from basic concepts to evaluation.',
   false,
   0,
   true),
   
  ('00000000-0000-0000-0000-000000000702',
   'Prompt Engineering Mastery',
   'Become an expert in crafting effective prompts for any situation.',
   false,
   0,
   true),
   
  ('00000000-0000-0000-0000-000000000703',
   'Enterprise LLM Implementation',
   'Advanced path for deploying and managing LLMs in business environments.',
   true,
   50,
   true);

-- Connect lessons to learning paths
INSERT INTO learning_path_lessons (learning_path_id, lesson_id, order_index)
VALUES
  -- LLM Foundations Path
  ('00000000-0000-0000-0000-000000000701', '00000000-0000-0000-0000-000000000001', 1),
  ('00000000-0000-0000-0000-000000000701', '00000000-0000-0000-0000-000000000003', 2),
  ('00000000-0000-0000-0000-000000000701', '00000000-0000-0000-0000-000000000005', 3),
  
  -- Prompt Engineering Mastery
  ('00000000-0000-0000-0000-000000000702', '00000000-0000-0000-0000-000000000001', 1),
  ('00000000-0000-0000-0000-000000000702', '00000000-0000-0000-0000-000000000002', 2),
  ('00000000-0000-0000-0000-000000000702', '00000000-0000-0000-0000-000000000004', 3),
  
  -- Enterprise LLM Implementation
  ('00000000-0000-0000-0000-000000000703', '00000000-0000-0000-0000-000000000004', 1),
  ('00000000-0000-0000-0000-000000000703', '00000000-0000-0000-0000-000000000006', 2),
  ('00000000-0000-0000-0000-000000000703', '00000000-0000-0000-0000-000000000007', 3);

-- Create trigger for invoice generation on payment
CREATE OR REPLACE FUNCTION generate_invoice_on_payment()
RETURNS TRIGGER AS $$
BEGIN
    -- Generate a unique invoice URL with the payment ID
    NEW.invoice_url := '/invoices/' || NEW.id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_payment_generate_invoice
    BEFORE INSERT ON payments
    FOR EACH ROW
    EXECUTE FUNCTION generate_invoice_on_payment();

-- Sample payment data
INSERT INTO payments (id, user_id, amount, currency, status, payment_method, description)
VALUES
  ('00000000-0000-0000-0000-000000000801',
   '00000000-0000-0000-0000-000000000401',
   14.99,
   'USD',
   'completed',
   'credit_card',
   'Premium Monthly Subscription - Initial payment'),
   
  ('00000000-0000-0000-0000-000000000802',
   '00000000-0000-0000-0000-000000000401',
   19.99,
   'USD',
   'completed',
   'paypal',
   'Value Credit Pack - 300 credits');

-- Create additional schema objects for features

-- Dark mode preference
CREATE OR REPLACE FUNCTION toggle_theme_preference()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.theme_preference = 'dark' THEN
        NEW.theme_preference := 'light';
    ELSE
        NEW.theme_preference := 'dark';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Learning resources (additional materials)
INSERT INTO learning_resources (title, description, resource_url, resource_type, lesson_id)
VALUES
  ('Introduction to Transformer Models',
   'A visual explanation of how transformer models work',
   'https://resources.llmastery.com/videos/transformer-intro.mp4',
   'video',
   '00000000-0000-0000-0000-000000000001'),
   
  ('Prompt Engineering Cheat Sheet',
   'A downloadable PDF with best practices and templates',
   'https://resources.llmastery.com/docs/prompt-cheatsheet.pdf',
   'document',
   '00000000-0000-0000-0000-000000000002'),
   
  ('Fine-tuning Tutorial Repository',
   'GitHub repository with code examples for fine-tuning',
   'https://github.com/llmastery/fine-tuning-examples',
   'code',
   '00000000-0000-0000-0000-000000000004');