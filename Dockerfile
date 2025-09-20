FROM node:alpine3.21 AS build-stage

#BUILD APP
WORKDIR /app

COPY package.json ./

RUN npm install

CMD ["npm", "run", "build"]

#serve with nginx server

FROM nginx:alpine3.21 AS production-stage
WORKDIR /usr/share/nginx/htmL
RUN rm -rf ./*
COPY --from=build-stage /app/dist ./
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]