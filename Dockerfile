# EasyPanel default — fast deploy (~1 min, NO next build on VPS).
# Downloads pre-built bundle from GitHub Release on every deploy.

FROM node:20-alpine AS runner
RUN apk add --no-cache libc6-compat curl openssl
WORKDIR /app

ARG RELEASE_TAG=deploy-latest
ARG CACHE_BUST=1
RUN echo "Cache bust: ${CACHE_BUST}" && \
    echo "Downloading BotFlow bundle (${RELEASE_TAG})..." && \
    for i in 1 2 3 4 5; do \
      curl -fsSL -o /tmp/bundle.tar.gz \
        "https://github.com/sass-botflow/frontend/releases/download/${RELEASE_TAG}/botflow-frontend-standalone.tar.gz" && break; \
      echo "Download attempt $i failed, retrying..."; sleep 3; \
    done && \
    test -f /tmp/bundle.tar.gz || (echo "ERROR: bundle download failed" && exit 1) && \
    tar xzf /tmp/bundle.tar.gz -C /app && \
    rm /tmp/bundle.tar.gz && \
    test -f /app/server.js || (echo "ERROR: server.js missing in bundle" && exit 1) && \
    echo "Bundle ready ($(cat /app/BUILD_VERSION.txt 2>/dev/null || echo unknown))."

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs && \
    chown -R nextjs:nodejs /app && chmod +x /app/docker-start.sh
USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=15s --timeout=5s --start-period=30s --retries=5 \
  CMD curl -fsS http://127.0.0.1:3000/api/health/live || exit 1
CMD ["./docker-start.sh"]
