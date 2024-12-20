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

bash /todojs/src/script/init.sh

pm2 start /todojs/src/server/app/server.ts --interpreter ts-node
pm2 save
pm2 startup

cat /dev/null > "$FILE_INSTALLED"

chown -R ubuntu:ubuntu /todojs

