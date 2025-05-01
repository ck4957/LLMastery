#!/bin/bash
# filepath: /Users/chiragkular/Documents/Dev/ck4957_Repos/LLMastery/db/scripts/migrate.sh

# Script to apply database migrations
# Usage: ./migrate.sh [migration_name]

set -e

# Default to production if not specified
ENVIRONMENT=${ENVIRONMENT:-"development"}
BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MIGRATIONS_DIR="$BASE_DIR/schema/migrations"

if [ "$1" == "--help" ] || [ "$1" == "-h" ]; then
  echo "Usage: ./migrate.sh [migration_name]"
  echo "If migration_name is provided, only that migration will be applied."
  echo "Otherwise, all pending migrations will be applied."
  exit 0
fi

# Get Supabase credentials from environment file
if [ -f "$BASE_DIR/.env.$ENVIRONMENT" ]; then
  source "$BASE_DIR/.env.$ENVIRONMENT"
elif [ -f "$BASE_DIR/.env" ]; then
  source "$BASE_DIR/.env"
else
  echo "Error: No .env file found"
  exit 1
fi

# Check for required environment variables
if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_KEY" ]; then
  echo "Error: SUPABASE_URL and SUPABASE_KEY must be set in .env.$ENVIRONMENT or .env"
  exit 1
fi

# Function to apply a single migration
apply_migration() {
  local migration_file="$1"
  local migration_name=$(basename "$migration_file" .sql)
  
  echo "Applying migration: $migration_name"
  
  # Check if migration has already been applied
  local already_applied=$(psql "$DATABASE_URL" -t -c "SELECT COUNT(*) FROM schema_migrations WHERE name = '$migration_name'")
  
  if [ "$already_applied" -gt 0 ]; then
    echo "Migration $migration_name has already been applied. Skipping."
    return 0
  fi
  
  # Apply the migration
  psql "$DATABASE_URL" -f "$migration_file"
  
  # Record the migration
  psql "$DATABASE_URL" -c "INSERT INTO schema_migrations (name, applied_at) VALUES ('$migration_name', NOW())"
  
  echo "Migration $migration_name applied successfully."
}

# Make sure the schema_migrations table exists
psql "$DATABASE_URL" -c "CREATE TABLE IF NOT EXISTS schema_migrations (name TEXT PRIMARY KEY, applied_at TIMESTAMPTZ NOT NULL)"

# If a specific migration was provided, apply only that one
if [ -n "$1" ]; then
  migration_file="$MIGRATIONS_DIR/$1.sql"
  
  if [ ! -f "$migration_file" ]; then
    echo "Error: Migration file $migration_file not found"
    exit 1
  fi
  
  apply_migration "$migration_file"
else
  # Apply all migrations in alphabetical order
  for migration_file in $(find "$MIGRATIONS_DIR" -name "*.sql" | sort); do
    apply_migration "$migration_file"
  done
fi

echo "Migrations completed successfully."