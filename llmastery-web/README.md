# LLMastery - Gamified LLM Learning Platform

LLMastery is a Duolingo-style gamified learning platform for mastering Large Language Models (LLMs). The application provides an interactive and engaging way to learn about LLM concepts through lessons, quizzes, challenges, and a gamified progression system.

## Features

- **Interactive Lessons**: Bite-sized, engaging content on LLM concepts
- **Gamified Learning**: Points, badges, streaks, and leaderboards to motivate learners
- **Progress Tracking**: Visual learning paths and completion metrics
- **Quiz System**: Knowledge checks with immediate feedback
- **Challenge Exercises**: Practical applications of learned concepts
- **User Authentication**: Secure login and profile management with Supabase
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **API**: GraphQL with Apollo Client
- **Deployment**: Vercel (recommended)

## Setup Instructions

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Supabase account (for authentication and database)

### Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/llmastery.git
   cd llmastery
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

   # GraphQL API Configuration
   NEXT_PUBLIC_GRAPHQL_API_URL=http://localhost:4000/graphql
   ```

4. Set up your Supabase project:
   - Create a new project in Supabase
   - Enable authentication with email/password
   - Set up database tables (schema available in `/docs/database-schema.sql`)
   - Copy your Supabase URL and anon key to the `.env.local` file

### Development

Run the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
llmastery-web/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── dashboard/        # User dashboard 
│   │   ├── lessons/          # Lesson pages
│   │   ├── login/            # Authentication pages
│   │   └── signup/           # User registration
│   ├── components/           # Reusable UI components
│   ├── graphql/              # GraphQL schema and operations
│   ├── lib/                  # Utility functions and configurations
│   │   ├── apollo-client.ts  # Apollo client configuration
│   │   ├── apollo-provider.tsx # Apollo provider component
│   │   ├── auth-context.tsx  # Authentication context
│   │   └── supabase.ts       # Supabase client configuration
│   └── styles/               # Global styles
├── public/                   # Static assets
├── .env.example              # Example environment variables
└── next.config.js            # Next.js configuration
```

## Backend Services

This project uses:

1. **Supabase** for authentication and database
2. **GraphQL API** for data fetching (requires separate setup)

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ for LLM learners everywhere.
