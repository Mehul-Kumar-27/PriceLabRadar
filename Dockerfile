# Use the specified Node.js version as a parent image
FROM node:18.18.2

# Set the working directory
WORKDIR /app

# Copy the contents of the backend folder to the container's /app/backend
COPY backend/ ./backend/

# Set the working directory to the backend folder
WORKDIR /app/backend

# Installing the dependencies
RUN npm install

# Reset the working directory to the root of the application
WORKDIR /app

# Copy the rest of the application code to the working directory
COPY docker-compose.yaml ./
COPY startup.sh ./

# Expose the necessary port
EXPOSE 4001

WORKDIR /app/backend
# Run the startup script
CMD ["npm", "start"]
