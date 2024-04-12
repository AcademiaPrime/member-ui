FROM node:21-slim as build
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build
FROM nginx:latest
COPY --from=build /app/dist/member-ui /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
