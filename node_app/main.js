const Files = require('./files');
const path = require('path');
class Main {

    async source_code_list_to_modules_and_dependencies(source_code_list) {
        let modules = [];
        for (let index = 0; index < source_code_list.length; index++) {
            const source_path = source_code_list[index];
            const mod = await this.source_code_path_to_module(source_path)
            modules.push(mod);
        }
        return modules;
    }

    async source_code_path_to_module(source_code_path) {
        // console.log(source_code_path);
        if(!source_code_path || source_code_path.length == 0) {
            return null;
        }
        if(await this.isPathContainModule(source_code_path)) {
            return {
                module_name: path.basename(source_code_path),
                dependencies: await this.fetchDependenciesFromModulefile(source_code_path)
            }    
        }
        return await this.source_code_path_to_module(source_code_path.substring(0, source_code_path.lastIndexOf("/")))
    }

    async isPathContainModule(source_path) {
        if(await Files.isDir(source_path)) {
            return await Files.containFile(source_path, ".module")
        }
        return false;
    }

    async fetchDependenciesFromModulefile(module_dir_path) {
        let modules = await Files.readFile(path.join(module_dir_path, ".module"));
        return modules.split('\n').filter(mod => mod && mod.length > 0);
    }
}

module.exports = Main;
