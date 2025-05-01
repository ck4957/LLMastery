# LLMastery

A Duolingo-style gamified learning platform for mastering Large Language Models (LLMs).

## Project Overview

LLMastery is an educational platform designed to make learning about LLMs accessible, engaging, and interactive. The application leverages gamification techniques to keep users motivated while providing high-quality content about prompt engineering, fine-tuning, embeddings, RAG, and other LLM concepts.

## Repository Structure

```
├── llmastery-web/       # Next.js frontend application
├── db/                  # Database management and schema
│   ├── schema/          # Database schema definitions
│   │   ├── functions/   # Database functions (fn_*.sql)
│   │   ├── triggers/    # Database triggers (tg_*.sql)
│   │   ├── tables/      # Table definitions
│   │   ├── enums/       # Enum type definitions
│   │   ├── indexes/     # Database indexes
│   │   ├── policies/    # Row-level security policies
│   │   └── migrations/  # Versioned schema changes
│   ├── seeds/           # Seed data for development
│   ├── scripts/         # Database management scripts
│   └── jobs/            # Scheduled database jobs
└── project-docs/        # Project documentation
```

## Key Features

- Interactive, bite-sized lessons on LLM concepts
- Progress tracking with learning paths
- Gamification elements (points, badges, streaks)
- Quiz system for knowledge verification
- Practical challenges for hands-on learning
- Community features for discussion and collaboration
- Premium content with subscription options
- Multi-platform support (web, mobile-responsive)

## Database Structure

LLMastery uses Supabase (PostgreSQL) with a well-organized schema:

- **Users & Profiles**: Authentication and user data
- **Lessons & Content**: Learning materials stored in database and Supabase Storage
- **Progress Tracking**: User advancement through lessons
- **Gamification**: Points, badges, streaks
- **Community**: Groups, posts, comments, likes
- **E-commerce**: Subscriptions, payments, credits

### Content Storage

Lesson content is stored using a hybrid approach:

- Text content stored in Supabase Storage for better scalability
- Content metadata and small content stored in database
- Support for versioning with `content_version` field
- Various content sources (expert, AI-assisted, community)

## Development

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- PostgreSQL knowledge for database work

### Setup

1. Clone the repository

   ```bash
   git clone https://github.com/your-username/LLMastery.git
   cd LLMastery
   ```

2. Set up the NextJS web application

   ```bash
   cd llmastery-web
   npm install
   cp .env.example .env.local
   # Configure environment variables in .env.local
   ```

3. Initialize the database

   ```bash
   cd ../db
   chmod +x scripts/*.sh
   ./scripts/migrate.sh
   ./scripts/seed.sh
   ```

4. Start the development server
   ```bash
   cd ../llmastery-web
   npm run dev
   ```

### Database Management

The `/db` directory contains everything needed to manage the database schema:

- **Schema Changes**: Use the migration system

  ```bash
  cd db
  ./scripts/generate_migration.sh add_new_feature
  # Edit the generated migration file
  ./scripts/migrate.sh
  ```

- **Backups**:

  ```bash
  ./scripts/backup.sh backup development
  ./scripts/backup.sh restore development llmastery_development_20250501_120000.dump
  ```

- **Seeding Data**:
  ```bash
  ./scripts/seed.sh development seed-lessons.sql
  ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Duolingo for inspiration on gamified learning platforms
- The open-source community for various tools and libraries used
- All contributors who have helped shape this project
