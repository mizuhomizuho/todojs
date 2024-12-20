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

  cat /dev/null > "$FILE_INITIALIZED"

fi
