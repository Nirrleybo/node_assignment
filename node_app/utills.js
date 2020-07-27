const Base = require('./base');
const fs = require('fs');
const path = require('path');

class Utills {

    static error(class_name, err_msg) { console.error(`***** Error *****\n[${class_name}]: ${err_msg}\n***************`) }
    static log(class_name, msg) { console.log(`[${class_name}]: ${msg}`); }

    static readFile(file_path) {
        file_path = path.resolve(__dirname, file_path);
        try {
            return fs.readFileSync(file_path, { encoding: 'utf-8' });
        } catch (e) {
            Utills.error("Utills", `Error reading file from ${file_path}:\n${e}`)
            return "";
        }
    }
}


module.exports = Utills;