# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-alpine


# Use production node environment by default.
ENV NODE_ENV production

WORKDIR /usr/src/app

COPY package.json .
COPY tsconfig.json .
COPY src/ ./src
RUN npm i --save-dev @types/node

RUN npm install
# Run the application as a non-root user.sss
#USER node

# Copy the rest of the source files into the image.

# Expose the port that the application listens on.
EXPOSE 1337

# Run the application.
CMD npx ts-node src/index.ts

