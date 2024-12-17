#!/bin/bash

mkdir /var/run/sshd
echo 'root:root123' | chpasswd
sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config

echo -e "\n\ndaemon off;" >> /etc/nginx/nginx.conf
chown -R www-data /todojs/src/server

cd /todojs || exit
npm init -y
npm install express --save
pm2 start /todojs/src/server/app/server.js
pm2 save
pm2 startup

cat /todojs/src/config/supervisord.conf > /etc/supervisor/conf.d/supervisord.conf