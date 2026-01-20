# Use a single stage to guarantee all files are present
FROM node:20-alpine

WORKDIR /app

# Copy dependency definitions
COPY package.json package-lock.json ./

# Install ALL dependencies (including dev) to ensure build works
RUN npm ci

# Copy all source code
COPY . .

# Build the project
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the application using standard Next.js start command
CMD ["npm", "start"]