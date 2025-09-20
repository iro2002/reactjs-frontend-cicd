FROM node:alpine3.21 AS build-stage

#BUILD APP
WORKDIR /app

COPY package.json ./

RUN npm install

CMD ["npm", "run", "build"]

