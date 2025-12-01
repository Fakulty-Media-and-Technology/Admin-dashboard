# syntax=docker/dockerfile:1

FROM node:20-alpine

WORKDIR /app

# Copy source files
COPY . .

# Install dependencies
RUN npm install cross-env

# RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "dev"]