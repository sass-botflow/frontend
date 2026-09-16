# EasyPanel — tiny image; bundle downloads on container start via entrypoint.
# Deploy <30s = restart only. For new code: EasyPanel → Stop → Start (check logs for bundle download).
# EasyPanel → Source → GitHub → main → Dockerfile → port 3000

FROM node:20-alpine AS runner
RUN apk add --no-cache libc6-compat curl openssl
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV RELEASE_TAG=deploy-latest

COPY scripts/docker-entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh && \
    addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs && \
    chown -R nextjs:nodejs /app

USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=15s --timeout=5s --start-period=60s --retries=5 \
  CMD curl -fsS http://127.0.0.1:3000/api/health/live || exit 1
ENTRYPOINT ["/entrypoint.sh"]
