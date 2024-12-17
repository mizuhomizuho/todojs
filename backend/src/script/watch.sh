#!/bin/bash

inotifywait -m -e modify,create,delete /todojs/src/server/* | while read; do
    bash /todojs/src/scripts/reboot.sh
done