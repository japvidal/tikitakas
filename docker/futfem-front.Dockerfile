FROM node:14.17 AS build-env

WORKDIR /app

COPY . ./

RUN npm install
RUN npm run build

FROM nginx:1.17

COPY --from=build-env /app/dist/tikitakas/ /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

RUN chmod -R 755 /usr/share/nginx/html/

CMD ["nginx", "-g", "daemon off;"]