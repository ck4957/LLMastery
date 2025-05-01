#!/bin/bash
# filepath: /Users/chiragkular/Documents/Dev/ck4957_Repos/LLMastery/db/scripts/generate_migration.sh

# Script to generate a new migration file
# Usage: ./generate_migration.sh migration_name

set -e

if [ -z "$1" ] || [ "$1" == "--help" ] || [ "$1" == "-h" ]; then
  echo "Usage: ./generate_migration.sh migration_name"
  echo "Example: ./generate_migration.sh add_user_roles"
  exit 1
fi

BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MIGRATIONS_DIR="$BASE_DIR/schema/migrations"
MIGRATION_NAME="$1"
DATE=$(date +%Y%m%d)
TIMESTAMP=$(date +%H%M%S)
FILENAME="${DATE}_${MIGRATION_NAME}.sql"
FILEPATH="$MIGRATIONS_DIR/$FILENAME"

# Create migrations directory if it doesn't exist
mkdir -p "$MIGRATIONS_DIR"

# Create the migration file with a template
cat > "$FILEPATH" << EOF
----------------------------------------------
-- Migration: $MIGRATION_NAME
-- Created: $(date +"%Y-%m-%d %H:%M:%S")
-- Description: [Add description here]
----------------------------------------------

-- Write your migration SQL here

-- Example: 
-- ALTER TABLE table_name ADD COLUMN new_column_name TEXT;
-- CREATE INDEX IF NOT EXISTS index_name ON table_name(column_name);

-- Down migration (comment out, will be used for rollbacks if needed)
/*
-- Example rollback:
-- ALTER TABLE table_name DROP COLUMN new_column_name;
-- DROP INDEX IF EXISTS index_name;
*/
EOF

echo "Created migration file: $FILEPATH"
echo "Edit the file to add your migration SQL and a description."