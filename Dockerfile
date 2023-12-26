FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm install && npm run build


FROM nginx
WORKDIR  /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /app/build .