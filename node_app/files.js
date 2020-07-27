const fs = require('fs');
const path = require('path');
const Logger = require('./logger');
const { exception } = require('console');

class Files {
    
    static async readFile(file_path, encoding = "utf-8") {
        if (!file_path) {
            throw new Error("file_path required");
        }
        try {
            let content = await fs.promises.readFile(file_path, { encoding });
            return content.trim();
        } catch (e) {
            throw new Error(`Error in Files.readFile: ${e}`)
        }
    }

    static async isDir(path) {
        try {
            const stat = fs.lstat(path);
            return await stat.isDirectory();
        } catch (e) {
            throw new Error(`Error in Files.isDir: ${e}`)
        }
    }

    static async containFile(path, file_name) {
        try {
            return await fs.promises.exists(path.join(path, file_name), { encoding });
        } catch(e){
            throw new Error(`Error in Files.containFile: ${e}`)
        }
    }
}


module.exports = Files;