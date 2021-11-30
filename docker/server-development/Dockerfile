# build stage
FROM node:14-alpine as build-stage
ENV NODE_ENV=development

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm install

# start app
CMD ["npm", "run", "serve"]


