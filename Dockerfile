FROM node:alpine3.21 AS build-stage

#BUILD APP
WORKDIR /app

COPY package.json ./

RUN npm install

EXPOSE 5173

CMD ["npm", "run", "build"]

