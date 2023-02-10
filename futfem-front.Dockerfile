#stage 1
FROM node:14.17.0 as node
WORKDIR /home/japerez/appsangular/tikitakas
COPY package.json .
COPY tsconfig.json .
RUN npm install --legacy-peer-deps
RUN npm rm -rf ./dist
CMD ng build

#stage 2
FROM nginx:alpine

USER root
RUN chgrp -R 0 /usr/share/nginx/html && chmod -R g+rwX /usr/share/nginx/html

RUN chgrp -R 0 /etc/nginx/conf.d && chmod -R g+rwX /etc/nginx/conf.d

RUN rm /etc/nginx/conf.d/default.conf

RUN rm -r /usr/share/nginx/html

#COPY ./dist/tikitakas /usr/share/nginx/html

COPY ./dist/tikitakas /etc/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

CMD nginx -g "daemon off;"