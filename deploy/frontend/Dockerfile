# Stage 1: Build the React application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Build arguments for environment variables
ARG VITE_API_BASE_URL
ARG VITE_STRIPE_PUBLIC_KEY
ARG VITE_TOLGEE_API_KEY

# Set environment variables for build
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_STRIPE_PUBLIC_KEY=$VITE_STRIPE_PUBLIC_KEY
ENV VITE_TOLGEE_API_KEY=$VITE_TOLGEE_API_KEY

# Build the application
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:1.27-alpine

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY deploy/frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Copy entrypoint script for runtime env var injection
COPY deploy/frontend/entrypoint.sh /docker-entrypoint.d/40-inject-env.sh
RUN chmod +x /docker-entrypoint.d/40-inject-env.sh

# Expose port (Railway will use the PORT env var)
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:3000/health || exit 1

# Nginx will start automatically via the base image's entrypoint
