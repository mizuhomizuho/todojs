const chokidar = require('chokidar');
const { exec } = require('child_process');

// Путь к файлу или директории
const watcher = chokidar.watch('/todojs/src/server/app/_test.js', {
    persistent: true
});

// Событие на изменение файла
watcher.on('change', (path) => {
    console.log(`${path} has been changed`);
    exec('echo "File updated"', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing command: ${error.message}`);
            return;
        }
        console.log(stdout);
    });
});