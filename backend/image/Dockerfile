FROM ubuntu:latest
RUN apt-get update && apt-get install -y mc inotify-tools openssh-server nginx curl supervisor
RUN ( curl -sSLf https://deb.nodesource.com/setup_18.x -o - || echo 'return 1' ) | bash -s
RUN apt-get install -y nodejs
RUN npm install pm2 -g