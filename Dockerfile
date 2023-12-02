# Use the official Node.js image with version 16, based on Alpine Linux
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN npm run build

# Expose the port that the application will run on
EXPOSE 3001

# Command to run the application
CMD ["node", "dist/main"]

# FROM node:alpine As development # WORKDIR /usr/src/app # COPY package*.json ./ # RUN npm install # COPY . . # RUN npm run build # FROM node:apline as production # ARG NODE_ENV=production # ENV NODE_ENV=${NODE_ENV} # WORKDIR /usr/src/app # COPY package*.json ./ # RUN npm install --only=prod # COPY . . # COPY --from=development /usr/src/app/dist ./dist # CMD ["node", "dist/main "] FROM node:16-alpine WORKDIR /usr/src/app COPY package*.json ./ RUN npm install COPY . . RUN npm run build EXPOSE 3000 CMD ["node","dist/main"]

