FROM todojs_server:latest

RUN mkdir /todojs

COPY src /todojs/src

RUN mkdir /var/run/sshd
RUN echo 'root:root123' | chpasswd
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

RUN echo "\n\ndaemon off;" >> /etc/nginx/nginx.conf
RUN chown -R www-data /todojs/src/server

RUN cat /todojs/src/config/supervisord.conf > /etc/supervisor/conf.d/supervisord.conf

CMD ["/usr/bin/supervisord", "-n"]