#!/bin/bash
# filepath: /Users/chiragkular/Documents/Dev/ck4957_Repos/LLMastery/db/scripts/backup.sh

# Script to backup and restore database
# Usage: 
#   ./backup.sh backup [environment]
#   ./backup.sh restore [environment] [backup_file]

set -e

ACTION=${1:-"backup"}
ENVIRONMENT=${2:-"development"}
BACKUP_FILE=${3}
BASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKUPS_DIR="$BASE_DIR/backups"

# Create backups directory if it doesn't exist
mkdir -p "$BACKUPS_DIR"

# Show help
if [ "$1" == "--help" ] || [ "$1" == "-h" ] || ([ "$ACTION" != "backup" ] && [ "$ACTION" != "restore" ]); then
  echo "Usage:"
  echo "  ./backup.sh backup [environment]"
  echo "  ./backup.sh restore [environment] [backup_file]"
  echo ""
  echo "  environment: development (default), staging, production"
  echo ""
  echo "Available backups:"
  find "$BACKUPS_DIR" -name "*.dump" -exec basename {} \; | sort
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
if [ -z "$DATABASE_URL" ]; then
  echo "Error: DATABASE_URL must be set in .env.$ENVIRONMENT or .env"
  exit 1
fi

if [ "$ACTION" == "backup" ]; then
  # Create a backup
  TIMESTAMP=$(date +%Y%m%d_%H%M%S)
  BACKUP_PATH="$BACKUPS_DIR/llmastery_${ENVIRONMENT}_${TIMESTAMP}.dump"
  
  echo "Creating backup of $ENVIRONMENT database to $BACKUP_PATH..."
  pg_dump --format=custom --file="$BACKUP_PATH" "$DATABASE_URL"
  
  echo "Backup created successfully: $(basename "$BACKUP_PATH")"
  
elif [ "$ACTION" == "restore" ]; then
  # Restore from a backup
  if [ -z "$BACKUP_FILE" ]; then
    # If no backup file specified, use the latest one
    BACKUP_FILE=$(find "$BACKUPS_DIR" -name "*.dump" | sort -r | head -n 1)
    
    if [ -z "$BACKUP_FILE" ]; then
      echo "Error: No backup files found in $BACKUPS_DIR"
      exit 1
    fi
    
    echo "No backup file specified, using latest: $(basename "$BACKUP_FILE")"
  else
    # Use the specified backup file
    BACKUP_FILE="$BACKUPS_DIR/$BACKUP_FILE"
    
    if [ ! -f "$BACKUP_FILE" ]; then
      echo "Error: Backup file $BACKUP_FILE not found"
      echo "Available backups:"
      find "$BACKUPS_DIR" -name "*.dump" -exec basename {} \; | sort
      exit 1
    fi
  fi
  
  echo "Restoring $ENVIRONMENT database from $(basename "$BACKUP_FILE")..."
  echo "WARNING: This will overwrite your current database. Continue? (y/n)"
  read -r confirm
  
  if [ "$confirm" != "y" ]; then
    echo "Restore cancelled."
    exit 0
  fi
  
  pg_restore --clean --if-exists --no-acl --no-owner --dbname="$DATABASE_URL" "$BACKUP_FILE"
  
  echo "Database restored successfully."
fi