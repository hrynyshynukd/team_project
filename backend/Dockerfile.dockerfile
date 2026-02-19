# Use official Node.js LTS image
FROM node:20-alpine
# Set working directory
WORKDIR /app
# Copy package files
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy application files
COPY . .
# Expose the port
EXPOSE 3111
# Start the application
CMD ["npm", "start"]