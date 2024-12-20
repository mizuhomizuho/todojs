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




#npm install -D tslint
#jq ".scripts.lint = \"tslint -p .\"" package.json > tmp_package.json
#mv tmp_package.json package.json

#	rm -rf ./backend/node_modules
#	rm -f ./backend/package.json
#	rm -f ./backend/package-lock.json
#	rm -f ./backend/tsconfig.json
#	rm -f ./backend/tslint.json
