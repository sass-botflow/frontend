# Build the Vite SPA, then serve the static output with nginx.
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Backend API base URL is baked in at build time (Vite inlines import.meta.env).
# Override in EasyPanel via a build arg if your API lives elsewhere.
ARG VITE_API_URL=https://api.botflow.ink
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

FROM nginx:alpine AS runner
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
