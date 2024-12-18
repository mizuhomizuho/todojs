#!/bin/bash

#https://stackoverflow.com/questions/66909254/watchdog-observers-observer-works-in-windows-works-in-docker-on-linux-does-not
#fswatch -o /todojs/src/server/app | xargs -n1 -I{} echo "File changed"
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
    bash /todojs/src/script/reboot.sh
done