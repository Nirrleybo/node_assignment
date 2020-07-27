const Files = require('./files')

class Main {

    async source_code_list_to_modules_and_dependencies(source_code_list) {
        let modules = {};
        return source_code_list.forEach(async source_path => {
            await this.source_code_path_to_module(source_path)
        })
        return modules;
    }

    async source_code_path_to_module(source_code_path) {
        if(!source_code_path || source_code_path.length == 0) {
            return null;
        }
        if(await this.isPathContainModule(source_code_path)) {
            return {}    
        }
        return {}
    }

    async isPathContainModule(path) {
        if(await Files.isDir(path)) {
            return await Files.containFile(".module")
        }
        return false;
    }
}

module.exports = Main;
