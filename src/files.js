const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

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

    static async isDir(file_path) {
        const result = await fsPromises.stat(file_path).catch(err => {
            if (err) {
                return false;
            }
            throw err;
        });
    
        return !result ? result : result.isDirectory();
    }

    static containFile(file_path, file_name) {
        return new Promise((resolve, reject) => {
            fs.exists(path.join(file_path, file_name), (exists => resolve(exists)));
        });
    }

    static async fetch_files_from_dir(directoryPath) {
        // directoryPath = path.join(__dirname, directoryPath);
        return new Promise((res, rej) => {
            fs.readdir(directoryPath, (err, files) => {
                if(err){
                    rej(err);
                }
                res(files);
            })
        })
    }
}


module.exports = Files;