#!/bin/bash

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
pm2 start /todojs/src/server/app/server.js
pm2 save
pm2 startup

echo "End." >> "$FILE_LOG"
