# Build Stage
FROM node:20-slim AS build

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production Stage
FROM node:20-slim

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the built assets and the server file
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/server.js ./server.js

# Expose the port
EXPOSE 8080

# Start the server
CMD [ "npm", "start" ]
