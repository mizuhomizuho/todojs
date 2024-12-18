#!/bin/bash

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