FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN apt-get update && apt-get install -y openssl libssl-dev ca-certificates && corepack enable
COPY . /app
WORKDIR /app
RUN mkdir -p /log

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm prisma generate
RUN pnpm run build

EXPOSE 8000
CMD [ "pnpm", "start" ]
