# Backend API Dockerfile
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install --production

# Bundle app source
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the node server
CMD [ "npm", "start" ]
