# Use official Node.js runtime as base image
FROM node:20-alpine AS base
WORKDIR /app

# Build stage
FROM base AS build
COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY frontend/ ./frontend/
COPY src/ ./src/

# Install all dependencies and build
RUN npm ci
RUN cd frontend && npm ci && npm run build

# Verify build output exists
RUN ls -la frontend/dist/ || echo "Build output not found"

# Production stage
FROM node:20-alpine AS production

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S webhookhub -u 1001
WORKDIR /app

# Copy built files
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/src ./src
COPY --from=build /app/frontend/dist ./dist

# Set ownership
RUN chown -R webhookhub:nodejs /app
USER webhookhub

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start application
CMD ["npm", "start"]