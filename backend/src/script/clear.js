const fs = require('fs');
const path = require('path');

fs.writeFile('backend/install/install.conf', '', () => {});

[{
    directory: 'backend/src/log',
    exclude: ['.gitignore'],
}, {
    directory: 'backend/install',
    exclude: ['install.conf'],
}]
    .forEach((params) => {

        const directory = params.directory;
        const exclude = params.exclude;

        fs.readdir(directory, (err, files) => {
            for (const file of files) {
                if (!exclude.includes(file)){
                    fs.unlink(path.join(directory, file), () => {});
                }
            }
        });
    });

