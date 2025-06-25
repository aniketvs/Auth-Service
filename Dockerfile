FROM node:18

# Set working directory
WORKDIR /app/auth-service

# Install build-essential tools and Python for compiling native modules like bcrypt
RUN apt-get update && apt-get install -y build-essential python3

# Copy the package.json and install dependencies
COPY auth-service/package.json ./
RUN npm install

# Copy the rest of the application
COPY auth-service/ ./

# Expose the necessary port
EXPOSE 5005

# Start the application
CMD ["npm", "run", "start"]
