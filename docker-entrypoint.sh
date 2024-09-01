#!/bin/sh

# Run Prisma migrations
pnpm prisma migrate deploy

# Generate Prisma client
pnpm prisma generate

# Start the application
exec "$@"
