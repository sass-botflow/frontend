# BotFlow frontend — works on EasyPanel (GitHub build) + GitHub Actions (GHCR)
# EasyPanel → Source → GitHub → sass-botflow/frontend → main → Dockerfile → port 3000

FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
RUN apk add --no-cache libc6-compat openssl git
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules

ARG SOURCE_COMMIT=unknown
RUN echo "Build source commit: ${SOURCE_COMMIT}"
COPY . .

ARG APP_VERSION=dev
ARG BUILD_TIME=unknown
ARG GIT_SHA
ARG GITHUB_SHA
ARG COMMIT_SHA
ARG GIT_COMMIT
ARG SOURCE_COMMIT
ARG NEXT_PUBLIC_APP_URL=https://www.botflow.ink
ARG NEXT_PUBLIC_API_URL=https://api.botflow.ink
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_build_placeholder
ARG NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
ARG NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
ARG NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
ARG NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
ARG NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL=/en
ARG NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
ARG NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/onboarding
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ENV NEXT_PUBLIC_CLERK_SIGN_IN_URL=$NEXT_PUBLIC_CLERK_SIGN_IN_URL
ENV NEXT_PUBLIC_CLERK_SIGN_UP_URL=$NEXT_PUBLIC_CLERK_SIGN_UP_URL
ENV NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=$NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL
ENV NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=$NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL
ENV NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL=$NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL
ENV NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=$NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL
ENV NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=$NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL
ENV NODE_OPTIONS=--max-old-space-size=768
ENV GENERATE_SOURCEMAP=false
ENV NEXT_TELEMETRY_DISABLED=1
ENV DOCKER_BUILD=1
ENV CI=1

RUN set -e; \
    V="$APP_VERSION"; \
    if [ "$V" = "dev" ] || [ -z "$V" ]; then \
      if [ -n "$GIT_SHA" ]; then V=$(echo "$GIT_SHA" | cut -c1-7); \
      elif [ -n "$GITHUB_SHA" ]; then V=$(echo "$GITHUB_SHA" | cut -c1-7); \
      elif [ -n "$COMMIT_SHA" ]; then V=$(echo "$COMMIT_SHA" | cut -c1-7); \
      elif [ -n "$GIT_COMMIT" ]; then V=$(echo "$GIT_COMMIT" | cut -c1-7); \
      elif [ -n "$SOURCE_COMMIT" ]; then V=$(echo "$SOURCE_COMMIT" | cut -c1-7); \
      else V=$(git rev-parse --short HEAD 2>/dev/null || echo dev); fi; \
    fi; \
    BT="$BUILD_TIME"; \
    if [ "$BT" = "unknown" ] || [ -z "$BT" ]; then BT=$(date -u +%Y-%m-%dT%H:%M:%SZ); fi; \
    echo "$V" > /app/BUILD_VERSION.txt && echo "$BT" > /app/BUILD_TIME.txt; \
    echo "Build version: $V at $BT"

RUN npm run build

FROM node:20-alpine AS runner
RUN apk add --no-cache libc6-compat curl openssl
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/BUILD_VERSION.txt ./BUILD_VERSION.txt
COPY --from=builder /app/BUILD_TIME.txt ./BUILD_TIME.txt
COPY scripts/docker-start.sh ./docker-start.sh
RUN chown nextjs:nodejs /app/docker-start.sh && chmod +x /app/docker-start.sh
USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=60s --retries=5 \
  CMD curl -f http://127.0.0.1:3000/api/health || exit 1
CMD ["./docker-start.sh"]
