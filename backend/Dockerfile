FROM todojs_server:latest

RUN mkdir /todojs

COPY src /todojs/src

RUN mkdir /var/run/sshd
RUN echo 'root:123' | chpasswd
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

RUN cat /etc/nginx/nginx.conf | sed -E "s/\s*user\swww-data;\s*/user ubuntu;\n/" > /etc/nginx/nginx.conf.bu
RUN mv /etc/nginx/nginx.conf.bu /etc/nginx/nginx.conf
RUN echo "\n\ndaemon off;" >> /etc/nginx/nginx.conf
RUN chown -R ubuntu:ubuntu /var/www/
RUN chown -R ubuntu:ubuntu /var/log/nginx/

RUN echo "ubuntu:123" | chpasswd

RUN tsc --init

RUN chown -R ubuntu:ubuntu /todojs

RUN pm2 start /todojs/src/server/app/server.ts --interpreter ts-node
RUN pm2 save
RUN pm2 startup

RUN cat /todojs/src/config/supervisord.conf > /etc/supervisor/conf.d/supervisord.conf

CMD ["/usr/bin/supervisord", "-n"]