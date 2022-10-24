FROM node:lts-alpine

# To avoid dev dependancies and build in production mode
ENV NODE_ENV production

# Create and change to the app directory.
WORKDIR /app

# Copying those first prevents re-running npm install on every code change.
COPY app .

# Install all dependencies
RUN npm install

# Copy local code to the container image.
COPY . .

RUN docker compose up

# Run the web service on container startup.
CMD [ "app/index.js" ]