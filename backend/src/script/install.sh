#!/bin/bash

FILE_INSTALLED="/todojs/install/installed"
FILE_CONF="/todojs/install/install.conf"
INSTALLED="[installed]"

while [ ! -f "$FILE_CONF" ]; do
  sleep 1
done

if [ "$(cat "$FILE_CONF")" = "$INSTALLED" ]; then
  exit 0
fi

echo "$INSTALLED" > "$FILE_CONF"

cd /todojs || exit
npm init -y
npm install express --save
npm install -D typescript @types/node @types/express
tsc --init

#npm install -D tslint
#jq ".scripts.lint = \"tslint -p .\"" package.json > tmp_package.json
#mv tmp_package.json package.json

chown -R ubuntu:ubuntu /todojs

pm2 start /todojs/src/server/app/server.ts --interpreter ts-node
pm2 save
pm2 startup

cat /dev/null > "$FILE_INSTALLED"

