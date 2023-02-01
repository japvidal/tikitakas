FROM nginx:alpine

USER root
RUN chgrp -R 0 /usr/share/nginx/html && chmod -R g+rwX /usr/share/nginx/html

RUN chgrp -R 0 /etc/nginx/conf.d && chmod -R g+rwX /etc/nginx/conf.d

RUN rm /etc/nginx/conf.d/default.conf

COPY ./dist/tikitakas /usr/share/nginx/html

COPY ./dist/tikitakas /etc/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

CMD nginx -g "daemon off;"