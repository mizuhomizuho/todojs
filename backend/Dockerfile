FROM ubuntu:latest

RUN mkdir /todojs

COPY src /todojs/src

RUN bash /todojs/src/script/install.sh

CMD ["/usr/bin/supervisord", "-n"]