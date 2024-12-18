#!/bin/bash


pm2 delete server
pm2 start /todojs/server/nodejs/server.js
pm2 save
pm2 startup
nginx -s reload


    privileged: true








if [ -f "/todojs/src/config/install.conf" ]; then
  exit 0
fi
echo -e "[supervisord]\ninstalled=true" > /todojs/src/config/install.conf


RUN bash /todojs/install.sh

nginx_config="$(
		cat <<'EOT'
server {
	listen 80 default_server;
	root /var/www/nodejs;
	index index.html;
	error_page 500 502 503 504 /50x.html;
	error_page 400 401 402 403 404 /40x.html;
	location = /50x.html {
		root /var/www/errors;
	}
	location = /40x.html {
		root /var/www/errors;
	}
	server_name 127.0.0.1;
	location / {
		proxy_pass http://127.0.0.1:8000;
		proxy_set_header Host $host;
	}
	location /nginx/ {
		root /var/www/;
		autoindex off;
		# /var/www/static/
	}
}
EOT
	)"

server_js="$(
		cat <<'EOT'
const setup = {port:8000}
const express = require ('express');
const app = express ();
app.get('/test', (req, res) => {
  res.send('Тест');
});
app.listen(setup.port, () => {
  console.log('Сервер: порт %s - старт!', setup.port);
});
EOT
	)"

mv /var/www/html /var/www/nginx
mkdir /var/www/nodejs
chown www-data /var/www
chown www-data /var/www/nginx
chown www-data /var/www/nodejs
echo "{background: #000;color: #fff;}" > /var/www/nginx/style.css
echo "<link rel=\"stylesheet\" href=\"./style.css\"><h1>Заглушка</h1>" > /var/www/nginx/index.html
cat /etc/nginx/sites-available/default > /etc/nginx/sites-available-default-bu
echo "$nginx_config" > /etc/nginx/sites-available/default
echo "$server_js" > /var/www/nodejs/server.js

curl -sL https://deb.nodesource.com/setup_18.x -o /todojs/nodesource_setup.sh
bash /todojs/nodesource_setup.sh

#npm install pm2 -g
#npm init
#npm install express --save
#pm2 start /var/www/nodejs/server.js
#pm2 save
#pm2 startup

#RUN chown -R www-data ./server


	root /todojs/server/nodejs;
	index index.html;
	error_page 500 502 503 504 /50x.html;
	error_page 400 401 402 403 404 /40x.html;
	location = /50x.html {
		root /todojs/server/errors;
	}
	location = /40x.html {
		root /todojs/server/errors;
	}
