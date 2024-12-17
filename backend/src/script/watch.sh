#!/bin/bash

inotifywait -m -e modify,create,delete /path/to/directory | while read; do
    bash /todojs/backend/scripts/reboot.sh
done