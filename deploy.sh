#!/bin/bash

# Stop and remove the existing containers
docker compose -f compose.prod.yml down
docker compose -f monitoring/docker-compose.yml down

git pull origin main

# Create log volume if it doesn't exist
docker volume create --name=api_logs || true

# Create network if it doesn't exist
docker network create traefik_network || true

# Pull and start the main application
docker compose -f compose.prod.yml pull
docker compose -f compose.prod.yml up -d --build

# Run Prisma migrations
docker compose -f compose.prod.yml exec -T api npx prisma migrate deploy

# Wait for 10 seconds
sleep 10

# Initialize the monitoring stack
cd ./monitoring
docker compose up -d 

# Clean up unused images
docker image prune -af

