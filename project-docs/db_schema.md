# Database Schema

## Overview

LLMastery uses a PostgreSQL database via Supabase for storing application data. The schema is designed to support gamified learning features, user profiles, lesson management, progress tracking, and subscription handling.

## Entity Relationship Diagram

```
┌─────────────────┐      ┌──────────────────┐      ┌───────────────┐
│   user_profiles │      │  user_lesson_    │      │    lessons    │
│                 │◄────►│    progress      │◄────►│               │
└─────────────────┘      └──────────────────┘      └───────────────┘
         ▲                                                 ▲
         │                                                 │
         ▼                                                 ▼
┌─────────────────┐                                ┌───────────────┐
│   user_badges   │                                │    quizzes    │
│                 │                                │               │
└─────────────────┘                                └───────────────┘
         ▲                                                 ▲
         │                                                 │
         │                                                 │
┌─────────────────┐      ┌──────────────────┐      ┌───────────────┐
│     badges      │      │       user_      │      │   challenges  │
│                 │      │   subscriptions  │      │               │
└─────────────────┘      └──────────────────┘      └───────────────┘
                                   ▲
                                   │
                                   ▼
                          ┌───────────────┐
                          │ pricing_plans │
                          │               │
                          └───────────────┘
```

## Tables

### 1. user_profiles

Stores user information and gamification stats.

| Column          | Type      | Description                                |
| --------------- | --------- | ------------------------------------------ |
| id              | string    | Primary key, linked to Supabase auth.users |
| username        | string    | User's display name                        |
| profile_picture | string    | URL to profile picture                     |
| streak          | number    | Current learning streak                    |
| points          | number    | Total XP points earned                     |
| created_at      | timestamp | Record creation time                       |
| updated_at      | timestamp | Record last update time                    |

Relationships:

- One-to-one with Supabase auth.users table

### 2. lessons

Contains all learning content organized in lessons.

| Column             | Type      | Description                              |
| ------------------ | --------- | ---------------------------------------- |
| id                 | string    | Primary key                              |
| title              | string    | Lesson title                             |
| description        | string    | Brief description                        |
| content            | string    | Full lesson content (HTML/Markdown)      |
| level              | enum      | BEGINNER, INTERMEDIATE, ADVANCED, EXPERT |
| category           | enum      | Topic category (FUNDAMENTALS, etc.)      |
| duration           | number    | Estimated completion time (minutes)      |
| points             | number    | Points awarded for completion            |
| xp_reward          | number    | XP awarded for completion                |
| next_lesson_id     | string    | ID of next lesson in sequence            |
| previous_lesson_id | string    | ID of previous lesson                    |
| created_at         | timestamp | Record creation time                     |
| updated_at         | timestamp | Record last update time                  |

Relationships:

- Self-referential for lesson sequencing (next/previous)
- One-to-many with quizzes
- One-to-many with challenges

### 3. quizzes

Multiple-choice questions for testing knowledge.

| Column               | Type      | Description                        |
| -------------------- | --------- | ---------------------------------- |
| id                   | string    | Primary key                        |
| lesson_id            | string    | Foreign key to lessons             |
| question             | string    | Question text                      |
| options              | json      | Array of possible answers          |
| correct_answer_index | number    | Index of correct answer in options |
| explanation          | string    | Explanation of correct answer      |
| created_at           | timestamp | Record creation time               |
| updated_at           | timestamp | Record last update time            |

Relationships:

- Many-to-one with lessons

### 4. challenges

Practical exercises to apply knowledge.

| Column      | Type      | Description                        |
| ----------- | --------- | ---------------------------------- |
| id          | string    | Primary key                        |
| lesson_id   | string    | Foreign key to lessons             |
| prompt      | string    | Challenge description/instructions |
| example     | string    | Example solution or starter code   |
| point_value | number    | Points awarded for completion      |
| created_at  | timestamp | Record creation time               |
| updated_at  | timestamp | Record last update time            |

Relationships:

- Many-to-one with lessons

### 5. user_lesson_progress

Tracks a user's progress through lessons.

| Column              | Type      | Description                       |
| ------------------- | --------- | --------------------------------- |
| id                  | string    | Primary key                       |
| user_id             | string    | Foreign key to user_profiles      |
| lesson_id           | string    | Foreign key to lessons            |
| completed           | boolean   | Whether lesson is completed       |
| quiz_score          | number    | Score on lesson quiz (percentage) |
| challenge_completed | boolean   | Whether challenge was completed   |
| started_at          | timestamp | When user started the lesson      |
| completed_at        | timestamp | When user completed the lesson    |

Relationships:

- Many-to-one with user_profiles
- Many-to-one with lessons

### 6. badges

Achievement badges that users can earn.

| Column      | Type      | Description                        |
| ----------- | --------- | ---------------------------------- |
| id          | string    | Primary key                        |
| name        | string    | Badge name                         |
| description | string    | Badge description                  |
| image_url   | string    | URL to badge image                 |
| criteria    | string    | Requirements for earning the badge |
| created_at  | timestamp | Record creation time               |
| updated_at  | timestamp | Record last update time            |

### 7. user_badges

Junction table linking users to earned badges.

| Column    | Type      | Description                  |
| --------- | --------- | ---------------------------- |
| id        | string    | Primary key                  |
| user_id   | string    | Foreign key to user_profiles |
| badge_id  | string    | Foreign key to badges        |
| earned_at | timestamp | When the badge was earned    |

Relationships:

- Many-to-one with user_profiles
- Many-to-one with badges

### 8. pricing_plans

Available subscription plans.

| Column            | Type      | Description                         |
| ----------------- | --------- | ----------------------------------- |
| id                | string    | Primary key                         |
| name              | string    | Plan name                           |
| description       | string    | Plan description                    |
| price             | number    | Price amount                        |
| currency          | string    | Currency code (USD, etc.)           |
| interval          | string    | Billing interval (monthly, yearly)  |
| features          | array     | List of features included           |
| is_active         | boolean   | Whether plan is currently available |
| stripe_product_id | string    | Stripe product ID                   |
| stripe_price_id   | string    | Stripe price ID                     |
| created_at        | timestamp | Record creation time                |
| updated_at        | timestamp | Record last update time             |

### 9. user_subscriptions

User subscription information.

| Column                 | Type      | Description                      |
| ---------------------- | --------- | -------------------------------- |
| id                     | string    | Primary key                      |
| user_id                | string    | Foreign key to user_profiles     |
| plan_id                | string    | Foreign key to pricing_plans     |
| status                 | enum      | active, canceled, past_due, etc. |
| current_period_start   | timestamp | Start of current billing period  |
| current_period_end     | timestamp | End of current billing period    |
| cancel_at_period_end   | boolean   | Whether to cancel at period end  |
| stripe_subscription_id | string    | Stripe subscription ID           |
| created_at             | timestamp | Record creation time             |
| updated_at             | timestamp | Record last update time          |

Relationships:

- Many-to-one with user_profiles
- Many-to-one with pricing_plans

## Enums

### lesson_category

- FUNDAMENTALS
- ARCHITECTURE
- PROMPTING
- TRAINING
- EVALUATION
- APPLICATIONS
- ETHICS

### lesson_level

- BEGINNER
- INTERMEDIATE
- ADVANCED
- EXPERT

## Database Indexes

- Primary key indexes on all tables (`id` columns)
- Foreign key indexes for relationships
- Indexes on frequently queried fields:
  - `user_profiles.username`
  - `lessons.category`, `lessons.level`
  - `user_lesson_progress.user_id`, `user_lesson_progress.completed`
  - `user_subscriptions.user_id`, `user_subscriptions.status`
