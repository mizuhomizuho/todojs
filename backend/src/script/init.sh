#!/bin/bash

FILE_CONF="/todojs/install/install.conf"
INSTALLED="[installed]"

current_user=$(id -u -n)
echo "User: $current_user"

while [ ! -f "$FILE_CONF" ]; do
  sleep 1
done

if [ "$(cat "$FILE_CONF")" = "$INSTALLED" ]; then

  echo "Installed..."

else

  echo "Install..."

  echo "$INSTALLED" > "$FILE_CONF"

  if [ -d "/todojs/node_modules" ]; then
      echo "Node modules initialized..."
  else
    cd /todojs || exit
    npm init -y
    npm install express --save
    npm install -D typescript @types/node @types/express
    tsc --init
    npm i prisma --save-dev
    npm install jsonwebtoken cors bcryptjs
  fi

  if [ -d "/todojs/prisma" ]; then
      echo "Prisma initialized..."
  else
    npx prisma init
  fi

  cat /dev/null > /todojs/install/installed

  chown -R ubuntu:ubuntu /todojs

fi

echo "Start..."

pm2 delete server
pm2 start /todojs/src/server/app/server.ts --interpreter ts-node
pm2 save
pm2 startup

inotifywait \
  --event create \
  --event delete \
  --event modify \
  --event move \
  --event attrib \
  --format "%e %w%f" \
  --monitor \
  --syslog \
  --quiet \
  --recursive \
  /todojs/src/server/app |
while read CHANGED;
do
  echo "$CHANGED"
  pm2 restart server
done
