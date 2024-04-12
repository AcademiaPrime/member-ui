FROM node:21-slim as build
RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN npm install
CMD ["npm", "run", "start-production"]
