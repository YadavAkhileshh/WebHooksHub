# Use official Node.js runtime as base image
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies for building
FROM base AS deps
# Copy package files
COPY package*.json ./
COPY frontend/package*.json ./frontend/

# Install dependencies
RUN npm ci --only=production && npm cache clean --force
RUN cd frontend && npm ci --only=production && npm cache clean --force

# Build frontend
FROM base AS build
COPY package*.json ./
COPY frontend/ ./frontend/
RUN npm ci
RUN cd frontend && npm ci && npm run build

# Production image
FROM node:20-alpine AS production

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S webhookhub -u 1001

# Set working directory
WORKDIR /app

# Copy built application
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/frontend/dist ./frontend/dist
COPY package*.json ./
COPY src/ ./src/
COPY public/ ./public/

# Set ownership to non-root user
RUN chown -R webhookhub:nodejs /app
USER webhookhub

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e \"require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })\"\n\n# Start application\nCMD [\"npm\", \"start\"]