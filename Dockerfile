FROM node:20 AS build
RUN mkdir /app
WORKDIR /app
COPY . .

ENV USER_API_URL=http://mcc-be-user-service:5000/
ENV CHAT_API_URL=http://mcc-be-chat-service:5000/

RUN npm install && npm run build
# RUN npm install 
# CMD ["npm", "start"]

# EXPOSE 3000


FROM nginx
WORKDIR  /usr/share/nginx/html
COPY custom.conf /etc/nginx/conf.d/custom.conf
RUN rm -rf ./*
COPY --from=build /app/build .

EXPOSE 80
