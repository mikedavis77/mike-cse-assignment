#!/usr/bin/env bash

set -e

PORT=3000
LOG_FILE=/tmp/npm-start.log

echo "Starting application..."

# Prevent duplicate processes if the Codespace restarts
pkill -f "npm start" 2>/dev/null || true

npm start > "$LOG_FILE" 2>&1 &

echo "Waiting for application on port $PORT..."

for i in {1..30}; do
  if curl -s "http://localhost:$PORT" > /dev/null; then
    echo "Application is running."
    break
  fi

  sleep 1
done

if ! curl -s "http://localhost:$PORT" > /dev/null; then
  echo "Application failed to start."
  echo "Check logs with:"
  echo "  cat $LOG_FILE"
  exit 1
fi

echo "Making port $PORT public..."

gh codespace ports visibility "$PORT:public" \
  -c "$CODESPACE_NAME"

echo "Codespace application is ready."
