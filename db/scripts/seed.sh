#!/bin/bash
# filepath: /Users/chiragkular/Documents/Dev/ck4957_Repos/LLMastery/db/scripts/seed.sh

# Script to seed the database with initial data
# Usage: ./seed.sh [environment] [seed_file]

set -e

# Default to development if not specified
ENVIRONMENT=${1:-"development"}
BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SEEDS_DIR="$BASE_DIR/seeds"
SEED_FILE=${2:-"seed.sql"}

if [ "$1" == "--help" ] || [ "$1" == "-h" ]; then
  echo "Usage: ./seed.sh [environment] [seed_file]"
  echo "  environment: development (default), staging, production"
  echo "  seed_file: The seed file to run (default: seed.sql)"
  echo ""
  echo "Available seed files:"
  find "$SEEDS_DIR" -name "*.sql" -exec basename {} \; | sort
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

SEED_FILE_PATH="$SEEDS_DIR/$SEED_FILE"

if [ ! -f "$SEED_FILE_PATH" ]; then
  echo "Error: Seed file $SEED_FILE_PATH not found"
  echo "Available seed files:"
  find "$SEEDS_DIR" -name "*.sql" -exec basename {} \; | sort
  exit 1
fi

echo "Seeding database with $SEED_FILE for $ENVIRONMENT environment..."

# Apply the seed file
psql "$DATABASE_URL" -f "$SEED_FILE_PATH"

echo "Database seeded successfully."