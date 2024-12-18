#!/bin/bash

#pm2 delete server
#pm2 start /todojs/src/server/app/server.js
#pm2 save
#pm2 startup
#nginx -s reload

pm2 restart server
