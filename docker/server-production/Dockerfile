# build stage
FROM node:14-alpine as build-stage
ENV NODE_ENV=production

WORKDIR /app
COPY package*.json ./
RUN npm install

# copy project files and folders to the current working directory
# and build app for production with minification
COPY . ./
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=build-stage /app/docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist .

# run nginx with global directives and daemon off
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
