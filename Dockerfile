# syntax=docker/dockerfile:1

FROM node:20-alpine

WORKDIR /app

# Install dependencies
# COPY package.json package-lock.json ./
RUN npm install cross-env

# Copy source and build
COPY . .

# RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "dev"]
