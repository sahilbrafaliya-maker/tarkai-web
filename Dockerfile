# =========================
# Stage 1: Build
# =========================
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
# Install dependencies including devDependencies for build
RUN npm ci
COPY . .
# Disable standalone output in next.config.ts if it was enabled, or let it be.
# We will use standard start command.
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# =========================
# Stage 2: Production Runner
# =========================
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

# Copy essential files
COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json .
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
# Install ONLY production dependencies
RUN npm ci --only=production

EXPOSE 3000

CMD ["npm", "start"]