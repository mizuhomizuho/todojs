#!/bin/bash


#RUN usermod -s /bin/bash www-data
#    user: "www-data:www-data"
#RUN usermod -s /bin/bash www-data
#RUN echo "ubuntu:123" | chpasswd
#RUN echo "www-data:123" | chpasswd
# tslint-eslint-rules typescript-tslint-plugin
#RUN echo -e "x123\nx123" | passwd ubuntu
#RUN echo -e "x123\nx123" | passwd www-data

FILE_LOG="/todojs/install/install.log"
FILE_FLAG="/todojs/install/installed.conf"
INSTALLED="[installed]"

while [ ! -f "$FILE_FLAG" ]; do
  sleep 1
done

if [ "$(cat "$FILE_FLAG")" = "$INSTALLED" ]; then
  exit 0
fi

echo "$INSTALLED" > "$FILE_FLAG"

cat /dev/null > "$FILE_LOG"

echo "Start..." >> "$FILE_LOG"

cd /todojs || exit
npm init -y
npm install express --save
npm install -D typescript tslint @types/node @types/express
tsc --init

jq ".scripts.lint = \"tslint -p .\"" package.json > tmp_package.json
mv tmp_package.json package.json

chown -R ubuntu:ubuntu /todojs

pm2 start ts-node /todojs/src/server/app/server.ts
pm2 save
pm2 startup

echo "End." >> "$FILE_LOG"
