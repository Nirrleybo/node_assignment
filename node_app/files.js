const fs = require('fs');
const path = require('path');
const Logger = require('./logger');

class Files {

    static readFile(file_path) {
        file_path = path.resolve(__dirname, file_path);
        try {
            return fs.readFileSync(file_path, { encoding: 'utf-8' });
        } catch (e) {
            Logger.error("Utills", `Error reading file from ${file_path}:\n${e}`)
            return "";
        }
    }
}


module.exports = Files;