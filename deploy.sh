#!/bin/bash

docker volume create --name=api_logs || true
docker network create traefik_network || true

docker compose -f compose.prod.yml pull
docker compose -f compose.prod.yml up -d --build

docker compose -f compose.prod.yml exec -T api npx prisma migrate deploy

cd ./monitoring
docker compose up -d 

# Clean up unused images
docker image prune -af

