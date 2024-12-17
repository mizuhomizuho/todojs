FROM ubuntu:latest

RUN mkdir /todojs
WORKDIR /todojs

COPY src src

RUN apt-get update
RUN apt-get install -y mc

RUN apt-get install -y openssh-server
RUN mkdir /var/run/sshd
RUN echo 'root:root123' | chpasswd
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

RUN apt-get install -y nginx
RUN echo "\n\ndaemon off;" >> /etc/nginx/nginx.conf
RUN chown -R www-data ./src/server

RUN apt-get install -y curl
RUN ( curl -sSLf https://deb.nodesource.com/setup_18.x -o - || echo 'return 1' ) | bash -s
RUN apt-get install -y nodejs
RUN npm init -y
RUN npm install express --save
RUN npm install pm2 -g
RUN pm2 start ./src/server/app/server.js
RUN pm2 save
RUN pm2 startup

RUN apt-get install -y inotify-tools

RUN apt-get install -y supervisor
COPY ./src/config/supervisord.conf /etc/supervisor/conf.d/supervisord.conf
CMD ["/usr/bin/supervisord", "-n"]