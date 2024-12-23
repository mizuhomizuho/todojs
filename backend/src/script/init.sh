#!/bin/bash

FILE_INITIALIZED="/todojs/install/initialized"

if [ -f "$FILE_INITIALIZED" ]; then

  echo "Initialized..."

else

  cd /todojs || exit
  npm init -y
  npm install express --save
  npm install -D typescript @types/node @types/express
  tsc --init
  npm i prisma --save-dev
  npx prisma init
  npm install jsonwebtoken
  npm install cors
  npm i bcryptjs

  cat /dev/null > "$FILE_INITIALIZED"

fi
