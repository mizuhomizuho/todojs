#!/bin/bash

pm2 delete server
pm2 start /todojs/server/nodejs/server.js
pm2 save
pm2 startup
nginx -s reload
